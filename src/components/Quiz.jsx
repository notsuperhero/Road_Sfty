import React, { Component } from 'react';
import './Quiz.css';

// CLASS COMPONENT with State Management - Interactive Quiz
class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            score: 0,
            showResult: false,
            selectedAnswer: null,
            isCorrect: null
        };

        this.questions = [
            {
                question: "What color means STOP at a traffic light?",
                options: ["Green 💚", "Red ❤️", "Blue 💙", "Yellow 💛"],
                correct: 1
            },
            {
                question: "Where is the safest place to cross the road?",
                options: ["Anywhere", "Zebra crossing 🦓", "Between cars", "While running"],
                correct: 1
            },
            {
                question: "What should you do before crossing the road?",
                options: ["Run quickly", "Close your eyes", "Look left, right, left 👀", "Play a game"],
                correct: 2
            },
            {
                question: "Is it safe to play on the road?",
                options: ["Yes!", "No, never! ⚠️", "Sometimes", "With friends"],
                correct: 1
            }
        ];
    }

    handleAnswer = (index) => {
        const isCorrect = index === this.questions[this.state.currentQuestion].correct;
        this.setState({
            selectedAnswer: index,
            isCorrect: isCorrect,
            score: isCorrect ? this.state.score + 1 : this.state.score
        });

        // Longer feedback time (2.5 seconds) for comfortable reading
        setTimeout(() => {
            if (this.state.currentQuestion < this.questions.length - 1) {
                this.setState({
                    currentQuestion: this.state.currentQuestion + 1,
                    selectedAnswer: null,
                    isCorrect: null
                });
            } else {
                this.setState({ showResult: true });
            }
        }, 2500);
    }

    resetQuiz = () => {
        this.setState({
            currentQuestion: 0,
            score: 0,
            showResult: false,
            selectedAnswer: null,
            isCorrect: null
        });
    }

    // Get encouraging message based on score
    getEncouragingMessage = () => {
        const { score } = this.state;
        const total = this.questions.length;

        if (score === total) {
            return "Amazing! You know all the safety rules! 🌟";
        } else if (score >= total / 2) {
            return "Great job! You're learning well! Keep it up! 📖";
        } else {
            return "Good try! Practice makes perfect! You can do it! 💪";
        }
    }

    render() {
        const { currentQuestion, score, showResult, selectedAnswer, isCorrect } = this.state;
        const question = this.questions[currentQuestion];

        return (
            <section className="quiz-section" aria-label="Road Safety Quiz">
                <h2 className="quiz-title">🎮 Road Safety Quiz 🎮</h2>

                {!showResult ? (
                    <div className="quiz-container" role="form" aria-label="Quiz questions">
                        <div className="progress-bar" role="progressbar" aria-valuenow={currentQuestion + 1} aria-valuemin="1" aria-valuemax={this.questions.length}>
                            <div
                                className="progress"
                                style={{ width: `${((currentQuestion) / this.questions.length) * 100}%` }}
                            />
                        </div>
                        <p className="question-counter">
                            Question {currentQuestion + 1} of {this.questions.length}
                        </p>
                        <h3 className="question">{question.question}</h3>
                        <div className="options" role="group" aria-label="Answer choices">
                            {question.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-btn ${selectedAnswer === index
                                        ? (isCorrect ? 'correct' : 'wrong')
                                        : ''
                                        }`}
                                    onClick={() => this.handleAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                    aria-pressed={selectedAnswer === index}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {selectedAnswer !== null && (
                            <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`} role="alert">
                                {isCorrect ? '🎉 That\'s right! Well done!' : '💭 Not quite! You\'ll remember next time!'}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="result-container" role="status" aria-live="polite">
                        <div className="result-emoji" aria-hidden="true">
                            {score === this.questions.length ? '🏆' : score >= this.questions.length / 2 ? '⭐' : '📚'}
                        </div>
                        <h3 className="result-title">Quiz Complete!</h3>
                        <p className="result-score">
                            You got <span className="score">{score}</span> out of <span className="total">{this.questions.length}</span>
                        </p>
                        <p className="result-message">{this.getEncouragingMessage()}</p>
                        <button className="restart-btn" onClick={this.resetQuiz}>
                            🔄 Try Again
                        </button>
                    </div>
                )}
            </section>
        );
    }
}

export default Quiz;
