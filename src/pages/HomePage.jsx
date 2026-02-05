import React from 'react';
import SafetyRulesGrid from '../components/SafetyRulesGrid';
import './HomePage.css';

// FUNCTIONAL COMPONENT - Home Page
function HomePage() {
    return (
        <main className="home-page" role="main">
            <section className="welcome-section" aria-labelledby="welcome-title">
                <h2 id="welcome-title" className="welcome-title">👋 Welcome, Friend!</h2>
                <p className="welcome-text">
                    Let's learn how to stay safe on the roads together.
                    Take your time and have fun!
                </p>
            </section>
            <SafetyRulesGrid />
        </main>
    );
}

export default HomePage;
