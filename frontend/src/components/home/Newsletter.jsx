import React from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="newsletter-section py-16">
            <div className="newsletter-card shadow-glow">
                <div className="newsletter-content">
                    <h2>Join Our Community</h2>
                    <p>Subscribe to our newsletter and get 10% off your first purchase plus early access to sales.</p>
                </div>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Your email address" required />
                    <button type="submit">
                        Subscribe
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
