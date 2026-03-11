import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const FooterSection = ({ title, children }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="footer-accordion">
            <button className="footer-accordion-header" onClick={() => setOpen(!open)}>
                <h3>{title}</h3>
                <ChevronDown size={18} className={`footer-chevron ${open ? 'open' : ''}`} />
            </button>
            <div className={`footer-accordion-body ${open ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <Link to="/" className="logo">
                        <Store size={28} />
                        <span>MiniStore</span>
                    </Link>
                    <p className="footer-desc">
                        Premium marketplace for electronics, apparel, and home decor. Fast delivery across India.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                        <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
                    </div>
                </div>

                <div className="footer-links-desktop">
                    <div className="footer-links">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/">Latest Arrivals</Link></li>
                            <li><Link to="/">Trending Products</Link></li>
                            <li><Link to="/">Deal Zone</Link></li>
                            <li><Link to="/">Clearance Sale</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Support</h3>
                        <ul>
                            <li><Link to="/">Track My Order</Link></li>
                            <li><Link to="/">Return Policy</Link></li>
                            <li><Link to="/">Shipping Info</Link></li>
                            <li><Link to="/">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h3>Contact Info</h3>
                        <ul>
                            <li><MapPin size={16} /><span>123 Market St, Silicon Valley, KA, 560001</span></li>
                            <li><Phone size={16} /><span>+91 98765 43210</span></li>
                            <li><Mail size={16} /><span>support@ministore.com</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-links-mobile">
                    <FooterSection title="Shop">
                        <ul>
                            <li><Link to="/">Latest Arrivals</Link></li>
                            <li><Link to="/">Trending Products</Link></li>
                            <li><Link to="/">Deal Zone</Link></li>
                            <li><Link to="/">Clearance Sale</Link></li>
                        </ul>
                    </FooterSection>
                    <FooterSection title="Support">
                        <ul>
                            <li><Link to="/">Track My Order</Link></li>
                            <li><Link to="/">Return Policy</Link></li>
                            <li><Link to="/">Shipping Info</Link></li>
                            <li><Link to="/">Contact Us</Link></li>
                        </ul>
                    </FooterSection>
                    <FooterSection title="Contact">
                        <ul className="contact-list">
                            <li><MapPin size={16} /><span>123 Market St, KA 560001</span></li>
                            <li><Phone size={16} /><span>+91 98765 43210</span></li>
                            <li><Mail size={16} /><span>support@ministore.com</span></li>
                        </ul>
                    </FooterSection>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 MiniStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
