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
                question: "Where should you cross the road?",
                options: ["Anywhere you like", "Zebra crossing 🦓", "Between parked cars", "While running"],
                correct: 1
            },
            {
                question: "What should you do before crossing the road?",
                options: ["Run quickly", "Close your eyes", "Look left, right, then left again 👀", "Play games"],
                correct: 2
            },
            {
                question: "Can you play on the road?",
                options: ["Yes, it's fun!", "No, never! ⚠️", "Only sometimes", "Only with friends"],
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
        }, 1500);
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

    render() {
        const { currentQuestion, score, showResult, selectedAnswer, isCorrect } = this.state;
        const question = this.questions[currentQuestion];

        return (
            <section className="quiz-section">
                <h2 className="quiz-title">🎮 Road Safety Quiz 🎮</h2>

                {!showResult ? (
                    <div className="quiz-container">
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${((currentQuestion) / this.questions.length) * 100}%` }}
                            />
                        </div>
                        <p className="question-counter">
                            Question {currentQuestion + 1} of {this.questions.length}
                        </p>
                        <h3 className="question">{question.question}</h3>
                        <div className="options">
                            {question.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-btn ${selectedAnswer === index
                                            ? (isCorrect ? 'correct' : 'wrong')
                                            : ''
                                        }`}
                                    onClick={() => this.handleAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {selectedAnswer !== null && (
                            <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                                {isCorrect ? '🎉 Correct! Great job!' : '❌ Oops! Try to remember this!'}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="result-container">
                        <div className="result-emoji">
                            {score === this.questions.length ? '🏆' : score >= this.questions.length / 2 ? '⭐' : '📚'}
                        </div>
                        <h3 className="result-title">Quiz Complete!</h3>
                        <p className="result-score">
                            You scored <span className="score">{score}</span> out of <span className="total">{this.questions.length}</span>
                        </p>
                        <p className="result-message">
                            {score === this.questions.length
                                ? 'Perfect! You\'re a Road Safety Champion! 🌟'
                                : score >= this.questions.length / 2
                                    ? 'Good job! Keep learning! 📖'
                                    : 'Keep practicing to become safer! 💪'}
                        </p>
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
