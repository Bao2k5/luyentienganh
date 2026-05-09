require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

// Deep quality checks
const deepQualityCheck = (q, index) => {
    const issues = [];

    // 1. Check if question is too short (likely missing context)
    if (q.questionText.replace('_______', '').trim().split(' ').length < 3) {
        issues.push({
            type: 'SHORT_QUESTION',
            severity: 'HIGH',
            message: 'Question too short, likely missing context'
        });
    }

    // 2. Check for grammatical errors in options
    const optionValues = [q.options.A, q.options.B, q.options.C, q.options.D];

    // Check for "I were" (common error)
    optionValues.forEach((opt, i) => {
        if (opt.toLowerCase().includes('i were') || opt.toLowerCase().includes('i was not')) {
            // "I were" is wrong, but "If I were" is correct (subjunctive)
            if (!q.questionText.toLowerCase().includes('if i')) {
                issues.push({
                    type: 'GRAMMAR_ERROR',
                    severity: 'HIGH',
                    message: `Option ${String.fromCharCode(65 + i)}: Contains "I were" without subjunctive context`,
                    option: String.fromCharCode(65 + i),
                    value: opt
                });
            }
        }
    });

    // 3. Check if options have inconsistent structure
    const hasSubject = optionValues.map(opt => {
        const words = opt.trim().split(' ');
        // Check if first word looks like a subject (I, he, she, it, they, we, you, or "the X")
        const firstWord = words[0].toLowerCase();
        return ['i', 'he', 'she', 'it', 'they', 'we', 'you', 'the'].includes(firstWord) ||
            (firstWord === 'the' && words.length > 1);
    });

    const subjectCount = hasSubject.filter(Boolean).length;
    if (subjectCount > 0 && subjectCount < 4) {
        issues.push({
            type: 'INCONSISTENT_OPTIONS',
            severity: 'MEDIUM',
            message: `Only ${subjectCount}/4 options have subjects - inconsistent structure`,
            details: hasSubject.map((has, i) => `${String.fromCharCode(65 + i)}: ${has ? 'Has subject' : 'No subject'}`)
        });
    }

    // 4. Check if question ends with period before blank (should not)
    if (q.questionText.includes('. _______')) {
        issues.push({
            type: 'FORMATTING',
            severity: 'LOW',
            message: 'Period before blank - should be removed'
        });
    }

    // 5. Check if all options are too similar (bad distractors)
    const optionWords = optionValues.map(opt => opt.toLowerCase().split(' '));
    const commonWords = optionWords[0].filter(word =>
        optionWords.every(opts => opts.includes(word))
    );

    if (commonWords.length > 2) {
        issues.push({
            type: 'WEAK_DISTRACTORS',
            severity: 'MEDIUM',
            message: `All options share ${commonWords.length} common words - may be too similar`,
            commonWords: commonWords.join(', ')
        });
    }

    // 6. Check if correct answer is always in same position (pattern detection)
    // This will be checked across multiple questions

    // 7. Check if explanation is generic (too short or vague)
    if (q.explanation.length < 30) {
        issues.push({
            type: 'WEAK_EXPLANATION',
            severity: 'MEDIUM',
            message: 'Explanation too short or vague'
        });
    }

    // 8. Check if question has time marker but wrong tense in options
    const timeMarkers = {
        past: ['yesterday', 'last', 'ago', 'in 2020', 'when i was'],
        present: ['now', 'today', 'currently', 'at the moment'],
        future: ['tomorrow', 'next', 'will', 'going to', 'in 2030']
    };

    let detectedTense = null;
    const questionLower = q.questionText.toLowerCase();

    for (const [tense, markers] of Object.entries(timeMarkers)) {
        if (markers.some(marker => questionLower.includes(marker))) {
            detectedTense = tense;
            break;
        }
    }

    if (detectedTense) {
        // Check if correct answer matches the tense
        const correctOpt = q.options[q.correctAnswer].toLowerCase();
        
        // Expanded list of past tense indicators including irregular verbs
        const pastIndicators = [
            'ed', 'was', 'were', 'did', 'had',
            'went', 'saw', 'ate', 'drank', 'came', 'gave', 'made', 'said', 'told', 
            'bought', 'brought', 'caught', 'fought', 'taught', 'thought',
            'became', 'began', 'broke', 'chose', 'forgot', 'knew', 'lost', 'ran', 
            'sang', 'slept', 'spoke', 'swam', 'took', 'wrote', 'found', 'met'
        ];

        if (detectedTense === 'past' && !pastIndicators.some(indicator => correctOpt.includes(indicator))) {
            // Special case: "I started _______" - the past tense is already in "started"
            if (!questionLower.includes('started') && !questionLower.includes('began') && 
                !questionLower.includes('liked') && !questionLower.includes('enjoyed')) {
                issues.push({
                    type: 'TENSE_MISMATCH',
                    severity: 'HIGH',
                    message: `Question has past time marker but correct answer may not be past tense`,
                    detectedTense,
                    correctAnswer: q.options[q.correctAnswer]
                });
            }
        }
    }

    return issues;
};

