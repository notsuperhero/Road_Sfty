import React, { Component } from 'react';
import './FeedbackForm.css';

// CLASS COMPONENT with Forms - Feedback Form with controlled inputs
class FeedbackForm extends Component {
    // Constructor - initializing form state
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            rating: '5',
            submitted: false,
            errors: {}
        };
    }

    // Event Handler - Handle input change (controlled component)
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            errors: { ...this.state.errors, [name]: '' }
        });
    }

    // Event Handler - Form validation (gentle messages)
    validateForm = () => {
        const errors = {};
        if (!this.state.name.trim()) {
            errors.name = 'Please tell us your name';
        }
        if (!this.state.message.trim()) {
            errors.message = 'Please share your thoughts';
        }
        return errors;
    }

    // Event Handler - Handle form submission
    handleSubmit = (event) => {
        event.preventDefault();

        const errors = this.validateForm();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        console.log('Form submitted:', this.state);
        this.setState({ submitted: true });

        // Reset form after 4 seconds (more time to read)
        setTimeout(() => {
            this.setState({
                name: '',
                message: '',
                rating: '5',
                submitted: false,
                errors: {}
            });
        }, 4000);
    }

    // Event Handler - Reset form
    handleReset = () => {
        this.setState({
            name: '',
            message: '',
            rating: '5',
            submitted: false,
            errors: {}
        });
    }

    render() {
        const { name, message, rating, submitted, errors } = this.state;

        if (submitted) {
            return (
                <div className="feedback-form-container" role="status" aria-live="polite">
                    <div className="success-message">
                        <span className="success-emoji" aria-hidden="true">🎉</span>
                        <h3>Thank You, {name}!</h3>
                        <p>We love hearing from you!</p>
                        <p>Your rating: {'⭐'.repeat(parseInt(rating))}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="feedback-form-container">
                <h3 className="form-title">📝 Share Your Thoughts!</h3>
                <p className="form-subtitle">Tell us what you learned about road safety</p>

                <form onSubmit={this.handleSubmit} className="feedback-form" noValidate>
                    {/* Text Input - Name */}
                    <div className="form-group">
                        <label htmlFor="name">👤 Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                            placeholder="Type your name here"
                            className={errors.name ? 'error' : ''}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && <span id="name-error" className="error-text" role="alert">{errors.name}</span>}
                    </div>

                    {/* Select Input - Rating */}
                    <div className="form-group">
                        <label htmlFor="rating">⭐ How much did you enjoy learning?</label>
                        <select
                            id="rating"
                            name="rating"
                            value={rating}
                            onChange={this.handleInputChange}
                        >
                            <option value="5">⭐⭐⭐⭐⭐ I loved it!</option>
                            <option value="4">⭐⭐⭐⭐ It was great!</option>
                            <option value="3">⭐⭐⭐ It was good</option>
                            <option value="2">⭐⭐ It was okay</option>
                            <option value="1">⭐ I want more</option>
                        </select>
                    </div>

                    {/* Textarea - Message */}
                    <div className="form-group">
                        <label htmlFor="message">💬 What did you learn?</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={this.handleInputChange}
                            placeholder="Share something you learned about staying safe on roads..."
                            rows="4"
                            className={errors.message ? 'error' : ''}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && <span id="message-error" className="error-text" role="alert">{errors.message}</span>}
                    </div>

                    {/* Form Buttons */}
                    <div className="form-buttons">
                        <button type="submit" className="submit-btn">
                            ✅ Send
                        </button>
                        <button type="button" className="reset-btn" onClick={this.handleReset}>
                            🔄 Start Over
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FeedbackForm;
