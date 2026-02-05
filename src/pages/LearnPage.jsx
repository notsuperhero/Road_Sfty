import React, { useState, useEffect } from 'react';
import TrafficLight from '../components/TrafficLight';
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
        // Animation effect when component mounts
        setAnimationClass('fade-in');

        // Cleanup function
        return () => {
            setAnimationClass('');
        };
    }, []);

    // useEffect to track tab changes
    useEffect(() => {
        console.log(`Tab changed to: ${activeTab}`);
    }, [activeTab]);

    return (
        <div className={`learn-page ${animationClass}`}>
            <h2 className="page-title">📚 Learn Road Safety 📚</h2>

            {/* Tab Navigation */}
            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tips')}
                >
                    💡 Safety Tips
                </button>
                <button
                    className={`tab-btn ${activeTab === 'traffic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('traffic')}
                >
                    🚦 Traffic Lights
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'tips' && (
                    <div className="tips-section">
                        <h3>📋 Daily Safety Tips (from API)</h3>
                        {loading && (
                            <div className="loading">
                                <span className="loader">🔄</span> Loading tips...
                            </div>
                        )}
                        {error && <p className="error">Error: {error}</p>}
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

                {activeTab === 'traffic' && <TrafficLight />}
            </div>
        </div>
    );
}

export default LearnPage;
