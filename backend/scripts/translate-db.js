require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

async function translateChunk(texts) {
    try {
        const combined = texts.join('\n');
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(combined)}`;
        const response = await fetch(url);
        const data = await response.json();
        const translated = data[0].map(item => item[0]).join('');
        return translated.split('\n').map(s => s.trim());
    } catch (error) {
        console.error('Error translating chunk', error);
        return null;
    }
}

// Delay function
const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const questions = await Question.find({});
        console.log(`Found ${questions.length} questions to process.`);

        const chunkSize = 10; // Process 10 questions at a time
        for (let i = 0; i < questions.length; i += chunkSize) {
            const chunk = questions.slice(i, i + chunkSize);
            console.log(`Processing questions ${i + 1} to ${Math.min(i + chunkSize, questions.length)}...`);
            
            const textsToTranslate = [];
            for (const q of chunk) {
                textsToTranslate.push(q.questionText);
                textsToTranslate.push(q.options.A);
                textsToTranslate.push(q.options.B);
                textsToTranslate.push(q.options.C);
                textsToTranslate.push(q.options.D);
            }

            const translatedParts = await translateChunk(textsToTranslate);

            if (translatedParts && translatedParts.length >= textsToTranslate.length) {
                for (let j = 0; j < chunk.length; j++) {
                    const q = chunk[j];
                    const baseIdx = j * 5;
                    q.vietnameseTranslation = translatedParts[baseIdx];
                    q.optionTranslations = {
                        A: translatedParts[baseIdx + 1],
                        B: translatedParts[baseIdx + 2],
                        C: translatedParts[baseIdx + 3],
                        D: translatedParts[baseIdx + 4]
                    };
                    await q.save();
                }
                console.log(`Successfully updated ${chunk.length} questions.`);
            } else {
                console.error(`Failed to translate chunk starting at index ${i}`);
            }

            // Wait a bit to avoid rate limits
            await delay(1500);
        }

        console.log('Finished updating database!');
        process.exit(0);
    } catch(e) {
        console.error('Error:', e);
        process.exit(1);
    }
}
run();
