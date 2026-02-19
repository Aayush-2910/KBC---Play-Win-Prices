# 🚀 Quick Start Guide

## Run in 3 Simple Steps

### Step 1: Install Dependencies
```bash
cd crorepati
pip install -r requirements.txt
```

### Step 2: Start Server
```bash
python app.py
```

### Step 3: Open Browser
```
http://127.0.0.1:5000
```

## Expected Output

You should see:
```
* Serving Flask app 'app'
* Debug mode: on
* Running on http://127.0.0.1:5000
```

## What You'll See

1. **Home Page** - Premium welcome screen with game rules
2. **Game Page** - Modern quiz interface with glassmorphism
3. **Result Page** - Celebration or result screen

## Key Features to Try

✅ Select an option and see the gold highlight
✅ Click "CONFIRM ANSWER" to submit
✅ Watch confetti animation on correct answers
✅ See shake animation on wrong answers
✅ Check the glowing prize ladder
✅ Try the "QUIT & TAKE MONEY" option

## Troubleshooting

### Port Already in Use?
Edit `app.py` line 119:
```python
app.run(debug=True, port=5001)
```

### Flask Not Installed?
```bash
pip install Flask
```

### Questions Not Loading?
Ensure `questions.json` is in the same directory as `app.py`

---

**Enjoy the premium quiz experience! 🎮**