const runDeepCheck = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const questions = await Question.find({}).sort({ setNumber: 1, orderIndex: 1 });
        console.log(`📊 Analyzing ${questions.length} questions...\n`);

        const allIssues = [];
        const issuesByType = {};
        const issuesBySet = {};

        questions.forEach((q, index) => {
            const issues = deepQualityCheck(q, index);

            if (issues.length > 0) {
                allIssues.push({
                    questionIndex: index + 1,
                    setNumber: q.setNumber,
                    unit: q.unit,
                    questionText: q.questionText,
                    issues
                });

                // Count by type
                issues.forEach(issue => {
                    issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
                });

                // Count by set
                if (!issuesBySet[q.setNumber]) {
                    issuesBySet[q.setNumber] = 0;
                }
                issuesBySet[q.setNumber] += issues.length;
            }
        });

        // Print summary
        console.log('='.repeat(80));
        console.log('📈 DEEP QUALITY CHECK SUMMARY');
        console.log('='.repeat(80));
        console.log(`Total Questions: ${questions.length}`);
        console.log(`Questions with Issues: ${allIssues.length}`);
        console.log(`Total Issues Found: ${allIssues.reduce((sum, q) => sum + q.issues.length, 0)}\n`);

        console.log('📊 Issues by Type:');
        Object.entries(issuesByType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
            console.log(`  ${type}: ${count}`);
        });

        console.log('\n📊 Issues by Set:');
        Object.entries(issuesBySet).sort((a, b) => a[0] - b[0]).forEach(([set, count]) => {
            console.log(`  Set ${set}: ${count} issues`);
        });

        // Print HIGH severity issues
        console.log('\n' + '='.repeat(80));
        console.log('🚨 HIGH SEVERITY ISSUES (Need immediate fix)');
        console.log('='.repeat(80));

        let highCount = 0;
        allIssues.forEach(q => {
            const highIssues = q.issues.filter(i => i.severity === 'HIGH');
            if (highIssues.length > 0) {
                highCount++;
                console.log(`\nQ${q.questionIndex} [Set ${q.setNumber}, ${q.unit}]`);
                console.log(`Question: ${q.questionText}`);
                highIssues.forEach(issue => {
                    console.log(`  ❌ ${issue.type}: ${issue.message}`);
                    if (issue.details) console.log(`     Details: ${JSON.stringify(issue.details)}`);
                    if (issue.option) console.log(`     Option ${issue.option}: ${issue.value}`);
                });
            }
        });

        if (highCount === 0) {
            console.log('\n✅ No high severity issues found!');
        }

        // Print MEDIUM severity issues (sample)
        console.log('\n' + '='.repeat(80));
        console.log('⚠️  MEDIUM SEVERITY ISSUES (Sample - first 10)');
        console.log('='.repeat(80));

        let mediumCount = 0;
        allIssues.forEach(q => {
            const mediumIssues = q.issues.filter(i => i.severity === 'MEDIUM');
            if (mediumIssues.length > 0 && mediumCount < 10) {
                mediumCount++;
                console.log(`\nQ${q.questionIndex} [Set ${q.setNumber}, ${q.unit}]`);
                console.log(`Question: ${q.questionText}`);
                mediumIssues.forEach(issue => {
                    console.log(`  ⚠️  ${issue.type}: ${issue.message}`);
                });
            }
        });

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

runDeepCheck();
