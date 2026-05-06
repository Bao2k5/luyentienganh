# Requirements Document

## Introduction

This document specifies the requirements for an English Quiz Website - a web-based examination system for testing English language proficiency based on the Voices Pre-Intermediate A2-B1 curriculum (Units 1-6). The system allows students to take timed multiple-choice tests, receive immediate feedback, and review detailed explanations for each question.

## Glossary

- **Quiz_System**: The complete web application including frontend, backend, and database components
- **Student**: A user taking the English proficiency test
- **Quiz_Session**: A single instance of a student taking the 50-question test
- **Question_Bank**: The collection of 50 predefined English questions organized by units
- **Answer_Submission**: The student's selected answer (A, B, C, or D) for a specific question
- **Quiz_Result**: The calculated score and detailed feedback generated after quiz submission
- **Session_State**: The current progress data including answered questions and remaining time
- **Start_Screen**: The initial interface where students enter their information before beginning
- **Quiz_Interface**: The main testing interface displaying questions, timer, and navigation
- **Result_Screen**: The final interface showing scores, statistics, and detailed explanations
- **Question_Grid**: The visual overview panel showing completion status of all 50 questions
- **Timer**: The countdown mechanism tracking the 60-minute time limit
- **Backend_API**: The Node.js Express server handling quiz logic and data persistence
- **Frontend_Client**: The React application providing the user interface
- **Database**: The MongoDB Atlas instance storing quiz results and questions

## Requirements

### Requirement 1: Student Information Collection

**User Story:** As a student, I want to enter my name and class before starting the quiz, so that my results can be properly identified and recorded.

#### Acceptance Criteria

1. THE Start_Screen SHALL display a form with input fields for student name and class
2. THE Start_Screen SHALL display the quiz title "BÀI THI TRẮC NGHIỆM - VOICES PRE-INTERMEDIATE A2-B1 (UNIT 1-6)"
3. THE Start_Screen SHALL display quiz metadata showing "Tổng số câu: 50 | Thời gian: 60 phút"
4. WHEN the student clicks the "BẮT ĐẦU THI" button, THE Quiz_System SHALL validate that both name and class fields are not empty
5. WHEN validation passes, THE Quiz_System SHALL create a new Quiz_Session and transition to the Quiz_Interface

### Requirement 2: Question Bank Management

**User Story:** As a system administrator, I want the quiz to contain 50 questions organized by curriculum units, so that students are tested on all required topics.

#### Acceptance Criteria

1. THE Question_Bank SHALL contain exactly 50 questions
2. THE Question_Bank SHALL organize questions as follows: 7 questions for Unit 1, 7 questions for Unit 2, 7 questions for Unit 3, 7 questions for Unit 4, 7 questions for Unit 5, 10 questions for Unit 6, and 5 vocabulary questions
3. FOR EACH question, THE Question_Bank SHALL store the question text, four answer options labeled A through D, the correct answer identifier, a detailed explanation, and the unit identifier
4. WHEN the Backend_API receives a request for questions, THE Backend_API SHALL return all 50 questions in order

### Requirement 3: Quiz Timer Management

**User Story:** As a student, I want to see how much time remains during the quiz, so that I can manage my pace appropriately.

#### Acceptance Criteria

1. WHEN a Quiz_Session starts, THE Timer SHALL begin counting down from 60 minutes
2. WHILE the Timer is running, THE Quiz_Interface SHALL display the remaining time in minutes and seconds
3. WHEN the remaining time is less than 5 minutes, THE Timer SHALL display in red color
4. WHEN the Timer reaches zero, THE Quiz_System SHALL automatically submit the quiz
5. THE Timer SHALL continue running accurately even if the student navigates between questions

### Requirement 4: Question Display and Navigation

**User Story:** As a student, I want to view questions one at a time and navigate between them, so that I can focus on each question individually.

#### Acceptance Criteria

1. THE Quiz_Interface SHALL display one question at a time with its four answer options as radio buttons
2. THE Quiz_Interface SHALL display a progress indicator showing "Câu X/50" where X is the current question number
3. THE Quiz_Interface SHALL provide "Câu trước" and "Câu sau" navigation buttons
4. WHEN the student clicks "Câu sau" and the current question is not question 50, THE Quiz_System SHALL display the next question
5. WHEN the student clicks "Câu trước" and the current question is not question 1, THE Quiz_System SHALL display the previous question
6. WHEN the student is on question 1, THE "Câu trước" button SHALL be disabled
7. WHEN the student is on question 50, THE "Câu sau" button SHALL be disabled

