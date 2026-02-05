# 🚸 Road Safety Basics for Children
## Project: CB.SC.U4CSE23106

---

## 📍 Application Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home Page | Welcome section + Safety Rules Grid |
| `/learn` | Learn Page | Tabs with Safety Tips (API) + Traffic Light |
| `/quiz` | Quiz Page | Interactive Quiz with Timer & Scoreboard |

---

## 🏗️ React Component Types Used

### 1️⃣ CLASS COMPONENTS (with State & Lifecycle Methods)

| Component | File | React Features Used |
|-----------|------|---------------------|
| **Header** | `src/components/Header.jsx` | `constructor()`, `this.state`, `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()`, `this.setState()`, `render()` |
| **SafetyRulesGrid** | `src/components/SafetyRulesGrid.jsx` | `constructor()`, `this.state`, `render()`, `.map()` for list rendering |
| **QuizPage** | `src/pages/QuizPage.jsx` | `constructor()`, `this.state`, `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()`, `this.setState()`, event handlers as arrow functions |

---

### 2️⃣ FUNCTIONAL COMPONENTS (with Hooks)

| Component | File | React Features Used |
|-----------|------|---------------------|
| **App** | `src/App.jsx` | Main component with `BrowserRouter`, `Routes`, `Route` |
| **HomePage** | `src/pages/HomePage.jsx` | Simple functional component |
| **LearnPage** | `src/pages/LearnPage.jsx` | `useState`, `useEffect`, custom `useFetch` hook |
| **TrafficLight** | `src/components/TrafficLight.jsx` | `useState`, `useEffect` (with cleanup), auto-cycling animation |
| **SafetyRule** | `src/components/SafetyRule.jsx` | Props destructuring, inline styles |
| **Footer** | `src/components/Footer.jsx` | Simple functional component |
| **QuizTimer** | `src/pages/QuizPage.jsx` | `useEffect`, custom `useTimer` hook |
| **ScoreBoard** | `src/pages/QuizPage.jsx` | custom `useLocalStorage` hook |

---

## 🎣 CUSTOM HOOKS (API Hooks)

| Hook | File | Purpose | React Hooks Used |
|------|------|---------|------------------|
| **useFetch** | `src/hooks/useFetch.js` | Simulates API data fetching | `useState`, `useEffect` |
| **useLocalStorage** | `src/hooks/useLocalStorage.js` | Persists data to localStorage | `useState`, `useEffect`, `useCallback` |
| **useTimer** | `src/hooks/useTimer.js` | Countdown timer functionality | `useState`, `useEffect` |

---

## 🛤️ REACT ROUTER (Routing)

**File:** `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/learn" element={<LearnPage />} />
    <Route path="/quiz" element={<QuizPage />} />
  </Routes>
</BrowserRouter>
```

**Navigation Links:** `src/components/Header.jsx`
```jsx
import { Link, NavLink } from 'react-router-dom'

<NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
  🏠 Home
</NavLink>
```

---

## 📊 React Concepts Demonstrated

| Concept | Where Used |
|---------|------------|
| **Class Component** | Header, SafetyRulesGrid, QuizPage |
| **Functional Component** | App, HomePage, LearnPage, TrafficLight, SafetyRule, Footer |
| **useState Hook** | LearnPage, TrafficLight, useFetch, useLocalStorage, useTimer |
| **useEffect Hook** | LearnPage, TrafficLight, useFetch, useLocalStorage, useTimer |
| **useCallback Hook** | useLocalStorage |
| **Custom Hooks** | useFetch, useLocalStorage, useTimer |
| **Props** | SafetyRule (icon, title, description, color) |
| **State Management** | All Class Components use this.state |
| **Lifecycle Methods** | Header, QuizPage |
| **Conditional Rendering** | QuizPage (quiz/result), LearnPage (tabs) |
| **List Rendering (.map)** | SafetyRulesGrid, Quiz options |
| **React Router** | App.jsx, Header.jsx |
| **Event Handling** | Quiz buttons, Tab buttons, Navigation |

---

## 🎨 Project Structure

```
src/
├── components/
│   ├── Header.jsx          ← CLASS COMPONENT
│   ├── Header.css
│   ├── SafetyRule.jsx      ← FUNCTIONAL COMPONENT (Props)
│   ├── SafetyRule.css
│   ├── SafetyRulesGrid.jsx ← CLASS COMPONENT
│   ├── SafetyRulesGrid.css
│   ├── TrafficLight.jsx    ← FUNCTIONAL (useState, useEffect)
│   ├── TrafficLight.css
│   ├── Footer.jsx          ← FUNCTIONAL COMPONENT
│   └── Footer.css
├── hooks/
│   ├── index.js            ← Exports all hooks
│   ├── useFetch.js         ← CUSTOM HOOK (API)
│   ├── useLocalStorage.js  ← CUSTOM HOOK (Persistence)
│   └── useTimer.js         ← CUSTOM HOOK (Timer)
├── pages/
│   ├── HomePage.jsx        ← FUNCTIONAL COMPONENT
│   ├── HomePage.css
│   ├── LearnPage.jsx       ← FUNCTIONAL (Hooks + useFetch)
│   ├── LearnPage.css
│   ├── QuizPage.jsx        ← CLASS COMPONENT (Full Lifecycle)
│   └── QuizPage.css
├── App.jsx                 ← MAIN APP (Router)
├── App.css
├── index.css
└── main.jsx
```

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

Open: **http://localhost:5173**

---

**Student ID:** CB.SC.U4CSE23106  
**Topic:** Road Safety Basics for Children
