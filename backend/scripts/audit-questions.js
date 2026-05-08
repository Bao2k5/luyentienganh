require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

const errors = [];
const warnings = [];

// Define the 50 grammar rules to verify against
const GRAMMAR_RULES = {
    1:  { topic: "Adverb before main verb",        keyWords: ["never","always","usually","often","sometimes","rarely","occasionally","hardly"] },
    2:  { topic: "Adverb after to-be",             keyWords: ["is","am","are","was","were"] },
    3:  { topic: "How often",                      keyWords: ["How"] },
    4:  { topic: "Present Simple truth/fact",      keyWords: ["boils","rises","melts","floats","need","goes","attracts","have","live","breathe"] },
    5:  { topic: "Present Simple schedule",        keyWords: ["leaves","arrives","departs","starts","opens","closes","ends","begins","takes place","finishes"] },
    6:  { topic: "Present Continuous at the moment", keyWords: ["at the moment"] },
    7:  { topic: "Stative verbs (no -ing)",        keyWords: ["know","believe","understand","like","need","want","love","remember","prefer","hate"] },
    8:  { topic: "Past Simple affirmative",        keyWords: ["Yesterday"] },
    9:  { topic: "Past Simple negative (didn't)",  keyWords: ["didn't"] },
    10: { topic: "Past Simple question (Did)",     keyWords: ["Did"] },
    11: { topic: "Past Simple -ied spelling",      keyWords: ["studied","tried","carried","cried","replied","hurried","worried","married","emptied","copied"] },
    12: { topic: "Wh-question (What)",             keyWords: ["What"] },
    13: { topic: "Wh-question (Where)",            keyWords: ["Where"] },
    14: { topic: "Can request",                    keyWords: ["Can"] },
    15: { topic: "Past Continuous was/were",       keyWords: ["was","were"] },
    16: { topic: "Past Continuous interrupted",    keyWords: ["while"] },
    17: { topic: "when vs while",                  keyWords: ["when","while"] },
    18: { topic: "Indefinite pronouns (something/someone/somewhere)", keyWords: ["something","someone","somewhere"] },
    19: { topic: "Indefinite pronouns (anything/anyone/anywhere)",    keyWords: ["anything","anyone","anywhere"] },
    20: { topic: "Indefinite pronouns (nothing/no one/nowhere)",      keyWords: ["nothing","no one","nowhere"] },
    21: { topic: "Everyone/Everything + singular verb",               keyWords: ["Everyone","Everything"] },
    22: { topic: "be going to (plans)",            keyWords: ["going to"] },
    23: { topic: "be going to negative",           keyWords: ["going to"] },
    24: { topic: "won't (promise)",                keyWords: ["won't","promise"] },
    25: { topic: "will (offer)",                   keyWords: ["will"] },
    26: { topic: "will (spontaneous decision)",    keyWords: ["will"] },
    27: { topic: "If clause no future",            keyWords: ["If"] },
    28: { topic: "going to structure",             keyWords: ["going to"] },
    29: { topic: "Zero conditional",               keyWords: ["If"] },
    30: { topic: "Zero conditional machine",       keyWords: ["If"] },
    31: { topic: "First conditional won't",        keyWords: ["If"] },
    32: { topic: "First conditional if-clause",    keyWords: ["If"] },
    33: { topic: "Comparative short adjectives",   keyWords: ["than"] },
    34: { topic: "Superlative long adjectives",    keyWords: ["the"] },
    35: { topic: "Comparative (less)",             keyWords: ["less","than"] },
    36: { topic: "Present Perfect Have/Has",       keyWords: ["ever"] },
    37: { topic: "Present Perfect never",          keyWords: ["never"] },
    38: { topic: "Present Perfect ever (superlative)", keyWords: ["best","ever"] },
    39: { topic: "Verb + -ing (practise/enjoy)",   keyWords: ["practise","enjoy","finish","mind","miss","recommend","avoid","suggest","feel like","stop"] },
    40: { topic: "Verb + to-inf (need/want)",      keyWords: ["need","want","decide","promise","hope","plan","offer","agree","manage","arrange"] },
    41: { topic: "Verb + obj + to-inf (persuade)", keyWords: ["persuade","ask","want","tell","advise","invite","warn","remind","allow","expect"] },
    42: { topic: "start to/V-ing",                keyWords: ["start","started"] },
    43: { topic: "Relative clause (who = person)", keyWords: ["who"] },
    44: { topic: "Relative clause (which = thing)", keyWords: ["which"] },
    45: { topic: "Relative clause (where = place)", keyWords: ["where"] },
    46: { topic: "Vocabulary: Personality",        keyWords: ["serious","confident","friendly","honest","patient","reliable","creative","professional"] },
    47: { topic: "Vocabulary: School Subjects",    keyWords: ["drama","art","biology","maths","physics","history","geography","chemistry","IT","PE"] },
    48: { topic: "Vocabulary: Food/Diet",          keyWords: ["vegetarian","vegan","allergy","delicious","raw"] },
    49: { topic: "Vocabulary: Motivation",         keyWords: ["challenge","encourage","praise","prize","punish","purpose","reward"] },
    50: { topic: "Vocabulary: Extreme Adjectives", keyWords: ["spectacular","awful","brilliant","disgusting","enormous","filthy","freezing","tiny"] },
};

const VALID_ANSWERS = ['A','B','C','D'];
const VALID_UNITS = ['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5','Unit 6','Vocabulary'];

