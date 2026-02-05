import React from 'react';
import './SafetyRule.css';

// FUNCTIONAL COMPONENT (Stateless) - Individual Safety Rule Card
function SafetyRule({ icon, title, description, color }) {
    // Softer background color calculation
    const softColor = `${color}20`;

    return (
        <div
            className="safety-rule-card"
            style={{ borderColor: color, backgroundColor: softColor }}
            role="article"
            aria-label={`Safety rule: ${title}`}
        >
            <div className="rule-icon" style={{ backgroundColor: color }}>
                <span role="img" aria-hidden="true">{icon}</span>
            </div>
            <h3 className="rule-title" style={{ color: color }}>{title}</h3>
            <p className="rule-description">{description}</p>
        </div>
    );
}

export default SafetyRule;
