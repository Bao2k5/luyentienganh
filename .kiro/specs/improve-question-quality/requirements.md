# Requirements Document

## Introduction

This feature improves the quality of 500 English quiz questions stored in MongoDB by fixing identified issues from a deep quality check. The system detected 72 questions with quality problems across 10 question sets (50 questions each). The goal is to systematically fix all issues to ensure extremely high-quality educational content for students.

## Glossary

- **Question_Database**: MongoDB database containing 500 English quiz questions
- **Quality_Check_Script**: The deep-quality-check.js script that analyzes questions for issues
- **Fix_Script**: Automated script that applies corrections to questions in the database
- **INCONSISTENT_OPTIONS**: Quality issue where answer options have inconsistent grammatical structure (some have subjects, some don't)
- **WEAK_EXPLANATION**: Quality issue where explanations are too short (less than 30 characters) or lack detail
- **WEAK_DISTRACTORS**: Quality issue where incorrect answer options are too similar to each other
- **TENSE_MISMATCH**: Quality issue flagged by script but determined to be false positives
- **Question_Set**: A group of 50 questions, numbered 1-10
- **Validation_System**: Process to verify all fixes are correctly applied and no new issues introduced

## Requirements

### Requirement 1: Fix Inconsistent Option Structure

**User Story:** As a student, I want all answer options to have consistent grammatical structure, so that I can focus on the grammar concept being tested without confusion.

#### Acceptance Criteria

1. WHEN the Fix_Script processes a question with INCONSISTENT_OPTIONS issue, THE Fix_Script SHALL rewrite all four options to have consistent structure (either all with subjects or all without subjects)
2. THE Fix_Script SHALL preserve the correct answer designation when rewriting options
3. THE Fix_Script SHALL update the explanation to match the new option structure
4. FOR ALL questions with INCONSISTENT_OPTIONS, applying the fix then running the quality check SHALL return zero INCONSISTENT_OPTIONS issues
5. THE Fix_Script SHALL process the remaining 11 INCONSISTENT_OPTIONS questions (21 total minus 10 already fixed)

### Requirement 2: Enhance Weak Explanations

**User Story:** As a student, I want detailed explanations for each question, so that I can understand why the correct answer is right and learn from my mistakes.

#### Acceptance Criteria

1. WHEN the Fix_Script processes a question with WEAK_EXPLANATION issue, THE Fix_Script SHALL expand the explanation to at least 100 characters
2. THE enhanced explanation SHALL include the grammar rule being tested
3. THE enhanced explanation SHALL explain why the correct answer is right
4. THE enhanced explanation SHALL explain why common wrong answers are incorrect
5. WHERE the question tests a specific grammar structure, THE enhanced explanation SHALL include the structure formula (e.g., "If + present simple, present simple")
6. FOR ALL 30 questions with WEAK_EXPLANATION, the enhanced explanation SHALL be at least 100 characters long

### Requirement 3: Improve Weak Distractors

**User Story:** As a student, I want answer options that are clearly distinct, so that I can properly test my understanding of the grammar concept.

#### Acceptance Criteria

1. WHEN the Fix_Script processes a question with WEAK_DISTRACTORS issue, THE Fix_Script SHALL rewrite the incorrect options to be more distinct from each other
2. THE Fix_Script SHALL ensure incorrect options test different common mistakes or grammar concepts
3. THE Fix_Script SHALL preserve the correct answer
4. FOR ALL 4 questions with WEAK_DISTRACTORS, running the quality check after fixes SHALL return zero WEAK_DISTRACTORS issues

### Requirement 4: Validate All Fixes

**User Story:** As a developer, I want to verify all fixes are correctly applied, so that I can ensure no new issues were introduced and all original issues are resolved.

#### Acceptance Criteria

1. WHEN all fixes are applied, THE Validation_System SHALL run the Quality_Check_Script on all 500 questions
2. THE Validation_System SHALL verify that INCONSISTENT_OPTIONS count is zero
3. THE Validation_System SHALL verify that WEAK_EXPLANATION count is zero
4. THE Validation_System SHALL verify that WEAK_DISTRACTORS count is zero
5. IF new issues are detected, THEN THE Validation_System SHALL report the issue type, count, and affected question IDs
6. THE Validation_System SHALL generate a summary report showing before/after issue counts

### Requirement 5: Preserve Database Integrity

**User Story:** As a developer, I want to ensure database integrity during the fix process, so that no data is lost or corrupted.

#### Acceptance Criteria

1. THE Fix_Script SHALL verify the backup file (backup-1778265162622.json) exists before making any changes
2. WHEN updating a question, THE Fix_Script SHALL use atomic database operations
3. IF a database update fails, THEN THE Fix_Script SHALL log the error and continue with remaining questions
4. THE Fix_Script SHALL preserve all existing question fields not being modified (vietnameseTranslation, optionTranslations, unit, setNumber, orderIndex, difficulty, setDifficulty, commonMistake)
5. THE Fix_Script SHALL maintain the Question model schema constraints (required fields, enum values)

### Requirement 6: Deploy to Production

**User Story:** As a developer, I want to deploy the improved questions to production, so that students can benefit from the higher quality content.

#### Acceptance Criteria

1. WHEN all fixes are validated, THE deployment process SHALL commit the changes to git
2. THE git commit message SHALL include the number of questions fixed by issue type
3. THE deployment process SHALL push changes to the production branch
4. THE deployment process SHALL verify the MongoDB connection before applying changes
5. IF deployment fails, THEN THE deployment process SHALL provide rollback instructions using the backup file

### Requirement 7: Generate Fix Report

**User Story:** As a developer, I want a detailed report of all fixes applied, so that I can review the changes and track quality improvements.

#### Acceptance Criteria

1. WHEN the Fix_Script completes, THE Fix_Script SHALL generate a report file
2. THE report SHALL list each question fixed with its set number and order index
3. THE report SHALL show the before and after state for each modified field (questionText, options, explanation)
4. THE report SHALL include a summary section with total questions fixed by issue type
5. THE report SHALL include the validation results showing zero remaining issues
6. THE report file SHALL be saved in the backend/scripts directory with timestamp in filename
