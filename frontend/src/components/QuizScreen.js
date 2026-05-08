import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import Timer from './Timer';
import QuestionDisplay from './QuestionDisplay';
import QuestionGrid from './QuestionGrid';
import { getQuestions, submitQuiz } from '../services/api';
import { saveSession, loadSession, clearSession } from '../utils/localStorage';

const QuizScreen = ({ sessionId, studentInfo, selectedSet, onSubmit }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(new Map());
    const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
    const [startTime] = useState(Date.now());
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Load questions on mount
    useEffect(() => {
        const initQuiz = async () => {
            try {
                // Try to load from localStorage first
                const savedSession = loadSession();
                if (savedSession && savedSession.sessionId === sessionId) {
                    setQuestions(savedSession.questions);
                    setAnswers(new Map(Object.entries(savedSession.answers)));
                    setCurrentQuestionIndex(savedSession.currentQuestionIndex);
                    setTimeRemaining(savedSession.timeRemaining);
                    setIsLoading(false);
                    return;
                }

                // Fetch questions from API
                const fetchedQuestions = await getQuestions(selectedSet);
                setQuestions(fetchedQuestions);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        initQuiz();
    }, [sessionId, selectedSet]);

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (questions.length > 0 && !isSubmitting) {
            const session = {
                sessionId,
                studentName: studentInfo.name,
                studentClass: studentInfo.class,
                questions,
                answers: Object.fromEntries(answers),
                currentQuestionIndex,
                startTime,
                timeRemaining,
            };
            saveSession(session);
        }
    }, [sessionId, studentInfo, questions, answers, currentQuestionIndex, timeRemaining, startTime, isSubmitting]);

    // Browser navigation protection
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!isSubmitting) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isSubmitting]);

    // Handle answer selection
    const handleAnswerSelect = useCallback((answer) => {
        setAnswers((prev) => {
            const newAnswers = new Map(prev);
            newAnswers.set(currentQuestionIndex, answer);
            return newAnswers;
        });
    }, [currentQuestionIndex]);

    // Navigation
    const goToPrevious = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }, [currentQuestionIndex]);

    const goToNext = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }, [currentQuestionIndex, questions.length]);

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    // Submit quiz
    const handleSubmit = useCallback(async () => {
        const confirmed = window.confirm(
            'Bạn có chắc chắn muốn nộp bài? Bạn sẽ không thể thay đổi câu trả lời sau khi nộp.'
        );

        if (!confirmed) return;

        setIsSubmitting(true);

        try {
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            const answersArray = questions.map((q, index) => ({
                questionId: q.id,
                selectedAnswer: answers.get(index) || null,
            }));

            const result = await submitQuiz(sessionId, answersArray, timeTaken);
            clearSession();
            onSubmit(result.resultId);
        } catch (err) {
            alert('Lỗi khi nộp bài: ' + err.message);
            setIsSubmitting(false);
        }
    }, [sessionId, questions, answers, startTime, onSubmit]);

    // Auto-submit when time is up
    const handleTimeUp = useCallback(() => {
        alert('Hết giờ! Bài thi sẽ được nộp tự động.');
        handleSubmit();
    }, [handleSubmit]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Prevent shortcuts if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key.toUpperCase()) {
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                    e.preventDefault();
                    handleAnswerSelect(e.key.toUpperCase());
                    break;
                case 'ARROWLEFT':
                    e.preventDefault();
                    goToPrevious();
                    break;
                case 'ARROWRIGHT':
                    e.preventDefault();
                    goToNext();
                    break;
                case 'ENTER':
                    e.preventDefault();
                    if (currentQuestionIndex === questions.length - 1) {
                        handleSubmit();
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestionIndex, questions.length, handleSubmit, handleAnswerSelect, goToPrevious, goToNext]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải câu hỏi...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Lỗi</h2>
                    <p className="text-gray-700">{error}</p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {studentInfo.name} - {studentInfo.class}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Câu {currentQuestionIndex + 1}/50
                            </p>
                        </div>
                        <Timer initialTime={timeRemaining} onTimeUp={handleTimeUp} />
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Question */}
                        <QuestionDisplay
                            question={currentQuestion}
                            selectedAnswer={answers.get(currentQuestionIndex)}
                            onAnswerSelect={handleAnswerSelect}
                            questionNumber={currentQuestionIndex + 1}
                        />

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={goToPrevious}
                                disabled={currentQuestionIndex === 0}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Câu trước
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-3 bg-success hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                                {isSubmitting ? 'Đang nộp...' : 'NỘP BÀI'}
                            </button>

                            <button
                                onClick={goToNext}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Câu sau
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <QuestionGrid
                            totalQuestions={questions.length}
                            answers={answers}
                            currentQuestion={currentQuestionIndex}
                            onQuestionClick={goToQuestion}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizScreen;
