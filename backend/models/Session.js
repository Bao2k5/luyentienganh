const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'expired'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Indexes for performance
SessionSchema.index({ startTime: 1 });
SessionSchema.index({ status: 1 });

module.exports = mongoose.model('Session', SessionSchema);
