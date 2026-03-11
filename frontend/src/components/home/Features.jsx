import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headset } from 'lucide-react';

const Features = () => {
    const features = [
        { icon: Truck, title: "Free Delivery", desc: "On orders above ₹999", color: "#eff6ff", iconColor: "#3b82f6" },
        { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected checkout", color: "#f0fdf4", iconColor: "#22c55e" },
        { icon: RefreshCw, title: "Easy Returns", desc: "30 days easy return policy", color: "#fef2f2", iconColor: "#ef4444" },
        { icon: Headset, title: "24/7 Support", desc: "Dedicated support team", color: "#fdf4ff", iconColor: "#d946ef" },
    ];

    return (
        <section className="features-section">
            <div className="features-grid">
                {features.map((f, i) => (
                    <div key={i} className="feature-card">
                        <div className="feature-icon" style={{ backgroundColor: f.color }}>
                            <f.icon size={24} color={f.iconColor} />
                        </div>
                        <div className="feature-info">
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
