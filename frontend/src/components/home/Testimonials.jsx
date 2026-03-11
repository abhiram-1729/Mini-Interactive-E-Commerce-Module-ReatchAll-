import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        { name: "Abhiram", role: "Tech Enthusiast", rating: 5, text: "The delivery was surprisingly fast, and the packaging was excellent. Highly recommend the electronics collection!", avatar: "https://i.pinimg.com/736x/d2/0a/77/d20a776b2f1d201c1088181d215d4339.jpg" },
        { name: "Prashanth", role: "Fashion Blogger", rating: 5, text: "Found the perfect summer collection here. The fabric quality is top-notch and exactly as described.", avatar: "https://i.pravatar.cc/150?u=priya" },
        { name: "Anita", role: "Interior Designer", rating: 4, text: "Beautiful home decor pieces. They've really helped transform my living room into a modern space.", avatar: "https://i.pravatar.cc/150?u=anita" },
    ];

    return (
        <section className="testimonials-section py-16 bg-slate-50/50 rounded-3xl">
            <div className="section-header text-center mb-12">
                <h2 className="section-title">What Our Customers Say</h2>
                <p className="section-subtitle">Real feedback from real people who trust MiniStore</p>
            </div>

            <div className="testimonials-grid">
                {testimonials.map((t, i) => (
                    <div key={i} className="testimonial-card">
                        <div className="stars mb-4 flex gap-1">
                            {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />)}
                        </div>
                        <p className="testimonial-text mb-6">"{t.text}"</p>
                        <div className="testimonial-user">
                            <img src={t.avatar} alt={t.name} />
                            <div>
                                <h4>{t.name}</h4>
                                <span>{t.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
