require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Question = require('../models/Question');

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const questions = await Question.find({}).sort({ setNumber: 1, orderIndex: 1 });
        
        const output = `require('dotenv').config();\nconst mongoose = require('mongoose');\nconst Question = require('../models/Question');\n\nconst questions = ${JSON.stringify(questions.map(q => ({
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            vietnameseTranslation: q.vietnameseTranslation || '',
            optionTranslations: q.optionTranslations || { A: '', B: '', C: '', D: '' },
            unit: q.unit,
            orderIndex: q.orderIndex,
            setNumber: q.setNumber
        })), null, 4)};\n\nasync function seedDB() {\n    try {\n        await mongoose.connect(process.env.MONGODB_URI);\n        console.log('Connected to Database');\n\n        await Question.deleteMany({});\n        console.log('Cleared existing questions');\n\n        await Question.insertMany(questions);\n        console.log('Successfully seeded ' + questions.length + ' questions');\n\n        mongoose.connection.close();\n    } catch (error) {\n        console.error('Error seeding data:', error);\n        mongoose.connection.close();\n    }\n}\n\nseedDB();\n`;

        fs.writeFileSync('./seed-all-500.js', output, 'utf-8');
        console.log('Generated seed-all-500.js with translations!');
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
run();
