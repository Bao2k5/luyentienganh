const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Question = require('../models/Question');
const Result = require('../models/Result');

// POST /api/quiz/start - Initialize quiz session
router.post('/start', async (req, res) => {
    try {
        const { studentName, studentClass } = req.body;

        // Validation
        if (!studentName || !studentClass) {
            return res.status(400).json({
                error: {
                    message: 'Student name and class are required'
                }
            });
        }

        if (studentName.trim().length < 2) {
            return res.status(400).json({
                error: {
                    message: 'Student name must be at least 2 characters'
                }
            });
        }

        if (studentClass.trim().length < 1) {
            return res.status(400).json({
                error: {
                    message: 'Student class is required'
                }
            });
        }

        // Create new session
        const session = new Session({
            studentName: studentName.trim(),
            studentClass: studentClass.trim(),
            startTime: new Date(),
            status: 'active'
        });

        await session.save();

        res.status(201).json({
            sessionId: session._id,
            startTime: session.startTime
        });

    } catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({
            error: {
                message: 'Failed to start quiz session'
            }
        });
    }
});

// GET /api/questions - Get all questions (shuffled)
router.get('/questions', async (req, res) => {
    try {
        const { setNumber } = req.query;
        const set = parseInt(setNumber) || 1;

        // Validate setNumber
        if (set < 1 || set > 10) {
            return res.status(400).json({
                error: {
                    message: 'Set number must be between 1 and 10'
                }
            });
        }

        // Fetch questions for specific set
        const questions = await Question.find({ setNumber: set }).sort({ orderIndex: 1 });

        if (questions.length === 0) {
            return res.status(404).json({
                error: {
                    message: `No questions found for set ${set}. Please run seed script first.`
                }
            });
        }

        // Fisher-Yates shuffle algorithm
        const shuffled = [...questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Format response
        const formattedQuestions = shuffled.map(q => ({
            id: q._id,
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            unit: q.unit
        }));

        res.status(200).json({
            questions: formattedQuestions,
            setNumber: set
        });

    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch questions'
            }
        });
    }
});

// Utility function to calculate score
const calculateScore = (correctCount, totalQuestions) => {
    const score = (correctCount / totalQuestions) * 10;
    return Math.round(score * 100) / 100; // Round to 2 decimal places
};

// POST /api/quiz/submit - Submit quiz and calculate score
router.post('/submit', async (req, res) => {
    try {
        const { sessionId, answers, timeTaken } = req.body;

        // Validation
        if (!sessionId || !answers || !timeTaken) {
            return res.status(400).json({
                error: {
                    message: 'Session ID, answers, and time taken are required'
                }
            });
        }

        // Verify session exists
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                error: {
                    message: 'Quiz session not found'
                }
            });
        }

        // Fetch all questions to compare answers
        const questions = await Question.find({});
        const questionMap = {};
        questions.forEach(q => {
            questionMap[q._id.toString()] = q;
        });

        // Calculate results
        let correctCount = 0;
        let incorrectCount = 0;
        const processedAnswers = [];

        answers.forEach(answer => {
            const question = questionMap[answer.questionId];
            if (question) {
                const isCorrect = answer.selectedAnswer === question.correctAnswer;
                if (isCorrect) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }

                processedAnswers.push({
                    questionId: answer.questionId,
                    selectedAnswer: answer.selectedAnswer,
                    isCorrect
                });
            }
        });

        // Calculate final score
        const score = calculateScore(correctCount, 50);

        // Create result document
        const result = new Result({
            sessionId: session._id,
            studentName: session.studentName,
            studentClass: session.studentClass,
            answers: processedAnswers,
            score,
            correctCount,
            incorrectCount,
            timeTaken,
            submittedAt: new Date()
        });

        await result.save();

        // Update session status
        session.status = 'completed';
        await session.save();

        res.status(200).json({
            resultId: result._id,
            score,
            correctCount,
            incorrectCount
        });

    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({
            error: {
                message: 'Failed to submit quiz'
            }
        });
    }
});

// GET /api/results/:id - Get detailed quiz results
router.get('/results/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch result with populated question details
        const result = await Result.findById(id).populate('answers.questionId');

        if (!result) {
            return res.status(404).json({
                error: {
                    message: 'Quiz result not found'
                }
            });
        }

        // Format response with detailed question information
        const detailedQuestions = result.answers.map(answer => {
            const question = answer.questionId;
            return {
                questionText: question.questionText,
                options: question.options,
                correctAnswer: question.correctAnswer,
                studentAnswer: answer.selectedAnswer,
                explanation: question.explanation,
                unit: question.unit,
                isCorrect: answer.isCorrect
            };
        });

        res.status(200).json({
            resultId: result._id,
            studentName: result.studentName,
            studentClass: result.studentClass,
            score: result.score,
            correctCount: result.correctCount,
            incorrectCount: result.incorrectCount,
            timeTaken: result.timeTaken,
            submittedAt: result.submittedAt,
            questions: detailedQuestions
        });

    } catch (error) {
        console.error('Error fetching result:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch quiz result'
            }
        });
    }
});

module.exports = router;
