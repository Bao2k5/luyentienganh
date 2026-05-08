import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Start quiz session
export const startQuiz = async (studentName, studentClass, setNumber) => {
    try {
        const response = await api.post('/api/quiz/start', {
            studentName,
            studentClass,
            setNumber,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.error?.message || 'Failed to start quiz'
        );
    }
};

// Get all questions
export const getQuestions = async (setNumber = 1) => {
    try {
        const response = await api.get(`/api/quiz/questions?setNumber=${setNumber}`);
        return response.data.questions;
    } catch (error) {
        throw new Error(
            error.response?.data?.error?.message || 'Failed to fetch questions'
        );
    }
};

// Submit quiz
export const submitQuiz = async (sessionId, answers, timeTaken) => {
    try {
        const response = await api.post('/api/quiz/submit', {
            sessionId,
            answers,
            timeTaken,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.error?.message || 'Failed to submit quiz'
        );
    }
};

// Get quiz result
export const getResult = async (resultId) => {
    try {
        const response = await api.get(`/api/quiz/results/${resultId}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.error?.message || 'Failed to fetch result'
        );
    }
};

// Get student quiz history
export const getHistory = async (studentName) => {
    try {
        const response = await api.get(`/api/quiz/history/${encodeURIComponent(studentName)}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.error?.message || 'Failed to fetch history'
        );
    }
};

// Get student statistics
export const getStats = async (studentName) => {
    try {
        const response = await api.get(`/api/quiz/stats/${encodeURIComponent(studentName)}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.error?.message || 'Failed to fetch statistics'
        );
    }
};

export default api;
