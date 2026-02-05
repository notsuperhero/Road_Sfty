import React from 'react';
import './Footer.css';

// FUNCTIONAL COMPONENT (Stateless) - Footer
function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-content">
                <div className="footer-message">
                    <span className="footer-emoji" role="img" aria-hidden="true">🚗</span>
                    <p>Stay Safe, Have Fun!</p>
                    <span className="footer-emoji" role="img" aria-hidden="true">🚌</span>
                </div>
                <p className="project-info">
                    Made with 💙 | <strong>CB.SC.U4CSE23106</strong>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
