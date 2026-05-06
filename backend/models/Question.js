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
    }
}, {
    timestamps: true
});

// Indexes for performance
QuestionSchema.index({ orderIndex: 1 });
QuestionSchema.index({ unit: 1 });
QuestionSchema.index({ setNumber: 1 });

module.exports = mongoose.model('Question', QuestionSchema);
