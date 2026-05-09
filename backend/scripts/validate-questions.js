require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

// Validation rules
const validateQuestion = (q, index) => {
    const errors = [];
    const warnings = [];

    // 1. Check blank exists in questionText
    if (!q.questionText.includes('_______')) {
        errors.push(`Q${index + 1}: Missing blank (______) in question text`);
    }

    // 2. Check all options exist
    if (!q.options.A || !q.options.B || !q.options.C || !q.options.D) {
        errors.push(`Q${index + 1}: Missing one or more options (A, B, C, D)`);
    }

    // 3. Check correctAnswer is valid
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
        errors.push(`Q${index + 1}: Invalid correctAnswer: ${q.correctAnswer}`);
    }

    // 4. Check explanation exists and is meaningful
    if (!q.explanation || q.explanation.length < 20) {
        errors.push(`Q${index + 1}: Explanation too short or missing`);
    }

    // 5. Check for "bleeding verb" (duplicate words)
    const optionValues = [q.options.A, q.options.B, q.options.C, q.options.D];
    optionValues.forEach((opt, i) => {
        const words = opt.toLowerCase().split(' ');
        for (let j = 0; j < words.length - 1; j++) {
            if (words[j] === words[j + 1] && words[j].length > 2) {
                errors.push(`Q${index + 1}: Option ${String.fromCharCode(65 + i)} has duplicate word: "${words[j]} ${words[j + 1]}"`);
            }
        }
    });

    // 6. Check correctAnswer matches explanation
    const correctOption = q.options[q.correctAnswer];
    if (q.explanation && !q.explanation.includes(q.correctAnswer)) {
        warnings.push(`Q${index + 1}: Explanation doesn't mention correct answer (${q.correctAnswer})`);
    }

    // 7. Check unit is valid
    const validUnits = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Vocabulary'];
    if (!validUnits.includes(q.unit)) {
        errors.push(`Q${index + 1}: Invalid unit: ${q.unit}`);
    }

    // 8. Check setNumber is valid (1-10)
    if (q.setNumber < 1 || q.setNumber > 10) {
        errors.push(`Q${index + 1}: Invalid setNumber: ${q.setNumber}`);
    }

    // 9. Check for empty options
    optionValues.forEach((opt, i) => {
        if (!opt || opt.trim().length === 0) {
            errors.push(`Q${index + 1}: Option ${String.fromCharCode(65 + i)} is empty`);
        }
    });

    // 10. Check questionText is not empty
    if (!q.questionText || q.questionText.trim().length === 0) {
        errors.push(`Q${index + 1}: Question text is empty`);
    }

    return { errors, warnings };
};

// Main validation function
const validateAllQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const questions = await Question.find({}).sort({ setNumber: 1, orderIndex: 1 });
        console.log(`\n📊 Total questions in database: ${questions.length}\n`);

        let totalErrors = 0;
        let totalWarnings = 0;
        const errorsBySet = {};

        questions.forEach((q, index) => {
            const { errors, warnings } = validateQuestion(q, index);

            if (errors.length > 0 || warnings.length > 0) {
                const setNum = q.setNumber;
                if (!errorsBySet[setNum]) {
                    errorsBySet[setNum] = { errors: [], warnings: [] };
                }

                errors.forEach(err => {
                    console.log(`❌ ${err}`);
                    errorsBySet[setNum].errors.push(err);
                    totalErrors++;
                });

                warnings.forEach(warn => {
                    console.log(`⚠️  ${warn}`);
                    errorsBySet[setNum].warnings.push(warn);
                    totalWarnings++;
                });
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log('📈 VALIDATION SUMMARY');
        console.log('='.repeat(60));
        console.log(`Total Questions: ${questions.length}`);
        console.log(`Total Errors: ${totalErrors}`);
        console.log(`Total Warnings: ${totalWarnings}`);

        if (totalErrors === 0 && totalWarnings === 0) {
            console.log('\n✅ ✅ ✅ ALL QUESTIONS ARE VALID! ✅ ✅ ✅\n');
        } else {
            console.log('\n📋 Errors/Warnings by Set:');
            Object.keys(errorsBySet).sort().forEach(setNum => {
                const { errors, warnings } = errorsBySet[setNum];
                console.log(`\nSet ${setNum}:`);
                console.log(`  Errors: ${errors.length}`);
                console.log(`  Warnings: ${warnings.length}`);
            });
        }

        await mongoose.disconnect();
        process.exit(totalErrors > 0 ? 1 : 0);

    } catch (error) {
        console.error('❌ Validation failed:', error);
        process.exit(1);
    }
};

validateAllQuestions();
