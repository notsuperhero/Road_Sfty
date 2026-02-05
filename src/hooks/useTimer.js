import { useState, useEffect } from 'react';

// CUSTOM HOOK - useTimer for countdown/timer functionality
const useTimer = (initialSeconds = 0, autoStart = false) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(autoStart);

    useEffect(() => {
        let interval = null;

        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsRunning(false);
        }

        // Cleanup function
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, seconds]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const reset = () => {
        setSeconds(initialSeconds);
        setIsRunning(false);
    };

    return { seconds, isRunning, start, pause, reset };
};

export default useTimer;
