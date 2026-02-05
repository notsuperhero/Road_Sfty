import React from 'react';
import './Footer.css';

// FUNCTIONAL COMPONENT - Footer
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-message">
                    <span className="footer-emoji">🚗</span>
                    <p>Stay Safe on the Roads!</p>
                    <span className="footer-emoji">🚌</span>
                </div>
                <p className="project-info">
                    Project: <strong>CB.SC.U4CSE23106</strong>
                </p>

            </div>
        </footer>
    );
}

export default Footer;
