# Implementation Plan: Improve Question Quality

## Overview

This implementation plan systematically fixes 45 quality issues across 500 English quiz questions in MongoDB. The fixes address three issue types: INCONSISTENT_OPTIONS (21 questions), WEAK_EXPLANATION (30 questions), and WEAK_DISTRACTORS (4 questions). The implementation uses Node.js/JavaScript with Mongoose for database operations.

## Tasks

- [x] 1. Set up core fix script infrastructure
  - Create `backend/scripts/fix-quality-issues.js` with main orchestration logic
  - Implement backup file verification before any modifications
  - Implement MongoDB connection with retry logic (3 attempts with exponential backoff)
  - Create change logging system to track all modifications
  - Add command-line options support (dryRun, issueTypes filter, questionIds filter)
  - _Requirements: 5.1, 5.2_

- [ ]* 1.1 Write unit tests for backup verification
  - Test backup file existence check
  - Test backup file JSON validity check
  - Test error handling when backup is missing or corrupted
  - _Requirements: 5.1_

- [-] 2. Implement Inconsistent Options Fixer
  - [ ] 2.1 Create `fixInconsistentOptions()` function in fix script
    - Implement option structure analysis (count options with/without subjects)
    - Implement target structure determination logic (majority wins, or analyze question context)
    - Implement option rewriting to match target structure (add/remove subjects, adjust verb forms)
    - Implement explanation update to reflect new structure
    - Return updated question object with change log
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [ ]* 2.2 Write unit tests for Inconsistent Options Fixer
    - Test with options that need subjects added
    - Test with options that need subjects removed
    - Test with 2-2 split scenarios
    - Test explanation updates
    - Test preservation of correct answer
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3. Implement Weak Explanation Fixer
  - [ ] 3.1 Create `fixWeakExplanation()` function in fix script
    - Implement grammar concept detector (conditionals, tenses, modals, passive voice, reported speech)
    - Implement explanation template system with four parts: rule statement, formula, correct answer explanation, common mistakes
    - Ensure all explanations are at least 100 characters
    - Preserve Vietnamese translation references if present
    - Return updated question object with change log
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [ ]* 3.2 Write unit tests for Weak Explanation Fixer
    - Test conditional question explanation generation
    - Test tense question explanation generation
    - Test modal verb question explanation generation
    - Test minimum length requirement (100 characters)
    - Test preservation of Vietnamese translations
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 4. Implement Weak Distractors Fixer
  - [ ] 4.1 Create `fixWeakDistractors()` function in fix script
    - Implement correct answer preservation logic
    - Implement grammar concept identification for the question
    - Implement distractor rewriting to test different mistakes (wrong tense, wrong form, wrong modal)
    - Implement word overlap calculation to verify distinctness
    - Update explanation to address new distractors
    - Return updated question object with change log
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ]* 4.2 Write unit tests for Weak Distractors Fixer
    - Test distractor distinctness verification
    - Test correct answer preservation
    - Test that each distractor tests a different mistake type
    - Test explanation updates
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 5. Checkpoint - Ensure all fixer functions work correctly
  - Run all unit tests and verify they pass
  - Test each fixer function with sample questions from the database
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement database updater and issue detector
  - [ ] 6.1 Create `updateQuestion()` function with atomic MongoDB operations
    - Use `findByIdAndUpdate()` with schema validation
    - Implement error handling for update failures
    - Return success/failure status with error details
    - Preserve all existing fields not being modified
    - _Requirements: 5.2, 5.3, 5.4, 5.5_
  
  - [ ] 6.2 Create `detectIssues()` function to identify quality problems
    - Integrate with existing `deep-quality-check.js` logic
    - Return array of issue types for a given question
    - Support filtering by issue type
    - _Requirements: 1.4, 2.6, 3.4_
  
  - [ ]* 6.3 Write integration tests for database operations
    - Test atomic updates with test database
    - Test schema validation enforcement
    - Test error handling for failed updates
    - Test preservation of non-modified fields
    - _Requirements: 5.2, 5.3, 5.4, 5.5_

- [ ] 7. Implement main fix orchestration logic
  - [ ] 7.1 Create main `runFixes()` function
    - Load all 500 questions from MongoDB
    - For each question: detect issues, apply appropriate fixer, update database
    - Implement error handling to continue on individual question failures
    - Track all changes in memory for reporting
    - Log progress every 50 questions
    - _Requirements: 1.5, 2.6, 3.4, 5.3_
  
  - [ ] 7.2 Add command-line interface and options parsing
    - Support `--dry-run` flag to preview changes without applying
    - Support `--issue-types` filter to fix only specific issue types
    - Support `--question-ids` filter to fix specific questions
    - Add help text and usage examples
    - _Requirements: 1.5, 2.6, 3.4_

