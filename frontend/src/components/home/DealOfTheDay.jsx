import React, { useState, useEffect } from 'react';
import { ShoppingCart, Timer } from 'lucide-react';

const DealOfTheDay = ({ onAddToCart }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let s = prev.seconds - 1;
                let m = prev.minutes;
                let h = prev.hours;

                if (s < 0) {
                    s = 59;
                    m -= 1;
                }
                if (m < 0) {
                    m = 59;
                    h -= 1;
                }
                if (h < 0) return prev; // Stopped

                return { hours: h, minutes: m, seconds: s };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="deal-of-the-day py-12">
            <div className="dotd-card">
                <div className="dotd-content">
                    <div className="dotd-badge">DEAL OF THE DAY</div>
                    <h2 className="dotd-title">Ultra HD Smart Camera Z2</h2>
                    <p className="dotd-desc">Experience crystal clear surveillance with our latest 4K night vision camera. Limited time offer!</p>

                    <div className="dotd-pricing">
                        <span className="dotd-current">₹4,999</span>
                        <span className="dotd-old">₹8,999</span>
                        <span className="dotd-discount">45% OFF</span>
                    </div>

                    <div className="countdown-timer">
                        <div className="timer-unit">
                            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                            <label>Hours</label>
                        </div>
                        <div className="timer-separator">:</div>
                        <div className="timer-unit">
                            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <label>Mins</label>
                        </div>
                        <div className="timer-separator">:</div>
                        <div className="timer-unit">
                            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <label>Secs</label>
                        </div>
                    </div>

                    <button className="dotd-btn shadow-glow">
                        <ShoppingCart size={20} />
                        Get it Now
                    </button>
                </div>
                <div className="dotd-image">
                    <img src="https://i.pinimg.com/736x/b5/cc/27/b5cc279f68baa87ccef22ce4ff92486d.jpg" alt="Deal Product" />
                    <div className="dotd-floating-badge">HURRY UP!</div>
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;
