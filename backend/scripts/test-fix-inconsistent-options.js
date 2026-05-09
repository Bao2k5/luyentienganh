/**
 * Simple test script for fixInconsistentOptions function
 * Tests the function with example questions to verify it works correctly
 */

const { fixInconsistentOptions } = require('./fix-quality-issues.js');

// Test Case 1: Majority have subjects (3/4) → all should have subjects
const testQuestion1 = {
    questionText: "If I _______ rich, I would buy a house.",
    options: {
        A: "am",           // No subject
        B: "I were",       // Has subject
        C: "was",          // No subject
        D: "I was"         // Has subject
    },
    correctAnswer: "B",
    explanation: "Use past simple in if-clause for second conditional."
};

// Test Case 2: Majority lack subjects (3/4) → all should lack subjects
const testQuestion2 = {
    questionText: "I _______ to school every day.",
    options: {
        A: "go",           // No subject
        B: "goes",         // No subject
        C: "I going",      // Has subject
        D: "went"          // No subject
    },
    correctAnswer: "A",
    explanation: "Use present simple for habits."
};

// Test Case 3: 2-2 split with subject before blank → should remove subjects
const testQuestion3 = {
    questionText: "She _______ to the store yesterday.",
    options: {
        A: "go",           // No subject
        B: "she went",     // Has subject
        C: "went",         // No subject
        D: "she goes"      // Has subject
    },
    correctAnswer: "C",
    explanation: "Use past simple for completed actions."
};

// Test Case 4: All options already consistent → no changes
const testQuestion4 = {
    questionText: "I _______ never late for school.",
    options: {
        A: "am never",
        B: "be never",
        C: "never be",
        D: "never am"
    },
    correctAnswer: "A",
    explanation: "Adverbs of frequency come after 'to be'."
};

function runTest(testName, question) {
    console.log('\n' + '='.repeat(80));
    console.log(`TEST: ${testName}`);
    console.log('='.repeat(80));

    console.log('\nBEFORE:');
    console.log(`Question: ${question.questionText}`);
    console.log('Options:');
    console.log(`  A: ${question.options.A}`);
    console.log(`  B: ${question.options.B}`);
    console.log(`  C: ${question.options.C}`);
    console.log(`  D: ${question.options.D}`);
    console.log(`Explanation: ${question.explanation}`);

    const result = fixInconsistentOptions(question);

    console.log('\nAFTER:');
    console.log(`Question: ${result.updatedQuestion.questionText}`);
    console.log('Options:');
    console.log(`  A: ${result.updatedQuestion.options.A}`);
    console.log(`  B: ${result.updatedQuestion.options.B}`);
    console.log(`  C: ${result.updatedQuestion.options.C}`);
    console.log(`  D: ${result.updatedQuestion.options.D}`);
    console.log(`Explanation: ${result.updatedQuestion.explanation}`);

    console.log('\nCHANGES:');
    if (result.changes.length === 0) {
        console.log('  No changes needed - options already consistent');
    } else {
        result.changes.forEach(change => {
            console.log(`  ${change.field}:`);
            console.log(`    Before: "${change.before}"`);
            console.log(`    After:  "${change.after}"`);
            console.log(`    Reason: ${change.reason}`);
        });
    }
}

// Run all tests
console.log('\n');
console.log('╔' + '═'.repeat(78) + '╗');
console.log('║' + ' '.repeat(20) + 'TESTING fixInconsistentOptions()' + ' '.repeat(26) + '║');
console.log('╚' + '═'.repeat(78) + '╝');

runTest('Test 1: Majority have subjects (should add subjects to all)', testQuestion1);
runTest('Test 2: Majority lack subjects (should remove subjects from all)', testQuestion2);
runTest('Test 3: 2-2 split with subject in question (should remove subjects)', testQuestion3);
runTest('Test 4: Already consistent (no changes needed)', testQuestion4);

console.log('\n' + '='.repeat(80));
console.log('ALL TESTS COMPLETED');
console.log('='.repeat(80));
console.log('\n');
