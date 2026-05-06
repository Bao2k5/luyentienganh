# Implementation Plan: English Quiz Website

## Overview

This implementation plan breaks down the English Quiz Website into discrete coding tasks. The application consists of a React frontend (deployed to Vercel), Node.js/Express backend (deployed to Render), and MongoDB Atlas database. The implementation follows a bottom-up approach: backend infrastructure first, then frontend components, and finally integration and deployment.

**Key Implementation Notes:**
- Backend: Node.js + Express + MongoDB with Mongoose ODM
- Frontend: React + Tailwind CSS + Lucide React icons
- Questions will be shuffled/randomized from 50 pre-defined questions
- All 50 questions must include detailed Vietnamese explanations
- Timer: 60 minutes with auto-submit functionality
- Features: localStorage persistence, keyboard shortcuts, PDF export, responsive design

## Tasks

- [x] 1. Set up backend project structure and database connection
  - Create Node.js project with Express framework
  - Install dependencies: express, mongoose, cors, dotenv
  - Configure MongoDB connection with Mongoose
  - Create database connection module with error handling
  - Set up environment variables for MongoDB URI and PORT
  - Create health check endpoint at GET /health
  - _Requirements: 18, 22, 23_

- [x] 2. Create MongoDB schemas and models
  - [x] 2.1 Create Question schema and model
    - Define schema with questionText, options (A/B/C/D), correctAnswer, explanation, unit, orderIndex
    - Add timestamps and indexes (orderIndex, unit)
    - Export Question model
    - _Requirements: 2, 19, 22_
  
  - [x] 2.2 Create Session schema and model
    - Define schema with studentName, studentClass, startTime, status
    - Add timestamps and indexes (startTime, status)
    - Export Session model
    - _Requirements: 18, 22_
  
  - [x] 2.3 Create Result schema and model
    - Define schema with sessionId, studentName, studentClass, answers array, score, correctCount, incorrectCount, timeTaken, submittedAt
    - Add timestamps and indexes (sessionId, submittedAt, score)
    - Export Result model
    - _Requirements: 20, 21, 22_

- [x] 3. Create question seed data with 50 questions
  - Create seed script to populate questions collection
  - Write 7 questions for Unit 1 with Vietnamese explanations
  - Write 7 questions for Unit 2 with Vietnamese explanations
  - Write 7 questions for Unit 3 with Vietnamese explanations
  - Write 7 questions for Unit 4 with Vietnamese explanations
  - Write 7 questions for Unit 5 with Vietnamese explanations
  - Write 10 questions for Unit 6 with Vietnamese explanations
  - Write 5 vocabulary questions with Vietnamese explanations
  - Ensure each question has 4 options (A, B, C, D) and detailed explanation
  - Create npm script `npm run seed` to run seed script
  - _Requirements: 2_

- [x] 4. Implement backend API endpoints
  - [x] 4.1 Implement POST /api/quiz/start endpoint
    - Validate request body (studentName and studentClass required)
    - Create new Session document in database
    - Return sessionId and startTime in response
    - Handle validation errors (400) and server errors (500)
    - _Requirements: 18, 24_
  
  - [x] 4.2 Implement GET /api/questions endpoint
    - Fetch all 50 questions from database
    - Implement Fisher-Yates shuffle algorithm to randomize question order
    - Return shuffled questions array in JSON format
    - Handle database errors (500)
    - _Requirements: 2, 19, 24_
  
  - [x] 4.3 Implement score calculation utility function
    - Create calculateScore function: (correctCount, totalQuestions) => score
    - Calculate score using formula: (correctCount / 50) × 10
    - Round score to 2 decimal places
    - Return score as number
    - _Requirements: 10_
  
  - [x] 4.4 Implement POST /api/quiz/submit endpoint
    - Validate request body (sessionId, answers array, timeTaken)
    - Verify session exists in database (404 if not found)
    - Compare each student answer with correct answer from Question collection
    - Calculate correctCount and incorrectCount
    - Use calculateScore utility to compute final score
    - Create Result document with all data
    - Update Session status to 'completed'
    - Return resultId, score, correctCount, incorrectCount
    - Handle validation errors (400), not found errors (404), and server errors (500)
    - _Requirements: 9, 10, 20, 24_
  
  - [x] 4.5 Implement GET /api/results/:id endpoint
    - Validate result ID parameter
    - Fetch Result document from database by ID
    - Populate question details for each answer
    - Return complete result with questions, answers, explanations, and statistics
    - Handle not found errors (404) and server errors (500)
    - _Requirements: 21, 24_