- [ ] 8. Implement validation system
  - [ ] 8.1 Create `validateFixes()` function
    - Run quality checks on all 500 questions after fixes
    - Count issues by type (before and after)
    - Verify target issue counts are zero (INCONSISTENT_OPTIONS, WEAK_EXPLANATION, WEAK_DISTRACTORS)
    - Detect any new issues introduced by fixes
    - Return validation report with before/after counts and remaining issues
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ]* 8.2 Write unit tests for validation system
    - Test issue counting logic
    - Test before/after comparison
    - Test detection of new issues
    - Test validation report generation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 9. Implement report generator
  - [ ] 9.1 Create `generateReport()` function
    - Generate summary section with total counts and fixes by type
    - Generate detailed changes section with before/after for each question
    - Include validation results in report
    - Format report as readable text file
    - Save report to `backend/scripts/fix-report-[timestamp].txt`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ]* 9.2 Write unit tests for report generator
    - Test summary section formatting
    - Test detailed changes section formatting
    - Test timestamp in filename
    - Test report file creation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ] 10. Checkpoint - Test end-to-end on test database
  - Create test database with sample questions containing all three issue types
  - Run fix script on test database
  - Verify all issues are fixed
  - Verify report is generated correctly
  - Verify no data loss or corruption
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement rollback system
  - [ ] 11.1 Create `backend/scripts/rollback.js` script
    - Verify backup file exists and is valid JSON
    - Load backup data and connect to MongoDB
    - For each question in backup: replace entire document with backup version
    - Log restoration progress
    - Verify restoration by counting restored questions
    - _Requirements: 5.1, 6.5_
  
  - [ ]* 11.2 Write integration tests for rollback system
    - Test rollback on test database
    - Verify complete restoration of all fields
    - Test with corrupted backup file
    - Test with missing backup file
    - _Requirements: 5.1, 6.5_

- [ ] 12. Add comprehensive error handling and logging
  - [ ] 12.1 Implement structured logging system
    - Add log levels (INFO, WARN, ERROR)
    - Add timestamps to all log messages
    - Log progress every 50 questions
    - Log all errors with question ID and error details
    - Create log file in `backend/scripts/logs/` directory
    - _Requirements: 5.3_
  
  - [ ] 12.2 Implement error recovery strategies
    - Database connection errors: retry with exponential backoff
    - Question update errors: log and continue with remaining questions
    - Schema validation errors: log and skip that question
    - Fatal errors: exit with clear error message and rollback instructions
    - _Requirements: 5.3_

- [ ] 13. Production run preparation
  - [ ] 13.1 Create pre-deployment checklist script
    - Verify backup file exists and is valid
    - Verify MongoDB connection works
    - Verify all dependencies are installed
    - Run dry-run mode and display preview of changes
    - Output checklist for manual verification
    - _Requirements: 5.1, 5.4_
  
  - [ ] 13.2 Add deployment documentation
    - Document step-by-step deployment procedure
    - Document rollback procedure
    - Document manual spot-check process
    - Add troubleshooting section
    - _Requirements: 6.5_

- [ ] 14. Execute production fix run
  - [ ] 14.1 Run pre-deployment checklist
    - Verify all checklist items pass
    - Get user confirmation to proceed
    - _Requirements: 5.1, 5.4_
  
  - [ ] 14.2 Execute fix script on production database
    - Run `node backend/scripts/fix-quality-issues.js`
    - Monitor progress and logs
    - Wait for completion
    - _Requirements: 1.5, 2.6, 3.4_
  
  - [ ] 14.3 Review generated report
    - Open and review `fix-report-[timestamp].txt`
    - Verify summary shows expected fix counts (21 + 30 + 4 = 45 fixed)
    - Verify validation shows zero remaining issues
    - Check for any unexpected errors
    - _Requirements: 4.6, 7.5_
  
  - [ ] 14.4 Perform manual spot check
    - Randomly select 5 questions from each issue type (15 total)
    - Manually review fixes for pedagogical correctness
    - Verify explanations are clear and accurate
    - Verify options are grammatically correct
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 15. Checkpoint - Verify production fixes
  - Ensure validation passed with zero issues
  - Ensure manual spot check found no problems
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Commit and deploy changes
  - [ ] 16.1 Commit changes to git
    - Stage all modified files
    - Create commit with descriptive message: "fix: improve question quality - fixed 45 questions (21 inconsistent options, 30 weak explanations, 4 weak distractors)"
    - Include fix report in commit
    - _Requirements: 6.1, 6.2_
  
  - [ ] 16.2 Push to production branch
    - Push changes to main/production branch
    - Verify push succeeded
    - _Requirements: 6.3_
  
  - [ ] 16.3 Verify deployment
    - Verify MongoDB connection in production
    - Run quick quality check to confirm fixes are live
    - Monitor for any issues
    - _Requirements: 6.4_

- [ ] 17. Final checkpoint and documentation
  - Verify all 45 questions are fixed (21 + 30 + 4)
  - Verify validation shows zero issues of target types
  - Verify fix report is complete and accurate
  - Verify rollback procedure is documented
  - Document lessons learned and future improvements
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- The fix script uses atomic MongoDB operations to prevent data corruption
- All changes are logged for full traceability
- Backup file must exist before any modifications are made
- Rollback capability is available if issues are detected
- Manual spot-checking ensures pedagogical quality of fixes
