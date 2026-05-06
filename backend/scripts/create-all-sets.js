// Script to create all 10 sets of questions (500 total)
// This will read Set 1 and create Sets 2-10 with modified contexts

const fs = require('fs');

// Read the current seed.js file
const seedContent = fs.readFileSync(__dirname + '/seed.js', 'utf8');

// Extract the questions array
const questionsMatch = seedContent.match(/const questions = \[([\s\S]*?)\];/);
if (!questionsMatch) {
    console.error('Could not find questions array');
    process.exit(1);
}

const set1QuestionsText = questionsMatch[1];

// Context modifications for each set
const contextModifications = {
    2: { // School & Learning
        "play tennis": "study math",
        "on weekends": "after school",
        "late for work": "late for class",
        "to the gym": "to the library",
        "Mexico": "London",
        "the film": "the lesson",
        "the party": "the exam",
        "lunch": "studying",
        "buy a new phone": "finish my project",
        "work tomorrow": "attend class tomorrow"
    },
    3: { // Family & Friends
        "play tennis": "visit relatives",
        "on weekends": "on holidays",
        "late for work": "busy with family",
        "to the gym": "to family gatherings",
        "Mexico": "Paris",
        "the film": "the reunion",
        "the party": "the wedding",
        "lunch": "cooking",
        "buy a new phone": "organize a party",
        "work tomorrow": "meet friends tomorrow"
    },
    4: { // Travel & Entertainment
        "play tennis": "travel abroad",
        "on weekends": "during vacations",
        "late for work": "late for flights",
        "to the gym": "to the airport",
        "Mexico": "Thailand",
        "the film": "the concert",
        "the party": "the festival",
        "lunch": "sightseeing",
        "buy a new phone": "book a trip",
        "work tomorrow": "travel tomorrow"
    },
    5: { // Work & Career
        "play tennis": "work overtime",
        "on weekends": "on weekdays",
        "late for work": "busy at work",
        "to the gym": "to the office",
        "Mexico": "Singapore",
        "the film": "the presentation",
        "the party": "the conference",
        "lunch": "working",
        "buy a new phone": "start a business",
        "work tomorrow": "have a meeting tomorrow"
    },
    6: { // Health & Sports
        "play tennis": "exercise regularly",
        "on weekends": "every morning",
        "late for work": "tired after training",
        "to the gym": "to the stadium",
        "Mexico": "Brazil",
        "the film": "the match",
        "the party": "the tournament",
        "lunch": "training",
        "buy a new phone": "join a gym",
        "work tomorrow": "compete tomorrow"
    },
    7: { // Technology & Internet
        "play tennis": "code programs",
        "on weekends": "online",
        "late for work": "busy with tech",
        "to the gym": "to tech events",
        "Mexico": "Silicon Valley",
        "the film": "the webinar",
        "the party": "the hackathon",
        "lunch": "programming",
        "buy a new phone": "build an app",
        "work tomorrow": "launch tomorrow"
    },
    8: { // Environment & Nature
        "play tennis": "plant trees",
        "on weekends": "in nature",
        "late for work": "concerned about environment",
        "to the gym": "to the park",
        "Mexico": "Iceland",
        "the film": "the documentary",
        "the party": "the eco-event",
        "lunch": "gardening",
        "buy a new phone": "start recycling",
        "work tomorrow": "volunteer tomorrow"
    },
    9: { // Culture & Society
        "play tennis": "attend cultural events",
        "on weekends": "at festivals",
        "late for work": "interested in culture",
        "to the gym": "to museums",
        "Mexico": "Italy",
        "the film": "the exhibition",
        "the party": "the ceremony",
        "lunch": "exploring culture",
        "buy a new phone": "learn traditions",
        "work tomorrow": "celebrate tomorrow"
    },
    10: { // Mixed contexts
        "play tennis": "do activities",
        "on weekends": "regularly",
        "late for work": "busy with life",
        "to the gym": "to various places",
        "Mexico": "different countries",
        "the film": "the event",
        "the party": "the gathering",
        "lunch": "daily tasks",
        "buy a new phone": "make plans",
        "work tomorrow": "do things tomorrow"
    }
};

// Generate all sets
let allSetsText = set1QuestionsText;

for (let setNum = 2; setNum <= 10; setNum++) {
    let setQuestions = set1QuestionsText;

    // Replace setNumber: 1 with setNumber: setNum
    setQuestions = setQuestions.replace(/setNumber: 1/g, `setNumber: ${setNum}`);

    // Update orderIndex (add 50 * (setNum - 1) to each orderIndex)
    setQuestions = setQuestions.replace(/orderIndex: (\d+)/g, (match, num) => {
        const newIndex = parseInt(num) + 50 * (setNum - 1);
        return `orderIndex: ${newIndex}`;
    });

    // Apply context modifications
    const modifications = contextModifications[setNum];
    for (const [oldText, newText] of Object.entries(modifications)) {
        const regex = new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        setQuestions = setQuestions.replace(regex, newText);
    }

    allSetsText += ',\n' + setQuestions;
}

// Create new seed file with all sets
const newSeedContent = `require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [
${allSetsText}
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        // Clear existing questions
        await Question.deleteMany({});
        console.log('Cleared existing questions');

        // Insert new questions
        await Question.insertMany(questions);
        console.log(\`Successfully seeded \${questions.length} questions\`);

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
`;

// Write the new seed file
fs.writeFileSync(__dirname + '/seed-all-500.js', newSeedContent);
console.log('Created seed-all-500.js with 500 questions (10 sets × 50 questions)');
console.log('Run: node seed-all-500.js to seed the database');
