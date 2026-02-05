import React from 'react';
import SafetyRulesGrid from '../components/SafetyRulesGrid';
import './HomePage.css';

// FUNCTIONAL COMPONENT - Home Page with hooks
function HomePage() {
    return (
        <div className="home-page">
            <div className="welcome-section">
                <h2 className="welcome-title">👋 Welcome Little Friends!</h2>
                <p className="welcome-text">
                    Learn how to stay safe on the roads with fun activities!
                </p>
            </div>
            <SafetyRulesGrid />
        </div>
    );
}

export default HomePage;
