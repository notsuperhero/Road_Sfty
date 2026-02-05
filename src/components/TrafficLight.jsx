import React from 'react';
import './TrafficLight.css';

// FUNCTIONAL COMPONENT with Arrow Function - Traffic Light Display
const TrafficLight = () => {
    const [activeLight, setActiveLight] = React.useState('red');

    const lights = [
        { color: 'red', label: 'STOP!', emoji: '🛑' },
        { color: 'yellow', label: 'GET READY!', emoji: '⚠️' },
        { color: 'green', label: 'GO!', emoji: '✅' }
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveLight((prev) => {
                if (prev === 'red') return 'yellow';
                if (prev === 'yellow') return 'green';
                return 'red';
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const currentLight = lights.find(l => l.color === activeLight);

    return (
        <section className="traffic-section">
            <h2 className="traffic-title">🚥 Traffic Light Meanings 🚥</h2>
            <div className="traffic-container">
                <div className="traffic-light-box">
                    {lights.map((light) => (
                        <div
                            key={light.color}
                            className={`light ${light.color} ${activeLight === light.color ? 'active' : ''}`}
                        />
                    ))}
                </div>
                <div className="light-message">
                    <span className="emoji">{currentLight.emoji}</span>
                    <h3 className={`message ${activeLight}`}>{currentLight.label}</h3>
                    <p className="light-description">
                        {activeLight === 'red' && 'Wait patiently behind the line!'}
                        {activeLight === 'yellow' && 'Prepare to walk or stop!'}
                        {activeLight === 'green' && 'Look both ways and walk safely!'}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TrafficLight;
