/**
 * Crorepati Quiz Game - Frontend Logic
 * Handles option selection, answer confirmation, and animations
 */

// State management
let selectedOption = null;

// DOM elements
const optionsGrid = document.getElementById('optionsGrid');
const confirmBtn = document.getElementById('confirmBtn');
const answerForm = document.getElementById('answerForm');
const selectedAnswerInput = document.getElementById('selectedAnswer');
const questionCard = document.getElementById('questionCard');

/**
 * Initialize event listeners
 */
function init() {
    setupOptionListeners();
    setupConfirmListener();
}

/**
 * Setup click listeners for all option buttons
 */
function setupOptionListeners() {
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleOptionSelect(this);
        });
    });
}

/**
 * Handle option selection
 * @param {HTMLElement} selectedButton - The clicked option button
 */
function handleOptionSelect(selectedButton) {
    // Remove previous selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked option
    selectedButton.classList.add('selected');
    selectedOption = selectedButton.getAttribute('data-option');
    
    // Enable confirm button
    confirmBtn.disabled = false;
    
    // Add micro-interaction feedback
    selectedButton.style.transform = 'scale(1.02)';
    setTimeout(() => {
        selectedButton.style.transform = '';
    }, 200);
}

/**
 * Setup confirm button listener
 */
function setupConfirmListener() {
    confirmBtn.addEventListener('click', function() {
        if (selectedOption !== null) {
            handleConfirmAnswer();
        }
    });
}

/**
 * Handle answer confirmation
 * Checks answer via AJAX and shows appropriate animation
 */
async function handleConfirmAnswer() {
    // Disable all interactions
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'CHECKING...';
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    try {
        // Check if answer is correct via AJAX
        const response = await fetch('/check_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `answer=${selectedOption}`
        });
        
        const data = await response.json();
        
        if (data.correct) {
            // Answer is CORRECT
            await handleCorrectAnswer();
        } else {
            // Answer is WRONG
            await handleWrongAnswer();
        }
        
        // Submit the form
        selectedAnswerInput.value = selectedOption;
        answerForm.submit();
        
    } catch (error) {
        console.error('Error checking answer:', error);
        // On error, just submit the form
        selectedAnswerInput.value = selectedOption;
        answerForm.submit();
    }
}

/**
 * Handle correct answer animation
 * Shows confetti celebration
 */
async function handleCorrectAnswer() {
    // Add success visual feedback
    const selectedBtn = document.querySelector('.option-btn.selected');
    if (selectedBtn) {
        selectedBtn.style.borderColor = '#00FFB3';
        selectedBtn.style.background = 'linear-gradient(135deg, rgba(0, 255, 179, 0.3) 0%, rgba(0, 229, 255, 0.2) 100%)';
        selectedBtn.style.boxShadow = '0 0 40px rgba(0, 255, 179, 0.5)';
    }
    
    // Trigger confetti celebration
    triggerConfetti();
    
    // Add screen glow flash
    flashScreenGlow();
    
    // Wait for animation
    await sleep(2000);
}

/**
 * Handle wrong answer animation
 * Shows shake effect
 */
async function handleWrongAnswer() {
    // Add error visual feedback
    const selectedBtn = document.querySelector('.option-btn.selected');
    if (selectedBtn) {
        selectedBtn.style.borderColor = '#FF3D71';
        selectedBtn.style.background = 'linear-gradient(135deg, rgba(255, 61, 113, 0.3) 0%, rgba(255, 107, 157, 0.2) 100%)';
        selectedBtn.style.boxShadow = '0 0 40px rgba(255, 61, 113, 0.5)';
    }
    
    // Shake the question card
    questionCard.classList.add('shake');
    
    // Wait for animation
    await sleep(500);
    
    // Remove shake class
    questionCard.classList.remove('shake');
    
    // Wait a bit more before submitting
    await sleep(300);
}

/**
 * Trigger confetti celebration animation
 * Only called for correct answers
 */
function triggerConfetti() {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 9999 
    };
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        // Colorful glowing confetti from multiple points
        confetti({
            ...defaults,
            particleCount,
            origin: { 
                x: randomInRange(0.2, 0.8), 
                y: randomInRange(0.3, 0.7) 
            },
            colors: [
                '#FFD700', // Gold
                '#F5C518', // Gold Primary
                '#00FFB3', // Success
                '#00E5FF', // Electric Accent
                '#FF3D71', // Danger
                '#9C27B0', // Purple
                '#2196F3'  // Blue
            ]
        });
    }, 250);
}

/**
 * Flash screen glow effect for correct answer
 */
function flashScreenGlow() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'radial-gradient(circle, rgba(0, 255, 179, 0.2) 0%, transparent 70%)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(flash);
    
    // Fade in
    setTimeout(() => {
        flash.style.opacity = '1';
    }, 10);
    
    // Fade out and remove
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 300);
    }, 500);
}

/**
 * Sleep utility function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Add smooth fade transition when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    // Fade in animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 10);
});
