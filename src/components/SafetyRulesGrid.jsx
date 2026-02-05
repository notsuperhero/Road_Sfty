import React, { Component } from 'react';
import SafetyRule from './SafetyRule';
import './SafetyRulesGrid.css';

// CLASS COMPONENT - Grid container for all safety rules
class SafetyRulesGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rules: [
                {
                    id: 1,
                    icon: '👀',
                    title: 'Look Both Ways',
                    description: 'Before crossing, look left, then right, then left again. Take your time!',
                    color: '#E57373'
                },
                {
                    id: 2,
                    icon: '🚶',
                    title: 'Use the Crossing',
                    description: 'Always cross at zebra crossings or bridges. They keep you safe!',
                    color: '#4DB6AC'
                },
                {
                    id: 3,
                    icon: '🚦',
                    title: 'Watch the Lights',
                    description: 'Green means go, red means stop. Wait for the green walking sign!',
                    color: '#64B5F6'
                },
                {
                    id: 4,
                    icon: '🏃',
                    title: 'Play in Safe Places',
                    description: 'Parks and playgrounds are great for playing. Roads are for walking only!',
                    color: '#FFB74D'
                },
                {
                    id: 5,
                    icon: '👂',
                    title: 'Listen Carefully',
                    description: 'Keep your ears open for cars and bikes. No headphones while crossing!',
                    color: '#9575CD'
                },
                {
                    id: 6,
                    icon: '🦺',
                    title: 'Wear Bright Colors',
                    description: 'Bright clothes help drivers see you, especially when it gets dark!',
                    color: '#E57373'
                }
            ]
        };
    }

    render() {
        return (
            <section className="safety-rules-section" aria-labelledby="rules-title">
                <h2 id="rules-title" className="section-title">🌟 Important Safety Rules 🌟</h2>
                <div className="rules-grid" role="list">
                    {this.state.rules.map((rule) => (
                        <SafetyRule
                            key={rule.id}
                            icon={rule.icon}
                            title={rule.title}
                            description={rule.description}
                            color={rule.color}
                        />
                    ))}
                </div>
            </section>
        );
    }
}

export default SafetyRulesGrid;