### Requirement 5: Answer Selection and Recording

**User Story:** As a student, I want to select answers for each question, so that my responses are recorded for grading.

#### Acceptance Criteria

1. WHEN the student clicks on an answer option, THE Quiz_System SHALL record the Answer_Submission for the current question
2. WHEN the student navigates to a previously answered question, THE Quiz_Interface SHALL display the previously selected answer
3. WHEN the student changes an answer, THE Quiz_System SHALL update the Answer_Submission with the new selection
4. THE Quiz_System SHALL allow students to leave questions unanswered

### Requirement 6: Question Grid Overview

**User Story:** As a student, I want to see which questions I have answered, so that I can ensure I don't miss any questions.

#### Acceptance Criteria

1. THE Quiz_Interface SHALL display a Question_Grid showing all 50 question numbers in a grid layout
2. WHEN a question has been answered, THE Question_Grid SHALL display that question number with a green background color (#10B981)
3. WHEN a question has not been answered, THE Question_Grid SHALL display that question number with a white background
4. WHEN the student clicks on a question number in the Question_Grid, THE Quiz_System SHALL navigate to that question

### Requirement 7: Session State Persistence

**User Story:** As a student, I want my progress to be saved automatically, so that I don't lose my work if I accidentally refresh the page.

#### Acceptance Criteria

1. WHEN the student answers a question, THE Quiz_System SHALL save the Session_State to browser localStorage
2. WHEN the student refreshes the page during an active Quiz_Session, THE Quiz_System SHALL restore the Session_State from localStorage
3. THE Session_State SHALL include all Answer_Submissions, the current question number, and the remaining time
4. WHEN the quiz is submitted, THE Quiz_System SHALL clear the Session_State from localStorage

### Requirement 8: Browser Navigation Protection

**User Story:** As a student, I want to be warned before accidentally leaving the quiz page, so that I don't lose my progress.

#### Acceptance Criteria

1. WHEN the student attempts to close the browser tab or navigate away during an active Quiz_Session, THE Quiz_System SHALL display a browser confirmation dialog
2. THE confirmation dialog SHALL warn the student that their progress may be lost
3. WHEN the Quiz_Session is completed or submitted, THE Quiz_System SHALL remove the navigation warning

### Requirement 9: Quiz Submission

**User Story:** As a student, I want to submit my quiz when I'm finished, so that I can see my results.

#### Acceptance Criteria

1. THE Quiz_Interface SHALL display a "NỘP BÀI" button
2. WHEN the student clicks "NỘP BÀI", THE Quiz_System SHALL display a confirmation dialog
3. WHEN the student confirms submission, THE Quiz_System SHALL send all Answer_Submissions to the Backend_API
4. WHEN the Backend_API receives the submission, THE Backend_API SHALL calculate the Quiz_Result and store it in the Database
5. WHEN the Quiz_Result is calculated, THE Quiz_System SHALL transition to the Result_Screen

### Requirement 10: Score Calculation

**User Story:** As a student, I want my quiz to be graded automatically, so that I receive immediate feedback on my performance.

#### Acceptance Criteria

1. WHEN calculating a Quiz_Result, THE Backend_API SHALL compare each Answer_Submission to the correct answer in the Question_Bank
2. THE Backend_API SHALL count the total number of correct answers
3. THE Backend_API SHALL calculate the final score on a 10-point scale using the formula: (correct_answers / 50) × 10
4. THE Backend_API SHALL round the final score to two decimal places
5. THE Quiz_Result SHALL include the final score, number of correct answers, number of incorrect answers, and time taken

### Requirement 11: Result Display

**User Story:** As a student, I want to see my quiz results with detailed statistics, so that I understand my performance.

#### Acceptance Criteria

1. THE Result_Screen SHALL display the student's name and class
2. THE Result_Screen SHALL display the final score as "Điểm của bạn: X/10"
3. THE Result_Screen SHALL display the time taken to complete the quiz
4. THE Result_Screen SHALL display the number of correct answers and incorrect answers
5. THE Result_Screen SHALL display a pie chart showing the percentage of correct versus incorrect answers
6. THE pie chart SHALL use green color (#10B981) for correct answers and red color (#EF4444) for incorrect answers

### Requirement 12: Detailed Answer Review

**User Story:** As a student, I want to review each question with the correct answer and explanation, so that I can learn from my mistakes.

#### Acceptance Criteria

1. THE Result_Screen SHALL display a list of all 50 questions in order
2. FOR EACH question in the list, THE Result_Screen SHALL display the question text, the student's Answer_Submission, the correct answer, and the detailed explanation
3. WHEN the student's answer is correct, THE Result_Screen SHALL display a green checkmark icon (✅) next to that question
4. WHEN the student's answer is incorrect or unanswered, THE Result_Screen SHALL display a red X icon (❌) next to that question
5. THE Result_Screen SHALL visually distinguish the student's answer from the correct answer using color coding

### Requirement 13: Quiz Retake

**User Story:** As a student, I want to retake the quiz after viewing my results, so that I can practice and improve my score.

#### Acceptance Criteria

1. THE Result_Screen SHALL display a "LÀM LẠI" button
2. WHEN the student clicks "LÀM LẠI", THE Quiz_System SHALL clear the current Quiz_Session data
3. WHEN the Quiz_Session is cleared, THE Quiz_System SHALL return to the Start_Screen
4. THE Quiz_System SHALL allow unlimited retakes

### Requirement 14: PDF Export

**User Story:** As a student, I want to export my quiz results as a PDF, so that I can save or print my results for future reference.

#### Acceptance Criteria

1. THE Result_Screen SHALL display a "XUẤT KẾT QUẢ PDF" button
2. WHEN the student clicks "XUẤT KẾT QUẢ PDF", THE Quiz_System SHALL generate a PDF document containing the Quiz_Result
3. THE PDF document SHALL include the student's name, class, final score, statistics, and the detailed answer review
4. WHEN the PDF is generated, THE Quiz_System SHALL trigger a browser download of the PDF file

### Requirement 15: Keyboard Shortcuts

**User Story:** As a student, I want to use keyboard shortcuts during the quiz, so that I can navigate and answer questions more efficiently.

#### Acceptance Criteria

1. WHEN the student presses the 'A' key during a Quiz_Session, THE Quiz_System SHALL select answer option A
2. WHEN the student presses the 'B' key during a Quiz_Session, THE Quiz_System SHALL select answer option B
3. WHEN the student presses the 'C' key during a Quiz_Session, THE Quiz_System SHALL select answer option C
4. WHEN the student presses the 'D' key during a Quiz_Session, THE Quiz_System SHALL select answer option D
5. WHEN the student presses the left arrow key, THE Quiz_System SHALL navigate to the previous question
6. WHEN the student presses the right arrow key, THE Quiz_System SHALL navigate to the next question
7. WHEN the student presses the Enter key, THE Quiz_System SHALL trigger the quiz submission dialog

### Requirement 16: Responsive Design

**User Story:** As a student, I want to take the quiz on any device, so that I can use my phone, tablet, or computer.

#### Acceptance Criteria

1. THE Frontend_Client SHALL adapt its layout for screen widths less than 768 pixels (mobile devices)
2. THE Frontend_Client SHALL adapt its layout for screen widths between 768 and 1024 pixels (tablets)
3. THE Frontend_Client SHALL adapt its layout for screen widths greater than 1024 pixels (desktop computers)
4. WHEN displayed on mobile devices, THE Question_Grid SHALL adjust to a smaller grid layout that remains usable
5. WHEN displayed on mobile devices, THE navigation buttons SHALL remain accessible and appropriately sized

### Requirement 17: Visual Design and Animation

**User Story:** As a student, I want the interface to be visually appealing and smooth, so that the quiz experience is pleasant.

#### Acceptance Criteria

1. THE Frontend_Client SHALL use blue color (#3B82F6) as the primary theme color
2. THE Frontend_Client SHALL use green color (#10B981) for correct answers and positive indicators
3. THE Frontend_Client SHALL use red color (#EF4444) for incorrect answers and warnings
4. THE Frontend_Client SHALL apply smooth transitions when navigating between questions
5. THE Frontend_Client SHALL apply smooth transitions when updating the Question_Grid
6. THE Frontend_Client SHALL use Tailwind CSS for styling and Lucide React for icons

### Requirement 18: Backend API - Quiz Initialization

**User Story:** As a system, I need to initialize quiz sessions, so that student information is recorded when they start.

#### Acceptance Criteria

1. THE Backend_API SHALL provide a POST endpoint at /api/quiz/start
2. WHEN the Backend_API receives a POST request to /api/quiz/start with student name and class, THE Backend_API SHALL create a new Quiz_Session record
3. THE Backend_API SHALL return a unique session identifier to the Frontend_Client
4. THE Backend_API SHALL record the start timestamp for the Quiz_Session

### Requirement 19: Backend API - Question Retrieval

**User Story:** As a system, I need to provide questions to the frontend, so that students can take the quiz.

#### Acceptance Criteria

1. THE Backend_API SHALL provide a GET endpoint at /api/questions
2. WHEN the Backend_API receives a GET request to /api/questions, THE Backend_API SHALL return all 50 questions from the Question_Bank
3. THE Backend_API SHALL return questions in JSON format with fields for question text, options, correct answer, explanation, and unit
4. THE Backend_API SHALL return questions in the correct order (Units 1-6, then vocabulary)

### Requirement 20: Backend API - Quiz Submission and Grading

**User Story:** As a system, I need to process quiz submissions and calculate scores, so that students receive accurate results.

#### Acceptance Criteria

1. THE Backend_API SHALL provide a POST endpoint at /api/quiz/submit
2. WHEN the Backend_API receives a POST request to /api/quiz/submit with session identifier and Answer_Submissions, THE Backend_API SHALL validate the session exists
3. THE Backend_API SHALL calculate the Quiz_Result according to Requirement 10
4. THE Backend_API SHALL store the Quiz_Result in the Database with student information, answers, score, and timestamp
5. THE Backend_API SHALL return the result identifier to the Frontend_Client

### Requirement 21: Backend API - Result Retrieval

**User Story:** As a system, I need to retrieve stored quiz results, so that students can view their detailed results.

#### Acceptance Criteria

1. THE Backend_API SHALL provide a GET endpoint at /api/results/:id where :id is the result identifier
2. WHEN the Backend_API receives a GET request to /api/results/:id, THE Backend_API SHALL retrieve the Quiz_Result from the Database
3. THE Backend_API SHALL return the complete Quiz_Result including all questions, student answers, correct answers, explanations, and statistics
4. WHEN the result identifier does not exist, THE Backend_API SHALL return an appropriate error response

### Requirement 22: Database Persistence

**User Story:** As a system administrator, I want quiz results stored permanently, so that data is not lost and can be analyzed later.

#### Acceptance Criteria

1. THE Database SHALL store Quiz_Result records in MongoDB Atlas
2. EACH Quiz_Result record SHALL include student name, class, session identifier, start timestamp, submission timestamp, all Answer_Submissions, score, and statistics
3. THE Database SHALL store Question_Bank data including all 50 questions with their metadata
4. THE Database SHALL maintain data integrity and prevent data loss
5. THE Backend_API SHALL successfully connect to MongoDB Atlas using secure connection strings

### Requirement 23: Deployment Configuration

**User Story:** As a system administrator, I want the application deployed to reliable hosting services, so that students can access it from anywhere.

#### Acceptance Criteria

1. THE Backend_API SHALL be deployed to Render hosting service
2. THE Frontend_Client SHALL be deployed to Vercel hosting service
3. THE Frontend_Client SHALL communicate with the Backend_API using the deployed backend URL
4. THE Backend_API SHALL communicate with MongoDB Atlas using secure connection credentials
5. THE deployed application SHALL be accessible via HTTPS

### Requirement 24: Error Handling

**User Story:** As a student, I want to see helpful error messages when something goes wrong, so that I understand what happened and what to do next.

#### Acceptance Criteria

1. WHEN the Backend_API encounters an error, THE Backend_API SHALL return an appropriate HTTP status code and error message
2. WHEN the Frontend_Client cannot connect to the Backend_API, THE Frontend_Client SHALL display a user-friendly error message
3. WHEN the Database connection fails, THE Backend_API SHALL log the error and return an error response
4. WHEN form validation fails on the Start_Screen, THE Frontend_Client SHALL display validation error messages
5. THE Quiz_System SHALL handle network timeouts gracefully and inform the student

