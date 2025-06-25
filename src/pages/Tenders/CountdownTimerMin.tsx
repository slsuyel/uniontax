import { useEffect, useState, useCallback } from "react";

const CountdownTimerMin = ({ endTime }: { endTime: string }) => {
    const calculateTimeLeft = useCallback(() => {
        const difference = +new Date(endTime) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }, [endTime]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div className="container mt-4 text-center">
            <h4 className="mb-3">দরপত্রের সময় শেষ হতে বাকি:</h4>
            <div className="d-flex justify-content-center gap-3">
                <div className="p-2 px-4 border rounded bg-light">
                    <h2 className="mb-0">{timeLeft.days}</h2>
                    <small>দিন</small>
                </div>
                <div className="p-2 px-4 border rounded bg-light">
                    <h2 className="mb-0">{timeLeft.hours}</h2>
                    <small>ঘণ্টা</small>
                </div>
                <div className="p-2 px-4 border rounded bg-light">
                    <h2 className="mb-0">{timeLeft.minutes}</h2>
                    <small>মিনিট</small>
                </div>
                <div className="p-2 px-4 border rounded bg-light">
                    <h2 className="mb-0">{timeLeft.seconds}</h2>
                    <small>সেকেন্ড</small>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimerMin;
