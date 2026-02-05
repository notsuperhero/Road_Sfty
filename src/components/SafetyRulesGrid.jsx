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
                    description: 'Always look left, right, then left again before crossing the road!',
                    color: '#FF6B6B'
                },
                {
                    id: 2,
                    icon: '🚶',
                    title: 'Use Zebra Crossing',
                    description: 'Always cross at zebra crossings or pedestrian bridges!',
                    color: '#4ECDC4'
                },
                {
                    id: 3,
                    icon: '🚦',
                    title: 'Follow Traffic Lights',
                    description: 'Green means Go, Red means Stop! Always obey traffic signals!',
                    color: '#45B7D1'
                },
                {
                    id: 4,
                    icon: '🚫',
                    title: 'No Playing on Roads',
                    description: 'Never play games or sports on the road. Use parks instead!',
                    color: '#F39C12'
                },
                {
                    id: 5,
                    icon: '👂',
                    title: 'Listen Carefully',
                    description: 'Keep ears open for vehicles. No headphones while crossing!',
                    color: '#9B59B6'
                },
                {
                    id: 6,
                    icon: '🦺',
                    title: 'Be Visible',
                    description: 'Wear bright colors at night so drivers can see you!',
                    color: '#E74C3C'
                }
            ]
        };
    }

    render() {
        return (
            <section className="safety-rules-section">
                <h2 className="section-title">🌟 Important Safety Rules 🌟</h2>
                <div className="rules-grid">
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