async function audit() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const questions = await Question.find({}).sort({ setNumber: 1, orderIndex: 1 });

    console.log(`Total questions found: ${questions.length}\n`);

    if (questions.length !== 500) {
        errors.push(`❌ CRITICAL: Expected 500 questions, found ${questions.length}`);
    }

    // Check set distribution
    const setsFound = {};
    questions.forEach(q => {
        setsFound[q.setNumber] = (setsFound[q.setNumber] || 0) + 1;
    });
    for (let s = 1; s <= 10; s++) {
        if ((setsFound[s] || 0) !== 50) {
            errors.push(`❌ Set ${s}: Expected 50 questions, found ${setsFound[s] || 0}`);
        }
    }

    // Check for duplicate questionText across all sets
    const questionTexts = questions.map(q => q.questionText);
    const uniqueTexts = new Set(questionTexts);
    if (uniqueTexts.size !== questions.length) {
        errors.push(`❌ DUPLICATE QUESTIONS FOUND: ${questions.length - uniqueTexts.size} duplicates`);
        // Find and report duplicates
        const seen = {};
        questions.forEach(q => {
            if (seen[q.questionText]) {
                errors.push(`  → Duplicate: Set${q.setNumber}/Q${q.orderIndex}: "${q.questionText.substring(0,60)}..."`);
            }
            seen[q.questionText] = true;
        });
    } else {
        console.log('✅ All 500 questions are unique (no duplicates)');
    }

    // Per-question checks
    let qErrors = 0;
    for (const q of questions) {
        const tag = `Set${q.setNumber}/Q${q.orderIndex}`;

        // 1. Required fields
        if (!q.questionText) errors.push(`❌ ${tag}: Missing questionText`);
        if (!q.correctAnswer) errors.push(`❌ ${tag}: Missing correctAnswer`);
        if (!q.explanation) errors.push(`❌ ${tag}: Missing explanation`);
        if (!q.vietnameseTranslation) warnings.push(`⚠️ ${tag}: Missing Vietnamese translation`);
        if (!q.commonMistake) errors.push(`❌ ${tag}: Missing commonMistake`);

        // 2. Correct answer must be A/B/C/D
        if (!VALID_ANSWERS.includes(q.correctAnswer)) {
            errors.push(`❌ ${tag}: Invalid correctAnswer "${q.correctAnswer}"`); qErrors++;
        }

        // 3. Correct answer option must exist
        if (q.options && !q.options[q.correctAnswer]) {
            errors.push(`❌ ${tag}: correctAnswer ${q.correctAnswer} but that option text is empty!`); qErrors++;
        }

        // 4. All 4 options must exist and not be empty
        for (const opt of VALID_ANSWERS) {
            if (!q.options?.[opt]) {
                errors.push(`❌ ${tag}: Option ${opt} is empty`); qErrors++;
            }
        }

        // 5. Unit must be valid
        if (!VALID_UNITS.includes(q.unit)) {
            errors.push(`❌ ${tag}: Invalid unit "${q.unit}"`); qErrors++;
        }

        // 6. orderIndex must be 1–50
        if (q.orderIndex < 1 || q.orderIndex > 50) {
            errors.push(`❌ ${tag}: orderIndex ${q.orderIndex} is out of range 1-50`); qErrors++;
        }

        // 7. Grammar topic check — question should contain relevant keyword
        const rule = GRAMMAR_RULES[q.orderIndex];
        if (rule) {
            const fullText = (q.questionText + ' ' + Object.values(q.options || {})).toLowerCase();
            const hasKeyword = rule.keyWords.some(kw => fullText.includes(kw.toLowerCase()));
            if (!hasKeyword) {
                warnings.push(`⚠️ ${tag} [${rule.topic}]: None of the expected keywords (${rule.keyWords.join(',')}) found in question or options.`);
            }
        }

        // 8. commonMistake should be non-generic
        if (q.commonMistake && q.commonMistake === "⚠️ Lưu ý: Đọc kỹ đề và chú ý ngữ cảnh câu.") {
            warnings.push(`⚠️ ${tag}: Using generic fallback commonMistake`);
        }

        // 9. Correct answer option should not be identical to a wrong option
        if (q.options) {
            const vals = Object.values(q.options);
            const uniqueVals = new Set(vals);
            if (uniqueVals.size !== vals.length) {
                errors.push(`❌ ${tag}: Duplicate option values! One option's text appears twice`); qErrors++;
            }
        }

        // 10. Explanation must mention the correct rule
        if (q.explanation && q.explanation.length < 20) {
            warnings.push(`⚠️ ${tag}: Explanation is very short (${q.explanation.length} chars)`);
        }

        if (qErrors > 50) {
            console.log('Too many errors, stopping early...');
            break;
        }
    }

    // Summary
    console.log('\n========== AUDIT REPORT ==========');
    if (errors.length === 0) {
        console.log('✅ NO CRITICAL ERRORS FOUND');
    } else {
        console.log(`❌ ${errors.length} CRITICAL ERROR(S):`);
        errors.forEach(e => console.log(' ', e));
    }

    console.log(`\n⚠️ ${warnings.length} WARNING(S):`);
    if (warnings.length > 0) {
        warnings.slice(0,30).forEach(w => console.log(' ', w));
        if (warnings.length > 30) console.log(`  ... and ${warnings.length - 30} more warnings`);
    }

    console.log('\n===================================');
    console.log(`Total: ${questions.length} questions | ${errors.length} errors | ${warnings.length} warnings`);

    await mongoose.connection.close();
    process.exit(errors.length > 0 ? 1 : 0);
}

audit().catch(err => { console.error(err); process.exit(1); });
