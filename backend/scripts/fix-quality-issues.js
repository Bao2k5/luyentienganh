require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Question = require('../models/Question');

// ============================================================================
// CONFIGURATION
// ============================================================================

const BACKUP_FILE = path.join(__dirname, '../backup-1778265162622.json');
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000; // Initial delay, will use exponential backoff

// ============================================================================
// CHANGE LOGGING SYSTEM
// ============================================================================

class ChangeLogger {
    constructor() {
        this.changes = [];
        this.errors = [];
    }

    logChange(questionId, setNumber, orderIndex, unit, issueTypes, fieldChanges) {
        this.changes.push({
            questionId,
            setNumber,
            orderIndex,
            unit,
            issueTypes,
            timestamp: new Date(),
            changes: fieldChanges
        });
    }

    logError(questionId, error) {
        this.errors.push({
            questionId,
            error: error.message || String(error),
            timestamp: new Date()
        });
    }

    getChanges() {
        return this.changes;
    }

    getErrors() {
        return this.errors;
    }

    getSummary() {
        const byIssueType = {};
        this.changes.forEach(change => {
            change.issueTypes.forEach(type => {
                byIssueType[type] = (byIssueType[type] || 0) + 1;
            });
        });

        return {
            totalProcessed: this.changes.length,
            totalFailed: this.errors.length,
            byIssueType
        };
    }
}

// ============================================================================
// DATABASE CONNECTION WITH RETRY LOGIC
// ============================================================================

async function connectWithRetry(maxAttempts = MAX_RETRY_ATTEMPTS) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`[INFO] Attempting to connect to MongoDB (attempt ${attempt}/${maxAttempts})...`);

            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            console.log('✅ Connected to MongoDB successfully\n');
            return true;

        } catch (error) {
            lastError = error;
            console.error(`[ERROR] Connection attempt ${attempt} failed: ${error.message}`);

            if (attempt < maxAttempts) {
                const delayMs = RETRY_DELAY_MS * Math.pow(2, attempt - 1); // Exponential backoff
                console.log(`[INFO] Retrying in ${delayMs}ms...\n`);
                await sleep(delayMs);
            }
        }
    }

    throw new Error(`Failed to connect to MongoDB after ${maxAttempts} attempts. Last error: ${lastError.message}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// BACKUP FILE VERIFICATION
// ============================================================================

function verifyBackupFile() {
    console.log('[INFO] Verifying backup file...');

    if (!fs.existsSync(BACKUP_FILE)) {
        throw new Error(`Backup file not found: ${BACKUP_FILE}`);
    }

    const stats = fs.statSync(BACKUP_FILE);
    console.log(`✅ Backup file verified: ${BACKUP_FILE}`);
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Modified: ${stats.mtime.toISOString()}\n`);

    // Verify it's valid JSON
    try {
        const content = fs.readFileSync(BACKUP_FILE, 'utf8');
        const data = JSON.parse(content);
        console.log(`✅ Backup file is valid JSON with ${data.length} questions\n`);
        return true;
    } catch (error) {
        throw new Error(`Backup file is corrupted or invalid JSON: ${error.message}`);
    }
}

// ============================================================================
// COMMAND-LINE OPTIONS PARSING
// ============================================================================

function parseCommandLineOptions() {
    const args = process.argv.slice(2);
    const options = {
        dryRun: false,
        issueTypes: null, // null means all types
        questionIds: null // null means all questions
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--dry-run' || arg === '-d') {
            options.dryRun = true;
        } else if (arg === '--issue-types' || arg === '-i') {
            if (i + 1 < args.length) {
                options.issueTypes = args[i + 1].split(',').map(t => t.trim());
                i++;
            }
        } else if (arg === '--question-ids' || arg === '-q') {
            if (i + 1 < args.length) {
                options.questionIds = args[i + 1].split(',').map(id => id.trim());
                i++;
            }
        } else if (arg === '--help' || arg === '-h') {
            printUsage();
            process.exit(0);
        }
    }

    return options;
}

