import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import SetSelectionScreen from './components/SetSelectionScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { startQuiz } from './services/api';
import { clearSession } from './utils/localStorage';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start' | 'setSelection' | 'quiz' | 'result'
  const [sessionId, setSessionId] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);

  const handleStartQuiz = async (name, studentClass) => {
    try {
      const response = await startQuiz(name, studentClass);
      setSessionId(response.sessionId);
      setStudentInfo({ name, class: studentClass });
      setCurrentScreen('setSelection'); // Go to set selection instead of quiz
    } catch (error) {
      throw error;
    }
  };

  const handleSelectSet = (setNumber) => {
    setSelectedSet(setNumber);
    setCurrentScreen('quiz');
  };

  const handleSubmitQuiz = (resultIdFromQuiz) => {
    setResultId(resultIdFromQuiz);
    setCurrentScreen('result');
  };

  const handleRetake = () => {
    clearSession();
    setSessionId(null);
    setResultId(null);
    setStudentInfo(null);
    setSelectedSet(null);
    setCurrentScreen('start');
  };

  return (
    <div className="App">
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStartQuiz} />
      )}

      {currentScreen === 'setSelection' && studentInfo && (
        <SetSelectionScreen
          studentInfo={studentInfo}
          onSelectSet={handleSelectSet}
        />
      )}

      {currentScreen === 'quiz' && sessionId && studentInfo && selectedSet && (
        <QuizScreen
          sessionId={sessionId}
          studentInfo={studentInfo}
          selectedSet={selectedSet}
          onSubmit={handleSubmitQuiz}
        />
      )}

      {currentScreen === 'result' && resultId && (
        <ResultScreen
          resultId={resultId}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
}

export default App;
