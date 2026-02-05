import React, { Component, useState, useEffect } from 'react';
import { useLocalStorage, useTimer } from '../hooks';
import './QuizPage.css';

// FUNCTIONAL COMPONENT - Quiz Timer using custom hooks
function QuizTimer({ isRunning, onTimeUp }) {
    const { seconds, start, pause, reset } = useTimer(60, isRunning);

    React.useEffect(() => {
        if (seconds === 0 && isRunning) {
            onTimeUp();
        }
    }, [seconds, isRunning, onTimeUp]);

    React.useEffect(() => {
        if (isRunning) {
            start();
        } else {
            pause();
        }
    }, [isRunning]);

    return (
        <div className={`timer ${seconds <= 10 ? 'warning' : ''}`}>
            ⏱️ Time: {seconds}s
        </div>
    );
}

// FUNCTIONAL COMPONENT - Score Display using useState and useEffect hooks
function ScoreBoard({ refreshTrigger }) {
    // Using useState hook for state management
    const [highScore, setHighScore] = useState(0);
    const [totalQuizzes, setTotalQuizzes] = useState(0);

    // Using useEffect hook to load data from localStorage
    useEffect(() => {
        const loadScores = () => {
            const savedHighScore = parseInt(localStorage.getItem('roadSafetyHighScore') || '0');
            const savedTotalQuizzes = parseInt(localStorage.getItem('totalQuizzes') || '0');
            setHighScore(savedHighScore);
            setTotalQuizzes(savedTotalQuizzes);
        };

        loadScores();
    }, [refreshTrigger]); // Re-run when refreshTrigger changes

    return (
        <div className="scoreboard">
            <div className="score-item">
                <span className="score-label">🏆 High Score</span>
                <span className="score-value">{highScore}</span>
            </div>
            <div className="score-item">
                <span className="score-label">📊 Total Quizzes</span>
                <span className="score-value">{totalQuizzes}</span>
            </div>
        </div>
    );
}

// CLASS COMPONENT with full state management and lifecycle methods
class QuizPage extends Component {
    // Constructor - initializing state
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            score: 0,
            showResult: false,
            selectedAnswer: null,
            isCorrect: null,
            quizStarted: false,
            timeUp: false,
            scoreboardRefresh: 0  // Trigger to refresh scoreboard
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
            },
            {
                question: "What should you wear at night for safety?",
                options: ["Dark clothes", "Bright/reflective clothes 🦺", "Any clothes", "No clothes"],
                correct: 1
            }
        ];
    }

    // Lifecycle method - componentDidMount
    componentDidMount() {
        console.log('QuizPage mounted - Ready to learn!');
        document.title = 'Road Safety Quiz - Test Your Knowledge!';
    }

    // Lifecycle method - componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
        if (prevState.score !== this.state.score) {
            console.log(`Score updated: ${this.state.score}`);
        }

        if (this.state.showResult && !prevState.showResult) {
            // Save high score to localStorage
            const currentHighScore = parseInt(localStorage.getItem('roadSafetyHighScore') || '0');
            if (this.state.score > currentHighScore) {
                localStorage.setItem('roadSafetyHighScore', this.state.score.toString());
            }
            // Increment total quizzes
            const totalQuizzes = parseInt(localStorage.getItem('totalQuizzes') || '0') + 1;
            localStorage.setItem('totalQuizzes', totalQuizzes.toString());

            // Trigger scoreboard refresh using setState
            this.setState(prevState => ({
                scoreboardRefresh: prevState.scoreboardRefresh + 1
            }));
        }
    }

    // Lifecycle method - componentWillUnmount
    componentWillUnmount() {
        console.log('QuizPage unmounting - Goodbye!');
        document.title = 'Road Safety Basics';
    }

    // Class method - Start Quiz
    startQuiz = () => {
        this.setState({ quizStarted: true, timeUp: false });
    }

    // Class method - Handle Answer
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
                this.setState({ showResult: true, quizStarted: false });
            }
        }, 1500);
    }

    // Class method - Handle Time Up
    handleTimeUp = () => {
        this.setState({ timeUp: true, showResult: true, quizStarted: false });
    }

    // Class method - Reset Quiz
    resetQuiz = () => {
        this.setState({
            currentQuestion: 0,
            score: 0,
            showResult: false,
            selectedAnswer: null,
            isCorrect: null,
            quizStarted: false,
            timeUp: false
        });
    }

    // Render method
    render() {
        const { currentQuestion, score, showResult, selectedAnswer, isCorrect, quizStarted, timeUp, scoreboardRefresh } = this.state;
        const question = this.questions[currentQuestion];

        return (
            <div className="quiz-page">
                <h2 className="quiz-page-title">🎮 Road Safety Quiz 🎮</h2>

                {/* ScoreBoard using useState and useEffect hooks - refreshes when scoreboardRefresh changes */}
                <ScoreBoard refreshTrigger={scoreboardRefresh} />

                {!quizStarted && !showResult && (
                    <div className="quiz-start">
                        <p className="start-text">Ready to test your road safety knowledge?</p>
                        <button className="start-btn" onClick={this.startQuiz}>
                            🚀 Start Quiz
                        </button>
                    </div>
                )}

                {quizStarted && !showResult && (
                    <div className="quiz-container">
                        {/* Timer using custom hook */}
                        <QuizTimer isRunning={quizStarted} onTimeUp={this.handleTimeUp} />

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
                )}

                {showResult && (
                    <div className="result-container">
                        {timeUp ? (
                            <>
                                <div className="result-emoji">⏰</div>
                                <h3 className="result-title">Time's Up!</h3>
                            </>
                        ) : (
                            <>
                                <div className="result-emoji">
                                    {score === this.questions.length ? '🏆' : score >= this.questions.length / 2 ? '⭐' : '📚'}
                                </div>
                                <h3 className="result-title">Quiz Complete!</h3>
                            </>
                        )}
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
            </div>
        );
    }
}

export default QuizPage;
