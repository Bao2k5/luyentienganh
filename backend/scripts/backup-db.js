require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Question = require('../models/Question');

const backupDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const questions = await Question.find({}).sort({ setNumber: 1, orderIndex: 1 });

        const backup = {
            timestamp: new Date().toISOString(),
            totalQuestions: questions.length,
            questions: questions.map(q => q.toObject())
        };

        const filename = `backup-${Date.now()}.json`;
        fs.writeFileSync(filename, JSON.stringify(backup, null, 2));

        console.log(`✅ Backup created: ${filename}`);
        console.log(`📊 Backed up ${questions.length} questions`);

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Backup failed:', error);
        process.exit(1);
    }
};

backupDatabase();
