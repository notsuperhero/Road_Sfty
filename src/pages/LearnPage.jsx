import React, { useState, useEffect } from 'react';
import TrafficLight from '../components/TrafficLight';
import FeedbackForm from '../components/FeedbackForm';
import { useFetch } from '../hooks';
import './LearnPage.css';

// FUNCTIONAL COMPONENT using useState, useEffect, and custom useFetch hook
function LearnPage() {
    // Using useState hook for local state
    const [activeTab, setActiveTab] = useState('tips');
    const [animationClass, setAnimationClass] = useState('');

    // Using custom useFetch hook for API data
    const { data: tips, loading, error } = useFetch('/api/safety-tips');

    // Using useEffect for side effects
    useEffect(() => {
        setAnimationClass('fade-in');
        return () => {
            setAnimationClass('');
        };
    }, []);

    // useEffect to track tab changes
    useEffect(() => {
        console.log(`Tab changed to: ${activeTab}`);
    }, [activeTab]);

    return (
        <main className={`learn-page ${animationClass}`} role="main">
            <h2 className="page-title">📚 Learn Road Safety 📚</h2>

            {/* Tab Navigation - Clear Labels */}
            <nav className="tabs" role="tablist" aria-label="Learning sections">
                <button
                    className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tips')}
                    role="tab"
                    aria-selected={activeTab === 'tips'}
                    aria-controls="tips-panel"
                >
                    💡 Safety Tips
                </button>
                <button
                    className={`tab-btn ${activeTab === 'traffic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('traffic')}
                    role="tab"
                    aria-selected={activeTab === 'traffic'}
                    aria-controls="traffic-panel"
                >
                    🚦 Traffic Lights
                </button>
                <button
                    className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feedback')}
                    role="tab"
                    aria-selected={activeTab === 'feedback'}
                    aria-controls="feedback-panel"
                >
                    📝 Share Thoughts
                </button>
            </nav>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'tips' && (
                    <div id="tips-panel" className="tips-section" role="tabpanel" aria-labelledby="tips-tab">
                        <h3>📋 Safety Tips to Remember</h3>
                        {loading && (
                            <div className="loading" role="status" aria-live="polite">
                                <span className="loader" aria-hidden="true">🔄</span> Loading tips...
                            </div>
                        )}
                        {error && <p className="error" role="alert">Oops! We couldn't load the tips. Try again later.</p>}
                        {tips && (
                            <ul className="tips-list">
                                {tips.map((tip) => (
                                    <li key={tip.id} className={`tip-item ${tip.category}`}>
                                        <span className="tip-badge">{tip.category}</span>
                                        {tip.tip}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {activeTab === 'traffic' && (
                    <div id="traffic-panel" role="tabpanel" aria-labelledby="traffic-tab">
                        <TrafficLight />
                    </div>
                )}

                {activeTab === 'feedback' && (
                    <div id="feedback-panel" role="tabpanel" aria-labelledby="feedback-tab">
                        <FeedbackForm />
                    </div>
                )}
            </div>
        </main>
    );
}

export default LearnPage;
