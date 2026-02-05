import React, { Component, useState, useEffect } from 'react';
import { useLocalStorage, useTimer } from '../hooks';
import './QuizPage.css';

// FUNCTIONAL COMPONENT - Level Selection Card
function LevelCard({ level, isLocked, isCompleted, stars, onSelect }) {
    const levelEmojis = {
        easy: '🌟',
        medium: '⭐',
        hard: '🏆'
    };

    const levelColors = {
        easy: 'var(--color-calm-green)',
        medium: 'var(--color-calm-blue)',
        hard: 'var(--color-calm-lavender)'
    };

    return (
        <button
            className={`level-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
            onClick={() => !isLocked && onSelect(level.id)}
            disabled={isLocked}
            style={{ borderColor: levelColors[level.id] }}
            aria-label={`${level.name} level${isLocked ? ' (locked)' : ''}`}
        >
            <div className="level-emoji">{levelEmojis[level.id]}</div>
            <h3 className="level-name">{level.name}</h3>
            <p className="level-description">{level.description}</p>
            {isLocked && <div className="lock-icon">🔒</div>}
            {isCompleted && (
                <div className="stars-earned">
                    {'⭐'.repeat(stars)}
                </div>
            )}
            {!isLocked && !isCompleted && (
                <span className="play-text">Tap to Play!</span>
            )}
        </button>
    );
}

// FUNCTIONAL COMPONENT - Score Display using useState and useEffect hooks
function ScoreBoard({ refreshTrigger }) {
    const [highScores, setHighScores] = useState({ easy: 0, medium: 0, hard: 0 });
    const [totalStars, setTotalStars] = useState(0);

    useEffect(() => {
        const loadScores = () => {
            const easyScore = parseInt(localStorage.getItem('quizScore_easy') || '0');
            const mediumScore = parseInt(localStorage.getItem('quizScore_medium') || '0');
            const hardScore = parseInt(localStorage.getItem('quizScore_hard') || '0');
            setHighScores({ easy: easyScore, medium: mediumScore, hard: hardScore });

            const stars = parseInt(localStorage.getItem('totalStars') || '0');
            setTotalStars(stars);
        };
        loadScores();
    }, [refreshTrigger]);

    return (
        <div className="scoreboard">
            <div className="score-item stars">
                <span className="score-label">⭐ Total Stars</span>
                <span className="score-value">{totalStars}</span>
            </div>
        </div>
    );
}

// CLASS COMPONENT with full state management and lifecycle methods
class QuizPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLevel: null, // null = level selection, 'easy'/'medium'/'hard' = playing
            currentQuestion: 0,
            score: 0,
            showResult: false,
            selectedAnswer: null,
            isCorrect: null,
            scoreboardRefresh: 0,
            unlockedLevels: ['easy'],
            completedLevels: {},
            levelStars: { easy: 0, medium: 0, hard: 0 }
        };

        this.levels = [
            { id: 'easy', name: '🌱 Easy', description: 'Start here!' },
            { id: 'medium', name: '🌿 Medium', description: 'A bit harder!' },
            { id: 'hard', name: '🌳 Hard', description: 'Expert mode!' }
        ];

        this.questions = {
            easy: [
                {
                    question: "What color means STOP?",
                    options: ["Green 💚", "Red ❤️", "Blue 💙", "Yellow 💛"],
                    correct: 1
                },
                {
                    question: "Where should you cross the road?",
                    options: ["Anywhere", "Zebra crossing 🦓", "Between cars", "Running fast"],
                    correct: 1
                },
                {
                    question: "Is it safe to play on the road?",
                    options: ["Yes!", "No, never! ⚠️", "Sometimes", "With friends"],
                    correct: 1
                }
            ],
            medium: [
                {
                    question: "What should you do before crossing?",
                    options: ["Run quickly", "Look left, right, left 👀", "Close eyes", "Jump"],
                    correct: 1
                },
                {
                    question: "What does a yellow traffic light mean?",
                    options: ["Go fast!", "Get ready ⚠️", "Stop", "Dance"],
                    correct: 1
                },
                {
                    question: "What should you wear at night?",
                    options: ["Dark clothes", "Bright clothes 🦺", "Pajamas", "Nothing special"],
                    correct: 1
                },
                {
                    question: "Should you use headphones while crossing?",
                    options: ["Yes, music is fun!", "No, listen for cars 👂", "Only one ear", "Always"],
                    correct: 1
                }
            ],
            hard: [
                {
                    question: "What is the safest way to cross a busy road?",
                    options: ["Run between cars", "Use footbridge or underpass 🌉", "Wait for no cars", "Wave at cars"],
                    correct: 1
                },
                {
                    question: "What should you do if a ball goes on the road?",
                    options: ["Chase it quickly", "Ask an adult for help 👨‍👩‍👧", "Ignore it", "Run and get it"],
                    correct: 1
                },
                {
                    question: "Why should you hold an adult's hand near roads?",
                    options: ["It's fun", "Adults walk faster", "To stay safe together 🤝", "No reason"],
                    correct: 2
                },
                {
                    question: "What should you do when getting off a bus?",
                    options: ["Run across the road", "Wait until bus leaves, then look 🚌", "Cross in front of bus", "Don't look"],
                    correct: 1
                },
                {
                    question: "When is it safe to cross at a green light?",
                    options: ["When light is green for cars", "When walking sign is green 🚶", "Anytime", "When in a hurry"],
                    correct: 1
                }
            ]
        };
    }

    componentDidMount() {
        console.log('QuizPage mounted - Ready to learn!');
        document.title = 'Road Safety Quiz - Choose Your Level!';
        this.loadProgress();
    }

    loadProgress = () => {
        const unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels') || '["easy"]');
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '{}');
        const levelStars = JSON.parse(localStorage.getItem('levelStars') || '{"easy":0,"medium":0,"hard":0}');
        this.setState({ unlockedLevels, completedLevels, levelStars });
    }

    saveProgress = () => {
        localStorage.setItem('unlockedLevels', JSON.stringify(this.state.unlockedLevels));
        localStorage.setItem('completedLevels', JSON.stringify(this.state.completedLevels));
        localStorage.setItem('levelStars', JSON.stringify(this.state.levelStars));

        const totalStars = Object.values(this.state.levelStars).reduce((a, b) => a + b, 0);
        localStorage.setItem('totalStars', totalStars.toString());
    }

    selectLevel = (levelId) => {
        this.setState({
            currentLevel: levelId,
            currentQuestion: 0,
            score: 0,
            showResult: false,
            selectedAnswer: null,
            isCorrect: null
        });
    }

    handleAnswer = (index) => {
        const { currentLevel, currentQuestion } = this.state;
        const questions = this.questions[currentLevel];
        const isCorrect = index === questions[currentQuestion].correct;

        this.setState({
            selectedAnswer: index,
            isCorrect: isCorrect,
            score: isCorrect ? this.state.score + 1 : this.state.score
        });

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                this.setState({
                    currentQuestion: currentQuestion + 1,
                    selectedAnswer: null,
                    isCorrect: null
                });
            } else {
                this.completeLevel();
            }
        }, 2000);
    }

    completeLevel = () => {
        const { currentLevel, score } = this.state;
        const questions = this.questions[currentLevel];
        const percentage = (score / questions.length) * 100;

        // Calculate stars (1-3 based on score)
        let stars = 1;
        if (percentage >= 80) stars = 3;
        else if (percentage >= 60) stars = 2;

        // Update completed levels and stars
        const completedLevels = { ...this.state.completedLevels, [currentLevel]: true };
        const levelStars = { ...this.state.levelStars };
        if (stars > levelStars[currentLevel]) {
            levelStars[currentLevel] = stars;
        }

        // Unlock next level if scored at least 60%
        let unlockedLevels = [...this.state.unlockedLevels];
        if (percentage >= 60) {
            if (currentLevel === 'easy' && !unlockedLevels.includes('medium')) {
                unlockedLevels.push('medium');
            } else if (currentLevel === 'medium' && !unlockedLevels.includes('hard')) {
                unlockedLevels.push('hard');
            }
        }

        this.setState({
            showResult: true,
            completedLevels,
            levelStars,
            unlockedLevels,
            scoreboardRefresh: this.state.scoreboardRefresh + 1
        }, () => {
            this.saveProgress();
        });
    }

    backToLevels = () => {
        this.setState({
            currentLevel: null,
            showResult: false,
            currentQuestion: 0,
            score: 0
        });
    }

    retryLevel = () => {
        this.setState({
            currentQuestion: 0,
            score: 0,
            showResult: false,
            selectedAnswer: null,
            isCorrect: null
        });
    }

    getEncouragingMessage = () => {
        const { score, currentLevel } = this.state;
        const total = this.questions[currentLevel].length;
        const percentage = (score / total) * 100;

        if (percentage === 100) return "Perfect! You're a Road Safety Champion! 🏆";
        if (percentage >= 80) return "Amazing! You earned 3 stars! ⭐⭐⭐";
        if (percentage >= 60) return "Great job! Level unlocked! Keep going! 🎉";
        return "Good try! Practice makes perfect! Try again! 💪";
    }

    render() {
        const {
            currentLevel, currentQuestion, score, showResult,
            selectedAnswer, isCorrect, unlockedLevels, completedLevels,
            levelStars, scoreboardRefresh
        } = this.state;

        // Level Selection Screen
        if (!currentLevel) {
            return (
                <div className="quiz-page">
                    <h2 className="quiz-page-title">🎮 Choose Your Level! 🎮</h2>
                    <ScoreBoard refreshTrigger={scoreboardRefresh} />

                    <div className="levels-container">
                        {this.levels.map((level) => (
                            <LevelCard
                                key={level.id}
                                level={level}
                                isLocked={!unlockedLevels.includes(level.id)}
                                isCompleted={completedLevels[level.id]}
                                stars={levelStars[level.id]}
                                onSelect={this.selectLevel}
                            />
                        ))}
                    </div>

                    <p className="level-hint">
                        💡 Score 60% or more to unlock the next level!
                    </p>
                </div>
            );
        }

        const questions = this.questions[currentLevel];
        const question = questions[currentQuestion];
        const levelName = this.levels.find(l => l.id === currentLevel).name;

        // Quiz Result Screen
        if (showResult) {
            const percentage = (score / questions.length) * 100;
            const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : 1;
            const unlockedNext = percentage >= 60 && (
                (currentLevel === 'easy' && unlockedLevels.includes('medium')) ||
                (currentLevel === 'medium' && unlockedLevels.includes('hard'))
            );

            return (
                <div className="quiz-page">
                    <div className="result-container">
                        <div className="result-emoji">
                            {percentage === 100 ? '🏆' : percentage >= 60 ? '⭐' : '📚'}
                        </div>
                        <h3 className="result-title">{levelName} Complete!</h3>
                        <div className="stars-display">
                            {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
                        </div>
                        <p className="result-score">
                            You got <span className="score">{score}</span> out of <span className="total">{questions.length}</span>
                        </p>
                        <p className="result-message">{this.getEncouragingMessage()}</p>

                        {unlockedNext && (
                            <div className="unlock-message">
                                🎉 New level unlocked! 🎉
                            </div>
                        )}

                        <div className="result-buttons">
                            <button className="restart-btn" onClick={this.retryLevel}>
                                🔄 Try Again
                            </button>
                            <button className="back-btn" onClick={this.backToLevels}>
                                📋 Back to Levels
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Quiz Playing Screen
        return (
            <div className="quiz-page">
                <div className="level-header">
                    <button className="back-arrow" onClick={this.backToLevels} aria-label="Back to levels">
                        ← Back
                    </button>
                    <h2 className="current-level-title">{levelName}</h2>
                </div>

                <div className="quiz-container">
                    <div className="progress-bar">
                        <div
                            className="progress"
                            style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                        />
                    </div>
                    <p className="question-counter">
                        Question {currentQuestion + 1} of {questions.length}
                    </p>
                    <h3 className="question">{question.question}</h3>
                    <div className="options">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-btn ${selectedAnswer === index
                                    ? (isCorrect ? 'correct' : 'wrong')
                                    : ''}`}
                                onClick={() => this.handleAnswer(index)}
                                disabled={selectedAnswer !== null}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {selectedAnswer !== null && (
                        <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                            {isCorrect ? '🎉 Correct! Well done!' : '💭 Not quite! You\'ll get it next time!'}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default QuizPage;
