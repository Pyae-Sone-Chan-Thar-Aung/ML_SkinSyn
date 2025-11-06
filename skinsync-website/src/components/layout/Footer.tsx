import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for footer styles

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} SkinSync. All rights reserved.</p>
                <nav>
                    <ul>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-of-service">Terms of Service</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;