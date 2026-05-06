import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ initialTime, onTimeUp }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        if (timeRemaining <= 0) {
            onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeRemaining, onTimeUp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isWarning = timeRemaining < 300; // Less than 5 minutes

    return (
        <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${isWarning
                    ? 'bg-red-100 text-red-600'
                    : 'bg-blue-100 text-blue-600'
                }`}
        >
            <Clock className="w-5 h-5" />
            <span className="text-lg">{formatTime(timeRemaining)}</span>
        </div>
    );
};

export default Timer;