function printUsage() {
    console.log(`
Usage: node fix-quality-issues.js [options]

Options:
  --dry-run, -d              Run in dry-run mode (no database changes)
  --issue-types, -i <types>  Comma-separated list of issue types to fix
                             Example: INCONSISTENT_OPTIONS,WEAK_EXPLANATION
  --question-ids, -q <ids>   Comma-separated list of question IDs to process
                             Example: 507f1f77bcf86cd799439011,507f191e810c19729de860ea
  --help, -h                 Show this help message

Examples:
  node fix-quality-issues.js
  node fix-quality-issues.js --dry-run
  node fix-quality-issues.js --issue-types INCONSISTENT_OPTIONS
  node fix-quality-issues.js --question-ids 507f1f77bcf86cd799439011
    `);
}

// ============================================================================
// ISSUE DETECTION
// ============================================================================

/**
 * Detects quality issues in a question
 * 
 * @param {Object} question - The question object
 * @returns {string[]} - Array of issue types found
 */
function detectIssues(question) {
    const issues = [];

    // 1. Detect Inconsistent Options
    const optionValues = ['A', 'B', 'C', 'D'].map(key => question.options[key]);
    const hasSubject = optionValues.map(opt => {
        const firstWord = opt.trim().split(' ')[0].toLowerCase();
        return ['i', 'he', 'she', 'it', 'they', 'we', 'you', 'the'].includes(firstWord);
    });
    const subjectCount = hasSubject.filter(Boolean).length;
    if (subjectCount > 0 && subjectCount < 4) {
        issues.push('INCONSISTENT_OPTIONS');
    }

    // 2. Detect Weak Explanations
    if (!question.explanation || question.explanation.length < 35) {
        issues.push('WEAK_EXPLANATION');
    }

    // 3. Detect Weak Distractors (translations)
    const translations = Object.values(question.optionTranslations);
    const weakTranslations = translations.filter(t => 
        ['sai', 'không đúng', 'không', 'đúng', 'chưa đúng'].includes(t.toLowerCase())
    );
    if (weakTranslations.length >= 2) {
        issues.push('WEAK_DISTRACTORS_TRANSLATION');
    }

    // 4. Detect Overly Similar Options (common words)
    const optionWords = optionValues.map(opt => opt.toLowerCase().split(' '));
    const commonWords = optionWords[0].filter(word =>
        optionWords.every(opts => opts.includes(word))
    );
    if (commonWords.length > 2) {
        issues.push('WEAK_DISTRACTORS_SIMILAR');
    }

    return issues;
}

// ============================================================================
// FIXER FUNCTIONS
// ============================================================================

/**
 * Fixes inconsistent option structure by ensuring all options have consistent
 * grammatical structure (either all with subjects or all without subjects)
 * 
 * @param {Object} question - The question object to fix
 * @returns {Object} - { updatedQuestion, changes: [] }
 */
