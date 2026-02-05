import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

// CLASS COMPONENT - Header with navigation and state
class Header extends Component {
    // Constructor with state initialization
    constructor(props) {
        super(props);
        this.state = {
            isAnimated: false,
            isMenuOpen: false
        };
    }

    // Lifecycle method - componentDidMount
    componentDidMount() {
        // Animation trigger on mount
        this.setState({ isAnimated: true });
        console.log('Header component mounted');
    }

    // Lifecycle method - componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isMenuOpen !== this.state.isMenuOpen) {
            console.log(`Menu is now: ${this.state.isMenuOpen ? 'Open' : 'Closed'}`);
        }
    }

    // Lifecycle method - componentWillUnmount
    componentWillUnmount() {
        console.log('Header component will unmount');
    }

    // Class method - toggle menu
    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    render() {
        const { isAnimated, isMenuOpen } = this.state;

        return (
            <header className={`header ${isAnimated ? 'animated' : ''}`}>
                <div className="header-content">
                    <Link to="/" className="logo-link">
                        <h1 className="title">🚸 Road Safety Basics for Kids! 🚦</h1>
                    </Link>
                    <p className="subtitle">Learn to be safe on the roads!</p>

                    {/* Navigation using React Router */}
                    <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            🏠 Home
                        </NavLink>
                        <NavLink
                            to="/learn"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            📚 Learn
                        </NavLink>
                        <NavLink
                            to="/quiz"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            🎮 Quiz
                        </NavLink>
                    </nav>

                    <button className="menu-toggle" onClick={this.toggleMenu}>
                        {isMenuOpen ? '✖️' : '☰'}
                    </button>

                    <div className="student-info">
                        <span className="badge">CB.SC.U4CSE23106</span>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
