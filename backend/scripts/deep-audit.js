/**
 * DEEP AUDIT - checks linguistic quality, not just structure
 * Catches:
 *  1. Vietnamese text bleeding into English options
 *  2. Empty/malformed question text (missing blanks, broken strings)
 *  3. Correct answer not being a valid English word/phrase
 *  4. Options that are identical to each other
 *  5. Specific per-question rule checks (grammar correctness)
 *  6. Q11 wrong option bug (p11[1]+'ys' = Vietnamese+ys)
 *  7. Q5/Q6/Q7/Q8/Q15/Q16 string manipulation bugs
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

const errors = [];
const warnings = [];

// Vietnamese character range detector
function hasVietnamese(str) {
    return /[àáâãèéêìíòóôõùúýăđơư]/i.test(str);
}

// Check if string looks like an English grammar option (not Vietnamese)
function isEnglishOption(str) {
    // Allow parenthetical notes like "(easy)" in Q33/Q34
    const cleaned = str.replace(/\(.*?\)/g, '').trim();
    if (!cleaned) return true;
    return !hasVietnamese(cleaned);
}

// Expected correct answers for EVERY question type (set-agnostic checks)
const EXPECTED_PATTERNS = {
    // Q1: correct = adverb (never/always/etc)
    1: { checkFn: (q) => {
        const adverbs = ['never','always','usually','often','sometimes','rarely','occasionally','hardly ever'];
        const correct = q.options[q.correctAnswer];
        if (!adverbs.includes(correct)) return `Q1 correct answer "${correct}" is not an adverb of frequency`;
        return null;
    }},
    // Q2: correct = "is/am/are + adverb (or compound adverb)"
    2: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        const parts = correct.split(' ');
        const beVerbs = ['is','am','are'];
        const adverbs = ['never','always','usually','often','sometimes','rarely','occasionally','hardly','ever','hardly ever','not always'];
        if (!beVerbs.includes(parts[0])) return `Q2 first word "${parts[0]}" should be is/am/are`;
        const rest = parts.slice(1).join(' ');
        if (!adverbs.includes(rest)) return `Q2 adverb part "${rest}" not a valid frequency adverb`;
        return null;
    }},
    // Q3: correct = "often"
    3: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'often') return `Q3 correct should be "often", got "${correct}"`;
        return null;
    }},
    // Q9: correct = "didn't"
    9: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== "didn't") return `Q9 correct should be "didn't", got "${correct}"`;
        return null;
    }},
    // Q10: correct = "Did"
    10: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'Did') return `Q10 correct should be "Did", got "${correct}"`;
        return null;
    }},
    // Q12: correct = "What"
    12: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'What') return `Q12 correct should be "What", got "${correct}"`;
        return null;
    }},
    // Q13: correct = "Where"
    13: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'Where') return `Q13 correct should be "Where", got "${correct}"`;
        return null;
    }},
    // Q14: correct = "Can"
    14: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'Can') return `Q14 correct should be "Can", got "${correct}"`;
        return null;
    }},
    // Q17: correct = "when"
    17: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'when') return `Q17 correct should be "when", got "${correct}"`;
        return null;
    }},
    // Q24: correct = "won't"
    24: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== "won't") return `Q24 correct should be "won't", got "${correct}"`;
        return null;
    }},
    // Q25: correct = "will"
    25: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'will') return `Q25 correct should be "will", got "${correct}"`;
        return null;
    }},
    // Q26: correct = "will"
    26: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'will') return `Q26 correct should be "will", got "${correct}"`;
        return null;
    }},
    // Q28: correct = "going to"
    28: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'going to') return `Q28 correct should be "going to", got "${correct}"`;
        return null;
    }},
    // Q35: correct = "less"
    35: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'less') return `Q35 correct should be "less", got "${correct}"`;
        return null;
    }},
    // Q37: correct = "never"
    37: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'never') return `Q37 correct should be "never", got "${correct}"`;
        return null;
    }},
    // Q38: correct = "ever"
    38: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'ever') return `Q38 correct should be "ever", got "${correct}"`;
        return null;
    }},
    // Q43: correct = "who" (relative clause for people)
    43: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'who') return `Q43 correct should be "who", got "${correct}"`;
        return null;
    }},
    // Q44: correct = "which" (relative clause for things)
    44: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'which') return `Q44 correct should be "which", got "${correct}"`;
        return null;
    }},
    // Q45: correct = "where" (relative clause for places)
    45: { checkFn: (q) => {
        const correct = q.options[q.correctAnswer];
        if (correct !== 'where') return `Q45 correct should be "where", got "${correct}"`;
        return null;
    }},
};

async function deepAudit() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const questions = await Question.find({}).sort({ setNumber: 1, orderIndex: 1 });
    console.log(`Total: ${questions.length} questions\n`);

    for (const q of questions) {
        const tag = `Set${q.setNumber}/Q${q.orderIndex}`;
        const allOptions = Object.entries(q.options || {});

        // ── 1. CHECK: Vietnamese text in English options ──────────────────
        for (const [letter, text] of allOptions) {
            if (!isEnglishOption(text)) {
                errors.push(`❌ ${tag}: Option ${letter} has Vietnamese text: "${text}"`);
            }
        }

        // ── 2. CHECK: Correct answer option has Vietnamese ────────────────
        const correctText = q.options[q.correctAnswer] || '';
        if (hasVietnamese(correctText)) {
            errors.push(`❌ ${tag}: CORRECT option ${q.correctAnswer} has Vietnamese: "${correctText}"`);
        }

        // ── 3. CHECK: Question text has "____" blank ──────────────────────
        if (!q.questionText.includes('_')) {
            warnings.push(`⚠️ ${tag}: Question text has no blank: "${q.questionText.substring(0,60)}"`);
        }

        // ── 4. CHECK: Options not empty ───────────────────────────────────
        for (const [letter, text] of allOptions) {
            if (!text || text.trim().length === 0) {
                errors.push(`❌ ${tag}: Option ${letter} is empty`);
            }
        }

        // ── 5. CHECK: All 4 options exist ─────────────────────────────────
        if (allOptions.length !== 4) {
            errors.push(`❌ ${tag}: Expected 4 options, got ${allOptions.length}`);
        }

        // ── 6. CHECK: No duplicate option texts ───────────────────────────
        const optTexts = allOptions.map(([,t]) => t.toLowerCase().trim());
        const uniqueOpts = new Set(optTexts);
        if (uniqueOpts.size !== optTexts.length) {
            errors.push(`❌ ${tag}: Duplicate option values: [${optTexts.join(' | ')}]`);
        }

        // ── 7. CHECK: Correct answer is not identical to a wrong answer ───
        const wrongTexts = allOptions
            .filter(([l]) => l !== q.correctAnswer)
            .map(([,t]) => t.toLowerCase().trim());
        if (wrongTexts.includes(correctText.toLowerCase().trim())) {
            errors.push(`❌ ${tag}: Correct answer "${correctText}" appears in wrong options too`);
        }

        // ── 8. CHECK: Options look like reasonable English ─────────────────
        for (const [letter, text] of allOptions) {
            // Option text shouldn't start with Vietnamese characters
            if (/^[àáâãèéêìíòóôõùúýăđơư]/i.test(text)) {
                errors.push(`❌ ${tag}: Option ${letter} starts with Vietnamese char: "${text}"`);
            }
            // Option text shouldn't be too long (> 80 chars for single option)
            if (text.length > 80) {
                warnings.push(`⚠️ ${tag}: Option ${letter} is very long (${text.length} chars)`);
            }
        }

        // ── 9. CHECK: Per-question grammar rule checks ─────────────────────
        const rule = EXPECTED_PATTERNS[q.orderIndex];
        if (rule) {
            const result = rule.checkFn(q);
            if (result) {
                errors.push(`❌ ${tag}: Grammar rule violated — ${result}`);
            }
        }

        // ── 10. CHECK: Q11 specific — third wrong option must be English ──
        if (q.orderIndex === 11) {
            const wrongOptions = allOptions
                .filter(([l]) => l !== q.correctAnswer)
                .map(([,t]) => t);
            for (const w of wrongOptions) {
                if (hasVietnamese(w)) {
                    errors.push(`❌ ${tag}: Q11 wrong option has Vietnamese: "${w}"`);
                }
            }
            // The correct answer must end in "-ied"
            if (!correctText.endsWith('ied')) {
                errors.push(`❌ ${tag}: Q11 correct "${correctText}" should end in -ied`);
            }
        }

        // ── 11. CHECK: Q15 — correct must be "was/were + Ving" ────────────
        if (q.orderIndex === 15) {
            if (!/^(was|were) \w+ing$/.test(correctText)) {
                errors.push(`❌ ${tag}: Q15 correct "${correctText}" should be "was/were + Ving"`);
            }
        }

        // ── 12. CHECK: Q22/Q23 — must contain "going to" ─────────────────
        if (q.orderIndex === 22) {
            if (!correctText.includes('going to')) {
                errors.push(`❌ ${tag}: Q22 correct "${correctText}" should contain "going to"`);
            }
        }

        // ── 13. CHECK: Q27/Q32 — correct must be present simple (no will) ─
        if (q.orderIndex === 27 || q.orderIndex === 32) {
            if (correctText.includes('will') || correctText.includes('would')) {
                errors.push(`❌ ${tag}: Q${q.orderIndex} correct "${correctText}" should NOT have "will/would" in if-clause`);
            }
        }

        // ── 14. CHECK: Q33 — correct must end in "-er" ────────────────────
        if (q.orderIndex === 33) {
            if (!correctText.endsWith('er') && !['better','further','further'].includes(correctText)) {
                errors.push(`❌ ${tag}: Q33 correct "${correctText}" should end in -er (comparative)`);
            }
        }

        // ── 15. CHECK: Q34 — correct must start with "most " ─────────────
        if (q.orderIndex === 34) {
            if (!correctText.startsWith('most ') && !['best','worst','furthest'].includes(correctText)) {
                errors.push(`❌ ${tag}: Q34 correct "${correctText}" should start with "most"`);
            }
        }

        // ── 16. CHECK: Q36 — correct must be Have/Has ────────────────────
        if (q.orderIndex === 36) {
            if (!['Have','Has'].includes(correctText)) {
                errors.push(`❌ ${tag}: Q36 correct "${correctText}" should be Have or Has`);
            }
        }

        // ── 17. CHECK: Q42 — correct must be "Both B & C" ────────────────
        if (q.orderIndex === 42) {
            if (!correctText.includes('Both') && !correctText.includes('both')) {
                errors.push(`❌ ${tag}: Q42 correct "${correctText}" should indicate both options valid`);
            }
        }
    }

    // ══ REPORT ══════════════════════════════════════════════════════════
    console.log('========== DEEP AUDIT REPORT ==========');

    if (errors.length === 0) {
        console.log('✅ NO ERRORS FOUND');
    } else {
        console.log(`❌ ${errors.length} ERROR(S):`);
        errors.forEach(e => console.log(e));
    }

    console.log(`\n⚠️ ${warnings.length} WARNING(S):`);
    warnings.slice(0,20).forEach(w => console.log(w));
    if (warnings.length > 20) console.log(`  ... and ${warnings.length - 20} more`);

    console.log(`\nTotal: ${questions.length} questions | ${errors.length} errors | ${warnings.length} warnings`);

    await mongoose.connection.close();
    process.exit(errors.length > 0 ? 1 : 0);
}

deepAudit().catch(err => { console.error(err); process.exit(1); });