- [x] 5. Configure CORS and error handling middleware
  - Set up CORS middleware with configurable origin from environment variable
  - Create global error handling middleware
  - Log errors to console with stack traces in development mode
  - Return appropriate HTTP status codes and error messages
  - Handle MongoDB connection errors with reconnection logic
  - _Requirements: 23, 24_

- [ ] 6. Checkpoint - Test backend API endpoints
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Set up frontend React project structure
  - Create React app with Create React App or Vite
  - Install dependencies: axios, tailwindcss, lucide-react, jspdf, recharts
  - Configure Tailwind CSS with custom colors (primary blue #3B82F6, success green #10B981, error red #EF4444)
  - Create folder structure: components/, utils/, types/, services/
  - Set up environment variable for API URL (REACT_APP_API_URL)
  - _Requirements: 16, 17, 23_

- [ ] 8. Create TypeScript interfaces and types
  - Define Question interface with id, questionText, options, correctAnswer, explanation, unit
  - Define QuizSession interface with sessionId, studentName, studentClass, questions, answers, currentQuestionIndex, startTime, timeRemaining
  - Define QuizResult interface with resultId, studentName, studentClass, score, correctCount, incorrectCount, timeTaken, submittedAt, questions
  - Define AppState type for main application state
  - Export all types from types/index.ts
  - _Requirements: 1, 2, 9, 11_

- [x] 9. Create API service module
  - Create axios instance with base URL from environment variable
  - Implement startQuiz(name, class) function calling POST /api/quiz/start
  - Implement getQuestions() function calling GET /api/questions
  - Implement submitQuiz(sessionId, answers, timeTaken) function calling POST /api/quiz/submit
  - Implement getResult(resultId) function calling GET /api/results/:id
  - Add error handling for network errors and server errors
  - _Requirements: 18, 19, 20, 21, 24_

- [x] 10. Implement localStorage utility functions
  - Create saveSession(session) function to save quiz state to localStorage
  - Create loadSession() function to retrieve quiz state from localStorage
  - Create clearSession() function to remove quiz state from localStorage
  - Handle JSON serialization/deserialization errors
  - _Requirements: 7_

- [x] 11. Implement StartScreen component
  - [x] 11.1 Create StartScreen component with form UI
    - Display quiz title "BÀI THI TRẮC NGHIỆM - VOICES PRE-INTERMEDIATE A2-B1 (UNIT 1-6)"
    - Display quiz metadata "Tổng số câu: 50 | Thời gian: 60 phút"
    - Create input fields for student name and class
    - Create "BẮT ĐẦU THI" button
    - Style with Tailwind CSS (blue theme, responsive design)
    - _Requirements: 1, 16, 17_
  
  - [x] 11.2 Add form validation logic
    - Validate name field: required, minimum 2 characters
    - Validate class field: required, minimum 1 character
    - Display inline error messages below fields
    - Disable submit button while loading
    - _Requirements: 1, 24_
  
  - [x] 11.3 Implement form submission handler
    - Call startQuiz API service on form submit
    - Handle loading state during API call
    - Pass sessionId to parent component on success
    - Display error message on API failure
    - _Requirements: 1, 18, 24_

- [x] 12. Implement Timer component
  - [x] 12.1 Create Timer component with countdown logic
    - Accept initial time (3600 seconds) as prop
    - Implement countdown using setInterval
    - Format time as MM:SS display
    - Clean up interval on component unmount
    - _Requirements: 3_
  
  - [x] 12.2 Add timer warning and auto-submit
    - Change text color to red when time < 5 minutes (300 seconds)
    - Call onTimeUp callback when timer reaches zero
    - Trigger auto-submit from parent component
    - _Requirements: 3_

- [x] 13. Implement QuestionDisplay component
  - Create component to display single question with 4 radio button options
  - Accept question, selectedAnswer, and onAnswerSelect props
  - Render question text and options A, B, C, D
  - Highlight selected answer
  - Call onAnswerSelect when option is clicked
  - Style with Tailwind CSS (responsive, accessible)
  - _Requirements: 4, 5, 16, 17_

- [x] 14. Implement QuestionGrid component
  - Create grid layout displaying all 50 question numbers
  - Accept answers map and onQuestionClick props
  - Display question numbers in grid (10 columns on desktop, 5 on mobile)
  - Apply green background (#10B981) to answered questions
  - Apply white background to unanswered questions
  - Make question numbers clickable to navigate
  - Style with Tailwind CSS (responsive grid)
  - _Requirements: 6, 16, 17_

- [x] 15. Implement QuizScreen component
  - [x] 15.1 Create QuizScreen component structure
    - Set up component state: questions, currentQuestionIndex, answers, timeRemaining
    - Fetch questions from API on component mount
    - Initialize timer with 60 minutes (3600 seconds)
    - Display loading state while fetching questions
    - _Requirements: 3, 4, 19_
  
  - [x] 15.2 Implement question navigation
    - Create "Câu trước" and "Câu sau" buttons
    - Disable "Câu trước" on question 1
    - Disable "Câu sau" on question 50
    - Update currentQuestionIndex on button click
    - Display progress indicator "Câu X/50"
    - _Requirements: 4_
  
  - [x] 15.3 Implement answer selection and recording
    - Handle answer selection from QuestionDisplay component
    - Update answers map with selected answer
    - Save session state to localStorage after each answer
    - Display previously selected answer when navigating back
    - _Requirements: 5, 7_
  
  - [x] 15.4 Implement localStorage persistence
    - Save session state after every answer selection
    - Save session state after navigation
    - Load session state on component mount if exists
    - Restore questions, answers, currentQuestionIndex, timeRemaining
    - _Requirements: 7_
  
  - [x] 15.5 Implement browser navigation protection
    - Add beforeunload event listener on component mount
    - Display browser confirmation dialog when user tries to leave
    - Remove event listener on component unmount or after submission
    - _Requirements: 8_
  
  - [x] 15.6 Implement quiz submission
    - Create "NỘP BÀI" button
    - Display confirmation dialog when button is clicked
    - Call submitQuiz API service with sessionId, answers, timeTaken
    - Handle auto-submit when timer reaches zero
    - Clear localStorage after successful submission
    - Pass resultId to parent component
    - Display error message on submission failure
    - _Requirements: 9, 20, 24_
  
  - [x] 15.7 Integrate all sub-components
    - Render Timer component with timeRemaining and onTimeUp callback
    - Render QuestionDisplay component with current question and answer
    - Render QuestionGrid component with answers and navigation callback
    - Render navigation buttons
    - Render "NỘP BÀI" button
    - Apply responsive layout with Tailwind CSS
    - _Requirements: 3, 4, 5, 6, 16, 17_

- [x] 16. Implement keyboard shortcuts
  - Add keydown event listener in QuizScreen component
  - Handle 'A', 'B', 'C', 'D' keys to select answers
  - Handle left arrow key to navigate to previous question
  - Handle right arrow key to navigate to next question
  - Handle Enter key to trigger submission dialog
  - Prevent default behavior for handled keys
  - Remove event listener on component unmount
  - _Requirements: 15_

- [ ] 17. Checkpoint - Test quiz interface functionality
  - Ensure all tests pass, ask the user if questions arise.

- [x] 18. Implement ScoreCard component
  - Create component to display score summary
  - Accept result prop with score, correctCount, incorrectCount, timeTaken
  - Display student name and class
  - Display final score as "Điểm của bạn: X/10"
  - Display time taken in minutes and seconds
  - Display correct and incorrect answer counts
  - Implement pie chart using Recharts library
  - Use green (#10B981) for correct, red (#EF4444) for incorrect
  - Style with Tailwind CSS
  - _Requirements: 11, 17_

- [x] 19. Implement QuestionReview component
  - Create component to display list of all questions with answers
  - Accept result prop with questions array
  - For each question, display question text, student answer, correct answer, explanation
  - Display green checkmark (✅) for correct answers
  - Display red X (❌) for incorrect/unanswered questions
  - Highlight student answer vs correct answer with color coding
  - Style with Tailwind CSS (responsive, readable)
  - _Requirements: 12, 16, 17_

- [x] 20. Implement PDF export functionality
  - [x] 20.1 Create PDF generation utility function
    - Install and import jsPDF library
    - Create generateResultPDF(result) function
    - Add student name, class, and score to PDF
    - Add statistics (correct/incorrect counts, time taken)
    - Add detailed question review with answers and explanations
    - Format PDF with proper spacing and readability
    - Support Vietnamese characters (UTF-8 encoding)
    - _Requirements: 14_
  
  - [x] 20.2 Create ExportButton component
    - Create button with "XUẤT KẾT QUẢ PDF" text
    - Call generateResultPDF on button click
    - Trigger browser download of generated PDF
    - Display loading state during PDF generation
    - Handle errors gracefully
    - Style with Tailwind CSS
    - _Requirements: 14_

- [x] 21. Implement ResultScreen component
  - [x] 21.1 Create ResultScreen component structure
    - Fetch result from API using resultId on component mount
    - Display loading state while fetching
    - Handle API errors and display error message
    - _Requirements: 21, 24_
  
  - [x] 21.2 Integrate ScoreCard and QuestionReview components
    - Render ScoreCard component with result data
    - Render QuestionReview component with questions array
    - Apply responsive layout with Tailwind CSS
    - _Requirements: 11, 12, 16, 17_
  
  - [x] 21.3 Implement retake functionality
    - Create "LÀM LẠI" button
    - Clear localStorage on button click
    - Call onRetake callback to return to StartScreen
    - _Requirements: 13_
  
  - [x] 21.4 Integrate PDF export button
    - Render ExportButton component
    - Pass result data to export function
    - _Requirements: 14_

- [x] 22. Implement main App component
  - [x] 22.1 Create App component with routing logic
    - Set up state for currentScreen ('start' | 'quiz' | 'result')
    - Set up state for sessionId, resultId, studentInfo
    - Implement screen transition handlers
    - _Requirements: 1, 9, 13_
  
  - [x] 22.2 Integrate all screen components
    - Render StartScreen when currentScreen is 'start'
    - Render QuizScreen when currentScreen is 'quiz'
    - Render ResultScreen when currentScreen is 'result'
    - Pass appropriate props and callbacks to each screen
    - _Requirements: 1, 4, 11_

- [x] 23. Implement responsive design adjustments
  - Test layout on mobile devices (< 768px width)
  - Test layout on tablets (768px - 1024px width)
  - Test layout on desktop (> 1024px width)
  - Adjust QuestionGrid to smaller grid on mobile (5 columns instead of 10)
  - Ensure navigation buttons are appropriately sized on mobile
  - Ensure all text is readable on small screens
  - Test touch interactions on mobile devices
  - _Requirements: 16_

- [x] 24. Configure backend deployment for Render
  - Create render.yaml configuration file
  - Set build command to `npm install`
  - Set start command to `node server.js` or `npm start`
  - Configure environment variables: NODE_ENV, MONGODB_URI, PORT, CORS_ORIGIN
  - Add health check endpoint verification
  - Test deployment on Render platform
  - _Requirements: 23_

- [x] 25. Configure frontend deployment for Vercel
  - Create vercel.json configuration file
  - Set build command to `npm run build`
  - Set output directory to `build` or `dist`
  - Configure environment variable: REACT_APP_API_URL (Render backend URL)
  - Configure SPA routing (redirect all routes to index.html)
  - Test deployment on Vercel platform
  - _Requirements: 23_

- [ ] 26. Set up MongoDB Atlas database
  - Create MongoDB Atlas account and cluster (M0 free tier)
  - Create database user with readWrite permissions
  - Configure network access (allow access from anywhere for Render)
  - Get connection string and add to backend environment variables
  - Run seed script to populate questions collection
  - Verify database connection from deployed backend
  - _Requirements: 22, 23_

- [ ] 27. Integration testing and bug fixes
  - Test complete user flow: start → answer questions → submit → view results
  - Test localStorage persistence: answer questions → refresh → verify state restored
  - Test timer functionality: countdown, warning color, auto-submit
  - Test keyboard shortcuts: A/B/C/D, arrow keys, Enter
  - Test PDF export: generate and download PDF
  - Test responsive design on multiple devices
  - Test error handling: network errors, validation errors
  - Fix any bugs discovered during testing
  - _Requirements: 1-24_

- [ ] 28. Final checkpoint - Complete end-to-end testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for MVP functionality (no optional tasks marked with `*`)
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Backend tasks (1-6) should be completed before frontend tasks (7-22)
- Deployment tasks (24-26) should be completed after core functionality is working
- Integration testing (27) validates the complete system
- The 50 questions with Vietnamese explanations are critical and must be created in task 3
- Question randomization is implemented in the backend (task 4.2)
- All features from requirements must be implemented: timer, localStorage, keyboard shortcuts, PDF export, responsive design
