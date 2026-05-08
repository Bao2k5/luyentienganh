const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true }
    },
    correctAnswer: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    vietnameseTranslation: {
        type: String,
        required: false
    },
    optionTranslations: {
        A: { type: String, required: false },
        B: { type: String, required: false },
        C: { type: String, required: false },
        D: { type: String, required: false }
    },
    unit: {
        type: String,
        enum: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Vocabulary'],
        required: true
    },
    orderIndex: {
        type: Number,
        required: true
    },
    setNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
        default: 1
    },
    commonMistake: {
        type: String,
        required: false
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
        default: 'medium'
    },
    setDifficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
        default: 'medium'
    }
}, {
    timestamps: true
});

// Indexes for performance
QuestionSchema.index({ orderIndex: 1 });
QuestionSchema.index({ unit: 1 });
QuestionSchema.index({ setNumber: 1 });
QuestionSchema.index({ difficulty: 1 });
QuestionSchema.index({ setDifficulty: 1 });

module.exports = mongoose.model('Question', QuestionSchema);
