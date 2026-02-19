# 🏆 CROREPATI - Premium Quiz Challenge

A startup-level, modern web-based quiz game inspired by Kaun Banega Crorepati (KBC), redesigned as a 2026 premium tech product with cinematic visuals, glassmorphism, and smooth micro-interactions.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Python](https://img.shields.io/badge/python-3.7+-green)
![Flask](https://img.shields.io/badge/flask-3.0.0-red)

## ✨ Features

### Game Features
- 25 challenging hard-level questions
- Topics: Indian history, World history, Science, Space, Technology, Economics, Politics, Geography
- 25-level prize ladder up to ₹10 Crore
- Safe levels at ₹10,000, ₹3,20,000, and ₹1,00,00,000
- Confirm button before answer submission
- Quit anytime option
- Session-based game state management

### UI/UX Features
- **Midnight Aurora Gold Theme** - Cinematic layered gradients
- **Glassmorphism Design** - Modern semi-transparent cards with backdrop blur
- **Smooth Micro-interactions** - Button press feedback, hover effects
- **Confetti Animation** - Celebration effect on correct answers (250+ particles)
- **Screen Glow Flash** - Visual feedback for correct answers
- **Shake Animation** - Subtle feedback for wrong answers
- **Responsive Design** - Works perfectly on all devices
- **Modern Typography** - Clean Inter font with strong hierarchy

## 🎨 Design System

### Theme: Midnight Aurora Gold

**Background Colors:**
- Deep Navy: `#0a0f2c`
- Navy Blue: `#111a44`
- Violet: `#1a1f4d`
- Purple: `#2d1363`

**Accent Colors:**
- Gold Primary: `#F5C518`
- Gold Bright: `#FFD700`
- Electric Accent: `#00E5FF`
- Success: `#00FFB3`
- Danger: `#FF3D71`

**Design Elements:**
- Glassmorphism cards with `backdrop-filter: blur(15px)`
- 24px border radius for modern feel
- Layered radial gradients for depth
- Soft glowing borders
- Smooth transitions (250ms ease)

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Navigate to project directory**
   ```bash
   cd crorepati
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open in browser**
   ```
   http://127.0.0.1:5000
   ```

That's it! The game should now be running.

## 📁 Project Structure

```
crorepati/
│
├── app.py                 # Flask backend with game logic
├── questions.json         # 25 hard-level questions
├── requirements.txt       # Python dependencies
├── README.md             # This file
│
├── templates/
│   ├── index.html        # Welcome page
│   ├── game.html         # Game page with questions
│   └── result.html       # Result page
│
└── static/
    ├── style.css         # Midnight Aurora Gold theme
    └── script.js         # Frontend logic & animations
```

## 🎮 How to Play

1. **Start Game** - Click "START GAME" on the home page
2. **Read Question** - Carefully read the question displayed
3. **Select Option** - Click on one of the four options (A, B, C, D)
4. **Confirm Answer** - Click "CONFIRM ANSWER" button
5. **Watch Animation** - Enjoy confetti if correct, or shake if wrong
6. **Continue** - Move to next question or see results
7. **Quit Anytime** - Use "QUIT & TAKE MONEY" to exit with winnings

## 💰 Prize Ladder (25 Levels)

| Level | Prize Amount | Safe Level |
|-------|-------------|------------|
| 1     | ₹1,000      |            |
| 2     | ₹2,000      |            |
| 3     | ₹3,000      |            |
| 4     | ₹5,000      |            |
| 5     | ₹10,000     | 🛡️ Safe    |
| 6     | ₹20,000     |            |
| 7     | ₹40,000     |            |
| 8     | ₹80,000     |            |
| 9     | ₹1,60,000   |            |
| 10    | ₹3,20,000   | 🛡️ Safe    |
| 11    | ₹12,50,000  |            |
| 12    | ₹25,00,000  |            |
| 13    | ₹50,00,000  |            |
| 14    | ₹1,00,00,000| 🛡️ Safe    |
| 15-25 | Up to ₹10Cr |            |

## 🎯 Game Rules

1. **Answer 25 questions** correctly to win ₹10 Crore
2. **Each correct answer** moves you up the prize ladder
3. **Wrong answer** drops you to the last safe level
4. **Safe levels** guarantee your winnings (₹10K, ₹3.2L, ₹1Cr)
5. **Quit anytime** and take your current winnings
6. **Confirm before submit** - prevents accidental answers

## 🎨 Technical Highlights

### Backend (Flask)
- Clean routing structure
- Session-based state management
- AJAX endpoint for answer validation
- Question and option shuffling
- Safe level calculation logic

### Frontend (HTML/CSS/JS)
- Modern semantic HTML5
- CSS3 with glassmorphism effects
- Vanilla JavaScript (no frameworks)
- Canvas-confetti for celebrations
- Smooth CSS transitions and animations
- Fully responsive design

### Code Quality
- Well-commented code
- Modular structure
- Production-like organization
- Proper separation of concerns
- Professional naming conventions

## 🎭 Animations

### Correct Answer
- ✅ Confetti explosion (250+ particles)
- ✅ Screen glow flash effect
- ✅ Success color feedback
- ✅ 2-second celebration

### Wrong Answer
- ❌ Subtle shake animation
- ❌ Red color feedback
- ❌ No confetti
- ❌ Immediate submission

### Micro-interactions
- Button hover lift
- Option selection scale
- Glow sweep on buttons
- Smooth fade transitions
- Pulse effect on current level

## 📱 Responsive Design

- **Desktop (1024px+)** - Full sidebar layout
- **Tablet (768px-1024px)** - Stacked layout
- **Mobile (<768px)** - Single column, touch-optimized

## 🛠️ Technologies Used

- **Backend**: Python 3.7+, Flask 3.0.0
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Animation**: Canvas Confetti CDN
- **Font**: Google Fonts (Inter)
- **Data**: JSON
- **Session**: Flask Sessions

## 🎨 Design Philosophy

This project follows modern 2026 design trends:

- **Glassmorphism** - Semi-transparent surfaces with blur
- **Cinematic Lighting** - Layered gradients for depth
- **Micro-interactions** - Subtle feedback on every action
- **Strong Hierarchy** - Clear visual structure
- **Modern Typography** - Clean, readable fonts
- **Smooth Animations** - 250ms transitions everywhere
- **Premium Feel** - Startup-level polish

## 🚀 Production Considerations

For production deployment:

1. Change `app.secret_key` to a secure random string
2. Set `debug=False` in `app.run()`
3. Use a production WSGI server (gunicorn, uwsgi)
4. Add proper error handling
5. Implement rate limiting
6. Add analytics tracking
7. Optimize assets (minify CSS/JS)

## 📄 License

This project is created for educational and entertainment purposes.

## 🙏 Credits

- Inspired by Kaun Banega Crorepati (KBC)
- Design: Midnight Aurora Gold Theme
- Confetti: canvas-confetti library
- Font: Inter by Rasmus Andersson

---

**Built with ❤️ as a premium startup product**

Enjoy the game! Test your knowledge and become a Crorepati! 🎉
