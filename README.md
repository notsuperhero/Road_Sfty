# 🚸 Road Safety Basics for Kids

An interactive, accessibility-focused educational web application designed to teach children road safety rules in a fun, calming, and engaging way.

**Project ID:** CB.SC.U4CSE23106

---

## 📖 About

This React application helps children learn essential road safety concepts through:
- 🎨 Interactive safety rule cards
- 🚦 Animated traffic light demonstration
- 🎮 Fun quizzes with encouraging feedback
- 📝 Simple feedback form

The app is designed with **accessibility in mind**, featuring calming colors, slower animations, and clear visual cues for comfortable learning.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Safety Rules Grid** | 6 illustrated safety rules with icons |
| **Traffic Light Demo** | Animated traffic light with 3.5s transitions |
| **Interactive Quiz** | Multiple-choice questions with progress tracking |
| **Score Tracking** | High scores saved to localStorage |
| **Feedback Form** | Form for children to share their learning |
| **Responsive Design** | Works on desktop, tablet, and mobile |

---

## 🛠️ React Concepts Used

### Components
| Concept | Files |
|---------|-------|
| **Function Components** | `TrafficLight.jsx`, `SafetyRule.jsx`, `Footer.jsx`, `HomePage.jsx`, `LearnPage.jsx` |
| **Class Components** | `Header.jsx`, `Quiz.jsx`, `SafetyRulesGrid.jsx`, `FeedbackForm.jsx`, `QuizPage.jsx` |
| **Stateless Components** | `SafetyRule.jsx`, `Footer.jsx` |

### State & Data
| Concept | Files |
|---------|-------|
| **State Management** | `useState` in functional, `this.state` in class components |
| **Props** | `SafetyRule.jsx` receives `icon`, `title`, `description`, `color` |
| **localStorage** | `QuizPage.jsx` for high scores |

### Events & Forms
| Concept | Files |
|---------|-------|
| **Events** | `onClick`, `onChange`, `onSubmit` throughout |
| **Forms** | `FeedbackForm.jsx` - controlled inputs, validation |

### Hooks
| Hook | Location |
|------|----------|
| `useState` | `TrafficLight.jsx`, `LearnPage.jsx`, `QuizPage.jsx` |
| `useEffect` | `TrafficLight.jsx`, `LearnPage.jsx`, `QuizPage.jsx` |
| `useFetch` (custom) | `src/hooks/useFetch.js` |
| `useLocalStorage` (custom) | `src/hooks/useLocalStorage.js` |
| `useTimer` (custom) | `src/hooks/useTimer.js` |

### Routing
| Concept | Files |
|---------|-------|
| **React Router** | `App.jsx`, `Header.jsx` |
| **Routes** | `/` (Home), `/learn`, `/quiz` |

### Lifecycle Methods
| Method | Files |
|--------|-------|
| `componentDidMount` | `Header.jsx`, `QuizPage.jsx` |
| `componentDidUpdate` | `Header.jsx`, `QuizPage.jsx` |
| `componentWillUnmount` | `Header.jsx`, `QuizPage.jsx` |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header (Class)
│   ├── Footer.jsx          # Page footer (Function/Stateless)
│   ├── SafetyRule.jsx      # Individual rule card (Function/Stateless)
│   ├── SafetyRulesGrid.jsx # Grid of safety rules (Class)
│   ├── TrafficLight.jsx    # Animated traffic light (Function + Hooks)
│   ├── Quiz.jsx            # Quiz component (Class)
│   └── FeedbackForm.jsx    # Feedback form (Class + Forms)
├── pages/
│   ├── HomePage.jsx        # Home page (Function)
│   ├── LearnPage.jsx       # Learning page with tabs (Function + Hooks)
│   └── QuizPage.jsx        # Quiz page (Class + Function)
├── hooks/
│   ├── useFetch.js         # API fetching hook
│   ├── useLocalStorage.js  # localStorage hook
│   ├── useTimer.js         # Timer hook
│   └── index.js            # Exports all hooks
├── App.jsx                 # Main app with routing
├── App.css                 # Global styles
├── index.css               # CSS variables & base styles
└── main.jsx                # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/notsuperhero/Road_Sfty.git

# Navigate to project directory
cd Road_Sfty

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🎨 Design Features

### Accessibility
- ♿ ARIA roles and labels for screen readers
- 🎯 Clear focus indicators
- 📱 Responsive on all devices
- ⏱️ Slower animations (3.5s for traffic light)
- 🔇 `prefers-reduced-motion` support

### Color Palette (Calming Theme)
| Variable | Color | Usage |
|----------|-------|-------|
| `--color-calm-blue` | #B8D4E8 | Headers, highlights |
| `--color-calm-green` | #C8E6C9 | Success states |
| `--color-calm-lavender` | #E1D5E7 | Backgrounds |
| `--color-calm-mint` | #C5E8D5 | Accents |
| `--color-calm-cream` | #FFF8E7 | Page backgrounds |

---

## 📚 Technologies

- **React 18** - UI Framework
- **React Router v6** - Client-side routing
- **Vite** - Build tool
- **CSS3** - Styling with CSS Variables

---

## 📝 License

This project is created for educational purposes.

---

## 👨‍💻 Author

**Project ID:** CB.SC.U4CSE23106

---

Made with 💙 for teaching road safety to kids!