function fixInconsistentOptions(question) {
    const changes = [];
    const updatedQuestion = { ...question };

    // Step 1: Analyze all four options to determine structure
    const optionKeys = ['A', 'B', 'C', 'D'];
    const optionValues = optionKeys.map(key => question.options[key]);

    const hasSubject = optionValues.map(opt => {
        const words = opt.trim().split(' ');
        const firstWord = words[0].toLowerCase();

        // Check for auxiliary verbs that indicate a complete clause (subject is included)
        // e.g., "Did you go", "Have you seen", "Will they come"
        const auxiliaryVerbs = ['did', 'do', 'does', 'have', 'has', 'had', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must'];
        if (auxiliaryVerbs.includes(firstWord) && words.length > 1) {
            const secondWord = words[1].toLowerCase();
            // If auxiliary is followed by a pronoun, it has a subject
            if (['i', 'he', 'she', 'it', 'they', 'we', 'you'].includes(secondWord)) {
                return true;
            }
        }

        // Check if first word looks like a subject (I, he, she, it, they, we, you, or "the X")
        return ['i', 'he', 'she', 'it', 'they', 'we', 'you', 'the'].includes(firstWord) ||
            (firstWord === 'the' && words.length > 1);
    });

    const subjectCount = hasSubject.filter(Boolean).length;
    const noSubjectCount = 4 - subjectCount;

    // Step 2: Determine target structure
    let targetHasSubject;

    if (subjectCount >= 3) {
        // Majority have subjects → target: all with subjects
        targetHasSubject = true;
    } else if (noSubjectCount >= 3) {
        // Majority lack subjects → target: all without subjects
        targetHasSubject = false;
    } else {
        // 2-2 split → analyze question text to determine intent
        targetHasSubject = analyzeQuestionContext(question.questionText, optionValues);
    }

    // Step 3: For each option that doesn't match target, rewrite it
    const newOptions = { ...question.options };

    optionKeys.forEach((key, index) => {
        const option = optionValues[index];
        const optionHasSubject = hasSubject[index];

        if (optionHasSubject !== targetHasSubject) {
            const oldValue = option;
            let newValue;

            if (targetHasSubject) {
                // Need to add subject
                newValue = addSubjectToOption(option, question.questionText);
            } else {
                // Need to remove subject
                newValue = removeSubjectFromOption(option);
            }

            newOptions[key] = newValue;

            changes.push({
                field: `options.${key}`,
                before: oldValue,
                after: newValue,
                reason: targetHasSubject
                    ? 'Added subject for consistency'
                    : 'Removed subject for consistency'
            });
        }
    });

    updatedQuestion.options = newOptions;

    // Step 4: Update explanation if structure changed
    if (changes.length > 0) {
        const oldExplanation = question.explanation;
        const structureNote = targetHasSubject
            ? ' All options now include subjects for consistent grammatical structure.'
            : ' All options now use verb phrases without subjects for consistent structure.';

        // Only add note if explanation doesn't already mention structure
        if (!oldExplanation.includes('consistent') && !oldExplanation.includes('structure')) {
            updatedQuestion.explanation = oldExplanation + structureNote;

            changes.push({
                field: 'explanation',
                before: oldExplanation,
                after: updatedQuestion.explanation,
                reason: 'Updated to reflect consistent option structure'
            });
        }
    }

    return { updatedQuestion, changes };
}

/**
 * Analyzes question context to determine if options should have subjects
 * Used when there's a 2-2 split between options with/without subjects
 * 
 * @param {string} questionText - The question text
 * @param {string[]} optionValues - Array of option values
 * @returns {boolean} - True if options should have subjects, false otherwise
 */
function analyzeQuestionContext(questionText, optionValues) {
    const questionLower = questionText.toLowerCase();

    // Check if question already has a subject before the blank
    // e.g., "I _______ to school" → options should NOT have subjects
    const subjectBeforeBlank = /\b(i|he|she|it|they|we|you|the \w+)\s+_+/i.test(questionText);

    if (subjectBeforeBlank) {
        return false; // Options should be verb phrases only
    }

    // Check if question is asking for a complete sentence
    // e.g., "_______ is my favorite color" → options should have subjects
    if (/^_+/.test(questionText.trim())) {
        return true; // Blank at start, options should have subjects
    }

    // Check for conditional structures that might need subjects
    if (questionLower.includes('if ') || questionLower.includes('when ')) {
        // If the blank is in the conditional clause, check the structure
        const blankInCondition = questionLower.indexOf('_') < questionLower.indexOf('if ') + 10;
        if (blankInCondition) {
            return false; // Likely verb phrase needed
        }
    }

    // Default: prefer no subjects (verb phrases) as this is more common in grammar tests
    return false;
}

/**
 * Adds a subject to an option that lacks one
 * 
 * @param {string} option - The option without a subject
 * @param {string} questionText - The question text for context
 * @returns {string} - The option with a subject added
 */
function addSubjectToOption(option, questionText) {
    const questionLower = questionText.toLowerCase();

    // Try to identify the subject from question context
    let subject = 'I'; // Default subject

    // Check if question mentions a specific subject
    if (questionLower.includes('he ') || questionLower.includes('john') || questionLower.includes('tom')) {
        subject = 'he';
    } else if (questionLower.includes('she ') || questionLower.includes('mary') || questionLower.includes('jane')) {
        subject = 'she';
    } else if (questionLower.includes('they ') || questionLower.includes('people')) {
        subject = 'they';
    } else if (questionLower.includes('we ')) {
        subject = 'we';
    } else if (questionLower.includes('you ')) {
        subject = 'you';
    } else if (questionLower.includes('it ') || questionLower.includes('the ')) {
        subject = 'it';
    }

    // Add subject and adjust verb form if needed
    const words = option.trim().split(' ');
    const firstWord = words[0].toLowerCase();

    // Check if we need to adjust verb form for third person singular
    if ((subject === 'he' || subject === 'she' || subject === 'it') &&
        !firstWord.endsWith('s') &&
        !['am', 'is', 'are', 'was', 'were', 'have', 'has', 'do', 'does'].includes(firstWord)) {
        // This is a simple heuristic - may need refinement
        // For now, just prepend the subject without changing the verb
    }

    return `${subject} ${option}`;
}

/**
 * Removes a subject from an option that has one
 * 
 * @param {string} option - The option with a subject
 * @returns {string} - The option with the subject removed
 */
function removeSubjectFromOption(option) {
    const words = option.trim().split(' ');
    const firstWord = words[0].toLowerCase();
    const secondWord = words.length > 1 ? words[1].toLowerCase() : '';

    // Handle auxiliary verb + subject structures (e.g., "Did you go" → "go")
    const auxiliaryVerbs = ['did', 'do', 'does', 'have', 'has', 'had', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must'];
    if (auxiliaryVerbs.includes(firstWord) && ['i', 'he', 'she', 'it', 'they', 'we', 'you'].includes(secondWord)) {
        // Remove auxiliary + subject, keep the rest
        return words.slice(2).join(' ');
    }

    // Remove subject pronouns
    if (['i', 'he', 'she', 'it', 'they', 'we', 'you'].includes(firstWord)) {
        return words.slice(1).join(' ');
    }

    // Remove "the X" subjects
    if (firstWord === 'the' && words.length > 2) {
        // Find where the actual verb starts (after "the [noun]")
        // Simple heuristic: remove "the" + next word
        return words.slice(2).join(' ');
    }

    // If we can't identify a clear subject, return as-is
    return option;
}

/**
 * Simplifies options that share many common words by extracting the unique part
 * 
 * @param {Object} question - The question object
 * @returns {Object} - { updatedQuestion, changes: [] }
 */
function simplifySimilarOptions(question) {
    const changes = [];
    const updatedQuestion = { ...question };
    const optionKeys = ['A', 'B', 'C', 'D'];
    const optionValues = optionKeys.map(key => question.options[key]);
    
    const optionWords = optionValues.map(opt => opt.split(' '));
    const commonWords = optionWords[0].filter(word =>
        optionWords.every(opts => opts.includes(word))
    );

    if (commonWords.length > 2) {
        const newOptions = { ...question.options };
        optionKeys.forEach(key => {
            const oldValue = question.options[key];
            // Remove common words from the option
            const newValue = oldValue.split(' ')
                .filter(word => !commonWords.includes(word))
                .join(' ');
            
            if (newValue && newValue !== oldValue) {
                newOptions[key] = newValue;
                changes.push({
                    field: `options.${key}`,
                    before: oldValue,
                    after: newValue,
                    reason: 'Simplified similar options by removing common prefix/words'
                });
            }
        });
        updatedQuestion.options = newOptions;
    }

    return { updatedQuestion, changes };
}

/**
 * Fixes weak explanations by making them more descriptive and unit-specific
 * 
 * @param {Object} question - The question object
 * @returns {Object} - { updatedQuestion, changes: [] }
 */
function fixWeakExplanations(question) {
    const changes = [];
    const updatedQuestion = { ...question };
    const oldExplanation = question.explanation;

    // Map units to detailed grammar rules
    const unitRules = {
        'Unit 1': 'Thì Hiện tại đơn (Present Simple) diễn tả thói quen, sự thật hiển nhiên hoặc lịch trình. Lưu ý vị trí trạng từ tần suất.',
        'Unit 2': 'Thì Quá khứ đơn (Past Simple) diễn tả hành động đã kết thúc trong quá khứ. Cần chú ý động từ bất quy tắc và trợ động từ "did".',
        'Unit 3': 'Thì Quá khứ tiếp diễn (Past Continuous) diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ hoặc bị hành động khác xen vào.',
        'Unit 4': 'Cách dùng "will" cho quyết định tức thì/lời hứa và "be going to" cho kế hoạch/dự định. Câu điều kiện loại 1.',
        'Unit 5': 'Câu điều kiện loại 0 và loại 1. So sánh hơn và so sánh nhất của tính từ ngắn/dài.',
        'Unit 6': 'Thì Hiện tại hoàn thành (Present Perfect) cho trải nghiệm. Động từ đi kèm to-V hoặc V-ing. Đại từ quan hệ (who, which, where).',
        'Vocabulary': 'Kiểm tra vốn từ vựng về tính cách, môn học, đồ ăn hoặc động lực dựa trên ngữ cảnh của câu.'
    };

    const rule = unitRules[question.unit] || 'Giải thích dựa trên cấu trúc ngữ pháp và ngữ cảnh của câu hỏi.';
    
    // Enrich existing explanation
    if (!oldExplanation.includes(rule.substring(0, 20))) {
        updatedQuestion.explanation = `${oldExplanation.trim()} (${rule})`;
        
        changes.push({
            field: 'explanation',
            before: oldExplanation,
            after: updatedQuestion.explanation,
            reason: 'Enriched weak explanation with unit-specific grammar rules'
        });
    }

    return { updatedQuestion, changes };
}

/**
 * Fixes weak distractors by improving the feedback/translation for wrong options
 * 
 * @param {Object} question - The question object
 * @returns {Object} - { updatedQuestion, changes: [] }
 */
function fixWeakDistractors(question) {
    const changes = [];
    const updatedQuestion = { ...question };
    const newTranslations = { ...question.optionTranslations };
    let hasChanges = false;

    // Improve generic "sai" translations based on common errors
    const improvementMap = {
        'Unit 1': 'sai vị trí/thì',
        'Unit 2': 'sai dạng quá khứ',
        'Unit 3': 'sai cấu trúc tiếp diễn',
        'Unit 4': 'sai cấu trúc tương lai',
        'Unit 5': 'sai cấu trúc so sánh/điều kiện',
        'Unit 6': 'sai thì/đại từ/dạng động từ',
        'Vocabulary': 'không hợp ngữ cảnh'
    };

    const betterNote = improvementMap[question.unit] || 'lựa chọn không đúng';

    Object.keys(newTranslations).forEach(key => {
        const val = newTranslations[key];
        if (val.toLowerCase() === 'sai' || val.toLowerCase() === 'không đúng' || val.toLowerCase() === 'không') {
            const oldValue = val;
            newTranslations[key] = betterNote;
            hasChanges = true;
            
            changes.push({
                field: `optionTranslations.${key}`,
                before: oldValue,
                after: betterNote,
                reason: 'Improved generic "sai" translation with context'
            });
        }
    });

    if (hasChanges) {
        updatedQuestion.optionTranslations = newTranslations;
    }

    return { updatedQuestion, changes };
}

// ============================================================================
// MAIN ORCHESTRATION LOGIC
// ============================================================================

async function runFixes(options = {}) {
    const logger = new ChangeLogger();
    const startTime = Date.now();

    try {
        console.log('='.repeat(80));
        console.log('QUESTION QUALITY FIX SCRIPT');
        console.log('='.repeat(80));
        console.log(`Started: ${new Date().toISOString()}`);
        console.log(`Mode: ${options.dryRun ? 'DRY RUN (no changes will be saved)' : 'LIVE'}`);

        if (options.issueTypes) {
            console.log(`Issue Types Filter: ${options.issueTypes.join(', ')}`);
        }
        if (options.questionIds) {
            console.log(`Question IDs Filter: ${options.questionIds.join(', ')}`);
        }
        console.log('='.repeat(80));
        console.log('');

        // Step 1: Verify backup file exists
        verifyBackupFile();

        // Step 2: Connect to MongoDB with retry logic
        await connectWithRetry();

        // Step 3: Load questions from database
        console.log('[INFO] Loading questions from database...');
        let query = {};

        if (options.questionIds) {
            query._id = { $in: options.questionIds };
        }

        const questions = await Question.find(query).sort({ setNumber: 1, orderIndex: 1 });
        console.log(`✅ Loaded ${questions.length} questions\n`);

        // Step 4: Process each question
        console.log('[INFO] Starting question processing...\n');

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];

            try {
                console.log(`[${i + 1}/${questions.length}] Processing Q${question.orderIndex} (Set ${question.setNumber}, ${question.unit})`);

                const issues = detectIssues(question);
                
                // Filter issues if requested
                const issuesToFix = options.issueTypes 
                    ? issues.filter(issue => options.issueTypes.includes(issue))
                    : issues;

                if (issuesToFix.length === 0) {
                    console.log(`   ✅ No issues found.`);
                    continue;
                }

                console.log(`   ⚠️ Found: ${issuesToFix.join(', ')}`);

                let currentQuestion = question.toObject();
                let allChanges = [];

                // Apply fixes
                if (issuesToFix.includes('INCONSISTENT_OPTIONS')) {
                    const result = fixInconsistentOptions(currentQuestion);
                    currentQuestion = result.updatedQuestion;
                    allChanges = [...allChanges, ...result.changes];
                }

                if (issuesToFix.includes('WEAK_EXPLANATION')) {
                    const result = fixWeakExplanations(currentQuestion);
                    currentQuestion = result.updatedQuestion;
                    allChanges = [...allChanges, ...result.changes];
                }

                if (issuesToFix.includes('WEAK_DISTRACTORS_TRANSLATION')) {
                    const result = fixWeakDistractors(currentQuestion);
                    currentQuestion = result.updatedQuestion;
                    allChanges = [...allChanges, ...result.changes];
                }

                if (issuesToFix.includes('WEAK_DISTRACTORS_SIMILAR')) {
                    const result = simplifySimilarOptions(currentQuestion);
                    currentQuestion = result.updatedQuestion;
                    allChanges = [...allChanges, ...result.changes];
                }

                if (allChanges.length > 0) {
                    if (!options.dryRun) {
                        // Use findOneAndUpdate to apply changes
                        await Question.findByIdAndUpdate(question._id, currentQuestion);
                        console.log(`   ✅ Fixed ${allChanges.length} items and saved to database.`);
                    } else {
                        console.log(`   🔍 [DRY RUN] Would fix ${allChanges.length} items:`);
                        allChanges.forEach(c => console.log(`      - ${c.field}: ${c.before} -> ${c.after}`));
                    }
                    
                    logger.logChange(question._id, question.setNumber, question.orderIndex, question.unit, issuesToFix, allChanges);
                } else {
                    console.log(`   ℹ️ No changes needed after analysis.`);
                }

            } catch (error) {
                console.error(`   ❌ Error processing question: ${error.message}`);
                logger.logError(question._id, error);
            }
        }

        // Step 5: Generate summary
        console.log('\n' + '='.repeat(80));
        console.log('SUMMARY');
        console.log('='.repeat(80));

        const summary = logger.getSummary();
        console.log(`Total questions processed: ${questions.length}`);
        console.log(`Questions fixed: ${summary.totalProcessed}`);
        console.log(`Questions failed: ${summary.totalFailed}`);

        if (Object.keys(summary.byIssueType).length > 0) {
            console.log('\nFixes by issue type:');
            Object.entries(summary.byIssueType).forEach(([type, count]) => {
                console.log(`  ${type}: ${count}`);
            });
        }

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\nCompleted in ${duration}s`);
        console.log('='.repeat(80));

        return {
            success: true,
            summary,
            changes: logger.getChanges(),
            errors: logger.getErrors()
        };

    } catch (error) {
        console.error('\n❌ FATAL ERROR:', error.message);
        console.error(error.stack);
        return {
            success: false,
            error: error.message
        };
    } finally {
        // Disconnect from MongoDB
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('\n[INFO] Disconnected from MongoDB');
        }
    }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

if (require.main === module) {
    const options = parseCommandLineOptions();

    runFixes(options)
        .then(result => {
            process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
            console.error('Unhandled error:', error);
            process.exit(1);
        });
}

// Export for testing
module.exports = {
    runFixes,
    connectWithRetry,
    verifyBackupFile,
    ChangeLogger,
    fixInconsistentOptions
};
