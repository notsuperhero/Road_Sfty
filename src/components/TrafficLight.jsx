import React from 'react';
import './TrafficLight.css';

// FUNCTIONAL COMPONENT with Arrow Function - Traffic Light Display
const TrafficLight = () => {
    const [activeLight, setActiveLight] = React.useState('red');

    const lights = [
        { color: 'red', label: 'STOP', emoji: '🛑', instruction: 'Wait here. Stay safe behind the line!' },
        { color: 'yellow', label: 'GET READY', emoji: '⚠️', instruction: 'The light is changing. Get ready!' },
        { color: 'green', label: 'GO SAFELY', emoji: '✅', instruction: 'Look both ways, then walk carefully!' }
    ];

    // Slower transitions for comfortable viewing (3.5 seconds)
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveLight((prev) => {
                if (prev === 'red') return 'yellow';
                if (prev === 'yellow') return 'green';
                return 'red';
            });
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const currentLight = lights.find(l => l.color === activeLight);

    return (
        <section className="traffic-section" aria-live="polite" aria-label="Traffic light demonstration">
            <h2 className="traffic-title">🚥 What Do Traffic Lights Mean? 🚥</h2>
            <div className="traffic-container">
                <div className="traffic-light-box" role="img" aria-label={`Traffic light showing ${activeLight}`}>
                    {lights.map((light) => (
                        <div
                            key={light.color}
                            className={`light ${light.color} ${activeLight === light.color ? 'active' : ''}`}
                            aria-hidden="true"
                        />
                    ))}
                </div>
                <div className="light-message">
                    <span className="emoji" role="img" aria-hidden="true">{currentLight.emoji}</span>
                    <h3 className={`message ${activeLight}`}>{currentLight.label}</h3>
                    <p className="light-description">{currentLight.instruction}</p>
                </div>
            </div>
        </section>
    );
};

export default TrafficLight;
