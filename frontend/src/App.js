import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import SetSelectionScreen from './components/SetSelectionScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import HistoryScreen from './components/HistoryScreen';
import { startQuiz } from './services/api';
import { clearSession } from './utils/localStorage';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start' | 'setSelection' | 'quiz' | 'result' | 'history'
  const [sessionId, setSessionId] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [historyStudentName, setHistoryStudentName] = useState(null);

  const handleStartQuiz = async (name, studentClass) => {
    try {
      setStudentInfo({ name, class: studentClass });
      setCurrentScreen('setSelection'); // Go to set selection first
    } catch (error) {
      throw error;
    }
  };

  const handleSelectSet = async (setNumber) => {
    try {
      // Start quiz session with selected set
      const response = await startQuiz(studentInfo.name, studentInfo.class, setNumber);
      setSessionId(response.sessionId);
      setSelectedSet(setNumber);
      setCurrentScreen('quiz');
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Không thể bắt đầu bài thi. Vui lòng thử lại.');
    }
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

  const handleViewHistory = (studentName) => {
    setHistoryStudentName(studentName);
    setCurrentScreen('history');
  };

  const handleBackFromHistory = () => {
    setHistoryStudentName(null);
    setCurrentScreen('start');
  };

  const handleViewResultFromHistory = (resultIdFromHistory) => {
    setResultId(resultIdFromHistory);
    setCurrentScreen('result');
  };

  return (
    <div className="App">
      {currentScreen === 'start' && (
        <StartScreen
          onStart={handleStartQuiz}
          onViewHistory={handleViewHistory}
        />
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

      {currentScreen === 'history' && historyStudentName && (
        <HistoryScreen
          studentName={historyStudentName}
          onBack={handleBackFromHistory}
          onViewResult={handleViewResultFromHistory}
        />
      )}
    </div>
  );
}

export default App;
