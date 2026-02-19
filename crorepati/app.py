"""
Crorepati Quiz Game - Flask Backend
A premium quiz game with modern UI/UX
"""

from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import json
import random

app = Flask(__name__)
app.secret_key = 'crorepati-midnight-aurora-2026-secret-key'

# Prize ladder configuration (25 levels)
PRIZE_LADDER = [
    1000, 2000, 3000, 5000, 10000, 20000, 40000, 80000, 160000, 320000,
    1250000, 2500000, 5000000, 10000000, 20000000, 30000000, 40000000,
    50000000, 60000000, 70000000, 80000000, 90000000, 95000000, 98000000, 100000000
]

# Safe levels where winnings are guaranteed
SAFE_LEVELS = [10000, 320000, 10000000]


def load_questions():
    """Load questions from JSON file"""
    with open('questions.json', 'r', encoding='utf-8') as f:
        return json.load(f)


def shuffle_question_options(question):
    """Shuffle options and update correct answer index"""
    options = question['options']
    correct_idx = question['correct']
    
    # Create pairs of (option, is_correct)
    combined = list(zip(options, [i == correct_idx for i in range(len(options))]))
    random.shuffle(combined)
    
    # Update question with shuffled options
    question['options'] = [opt for opt, _ in combined]
    question['correct'] = [i for i, (_, is_correct) in enumerate(combined) if is_correct][0]
    
    return question


@app.route('/')
def index():
    """Home page - Welcome screen"""
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start_game():
    """Initialize new game session"""
    questions = load_questions()
    
    # Shuffle questions for randomness
    random.shuffle(questions)
    
    # Shuffle options for each question
    for q in questions:
        shuffle_question_options(q)
    
    # Store game state in session (use only 25 questions)
    session['questions'] = questions[:25]
    session['current_level'] = 0
    session['winnings'] = 0
    
    return redirect(url_for('game'))


@app.route('/game')
def game():
    """Display current question"""
    if 'questions' not in session:
        return redirect(url_for('index'))
    
    level = session['current_level']
    
    # Check if game is completed
    if level >= len(PRIZE_LADDER):
        return redirect(url_for('result', status='won'))
    
    question = session['questions'][level]
    prize = PRIZE_LADDER[level]
    
    return render_template('game.html', 
                         question=question, 
                         level=level, 
                         prize=prize,
                         prize_ladder=PRIZE_LADDER,
                         current_winnings=session['winnings'],
                         safe_levels=SAFE_LEVELS)


@app.route('/check_answer', methods=['POST'])
def check_answer():
    """Check if answer is correct (AJAX endpoint)"""
    if 'questions' not in session:
        return jsonify({'correct': False, 'error': 'Session expired'})
    
    level = session['current_level']
    selected = int(request.form.get('answer'))
    question = session['questions'][level]
    
    is_correct = (selected == question['correct'])
    
    return jsonify({'correct': is_correct})


@app.route('/answer', methods=['POST'])
def answer():
    """Process submitted answer and update game state"""
    if 'questions' not in session:
        return redirect(url_for('index'))
    
    level = session['current_level']
    selected = int(request.form.get('answer'))
    question = session['questions'][level]
    
    if selected == question['correct']:
        # Correct answer - update winnings and move to next level
        session['winnings'] = PRIZE_LADDER[level]
        session['current_level'] = level + 1
        
        # Check if all questions completed
        if session['current_level'] >= len(PRIZE_LADDER):
            return redirect(url_for('result', status='won'))
        
        return redirect(url_for('game'))
    else:
        # Wrong answer - drop to last safe level
        last_safe = 0
        for safe in SAFE_LEVELS:
            if session['winnings'] >= safe:
                last_safe = safe
        
        session['winnings'] = last_safe
        return redirect(url_for('result', status='lost'))


@app.route('/quit')
def quit_game():
    """Quit game and take current winnings"""
    return redirect(url_for('result', status='quit'))


@app.route('/result')
def result():
    """Show final result screen"""
    status = request.args.get('status', 'quit')
    winnings = session.get('winnings', 0)
    
    # Clear session
    session.clear()
    
    return render_template('result.html', status=status, winnings=winnings)


if __name__ == '__main__':
    app.run(debug=True)
