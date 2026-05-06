const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    setNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        selectedAnswer: {
            type: String,
            enum: ['A', 'B', 'C', 'D', null],
            default: null
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    correctCount: {
        type: Number,
        required: true
    },
    incorrectCount: {
        type: Number,
        required: true
    },
    timeTaken: {
        type: Number,
        required: true
    },
    submittedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes for performance
ResultSchema.index({ sessionId: 1 });
ResultSchema.index({ submittedAt: 1 });
ResultSchema.index({ score: 1 });

module.exports = mongoose.model('Result', ResultSchema);
