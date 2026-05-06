const STORAGE_KEY = 'quizSession';

// Save session to localStorage
export const saveSession = (session) => {
    try {
        const serialized = JSON.stringify(session);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
        console.error('Error saving session to localStorage:', error);
    }
};

// Load session from localStorage
export const loadSession = () => {
    try {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (serialized === null) {
            return null;
        }
        return JSON.parse(serialized);
    } catch (error) {
        console.error('Error loading session from localStorage:', error);
        return null;
    }
};

// Clear session from localStorage
export const clearSession = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing session from localStorage:', error);
    }
};
