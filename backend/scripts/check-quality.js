require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

const checkQuality = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Get 10 random questions from different units
        const units = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Vocabulary'];
        const samples = [];

        for (const unit of units) {
            const questions = await Question.find({ unit, setNumber: 1 }).limit(2);
            samples.push(...questions);
        }

        console.log('📋 SAMPLE QUESTIONS FOR QUALITY CHECK\n');
        console.log('='.repeat(80));

        samples.forEach((q, index) => {
            console.log(`\n${index + 1}. [${q.unit}] ${q.questionText}`);
            console.log(`   A. ${q.options.A}`);
            console.log(`   B. ${q.options.B}`);
            console.log(`   C. ${q.options.C}`);
            console.log(`   D. ${q.options.D}`);
            console.log(`   ✅ Correct: ${q.correctAnswer}`);
            console.log(`   📝 Explanation: ${q.explanation}`);
            console.log('-'.repeat(80));
        });

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

checkQuality();
