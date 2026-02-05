import React from 'react';
import './SafetyRule.css';

// FUNCTIONAL COMPONENT - Individual Safety Rule Card
function SafetyRule({ icon, title, description, color }) {
    return (
        <div className="safety-rule-card" style={{ borderColor: color, backgroundColor: `${color}15` }}>
            <div className="rule-icon" style={{ backgroundColor: color }}>
                <span>{icon}</span>
            </div>
            <h3 className="rule-title" style={{ color: color }}>{title}</h3>
            <p className="rule-description">{description}</p>
        </div>
    );
}

export default SafetyRule;
