import { useState, useEffect, useCallback } from 'react';

// CUSTOM HOOK - useLocalStorage for persisting data
// This hook demonstrates state persistence with localStorage
const useLocalStorage = (key, initialValue) => {
    // State to store our value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    // useEffect to update localStorage when state changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key, storedValue]);

    // Memoized setter function
    const setValue = useCallback((value) => {
        setStoredValue(prevValue => {
            const valueToStore = value instanceof Function ? value(prevValue) : value;
            return valueToStore;
        });
    }, []);

    return [storedValue, setValue];
};

export default useLocalStorage;
