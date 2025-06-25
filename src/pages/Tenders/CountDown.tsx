/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";

const Countdown = ({ data }: any) => {
    const { id } = useParams();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!data?.start_time) return;

        const targetTime = new Date(data?.start_time).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateCountdown();

        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [data]);

    const colorMap = ['primary', 'success', 'warning', 'danger'];
    const labels = ['Days', 'Hours', 'Minutes', 'Seconds'];
    const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];


    return (
        <div
            className="container my-5 text-center"
            style={{ height: '100vh', padding: '0 1rem' }}
        >
            <h2 className="mb-4 text-primary">টেন্ডার আইডি: {id}</h2>
            <p className="mb-4 text-info">
                শুরু হওয়ার সময়: {new Date(data.start_time).toLocaleString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </p>
            <Row gutter={[16, 16]} justify="center">
                {values.map((val, index) => (
                    <Col key={index} xs={24} sm={12} md={6}>
                        <Card
                            bordered={false}
                            className={`text-white bg-${colorMap[index]} p-3`}
                            style={{ borderRadius: "12px" }}
                        >
                            <h1 className="display-4">{val.toString().padStart(2, '0')}</h1>
                            <p className="mb-0 fw-semibold">{labels[index]}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Countdown;
