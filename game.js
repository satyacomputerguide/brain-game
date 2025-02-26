let score = 100;
let level = 1;
let timer;
let isGameRunning = false;

// Initialize game
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('mathAnswer').addEventListener('input', handleMathAnswer);

function startGame() {
    if(!isGameRunning) {
        isGameRunning = true;
        document.getElementById('startBtn').disabled = true;
        score = 100;
        level = 1;
        updateScore(0);
        startMathGame();
    }
}

function startMathGame() {
    const problemElement = document.getElementById('mathProblem');
    const answerInput = document.getElementById('mathAnswer');
    
    // Generate math problem
    const num1 = Math.floor(Math.random() * 10 * level);
    const num2 = Math.floor(Math.random() * 10 * level);
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    problemElement.textContent = `${num1} ${operator} ${num2} = ?`;
    answerInput.value = '';
    answerInput.focus();
    
    startTimer(20 - Math.floor(level/2));
}

function startTimer(duration) {
    clearInterval(timer);
    let timeLeft = duration;
    document.getElementById('mathTimer').textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('mathTimer').textContent = timeLeft;
        
        if(timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function handleMathAnswer() {
    const answer = parseInt(document.getElementById('mathAnswer').value);
    const problem = document.getElementById('mathProblem').textContent;
    const [num1, operator, num2] = problem.split(' ').filter(x => x !== '=' && x !== '?');
    
    let correctAnswer;
    switch(operator) {
        case '+': correctAnswer = parseInt(num1) + parseInt(num2); break;
        case '-': correctAnswer = parseInt(num1) - parseInt(num2); break;
        case '*': correctAnswer = parseInt(num1) * parseInt(num2); break;
    }
    
    if(answer === correctAnswer) {
        updateScore(20);
        level++;
        document.getElementById('level').textContent = level;
        startMathGame();
    }
}

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
    updateIQMeter();
}

function updateIQMeter() {
    const iqMeter = document.querySelector('.iq-meter');
    const iqScore = document.querySelector('.iq-score');
    const targetIQ = 100 + (level * 5) + (score / 10);
    
    iqScore.textContent = Math.floor(targetIQ);
    iqMeter.style.setProperty('--iq-percent', `${Math.min(targetIQ / 2, 100)}%`);
}

function endGame(success) {
    clearInterval(timer);
    alert(success ? `Level ${level} Complete!` : `Game Over! Final Score: ${score}`);
    resetGame();
}

function resetGame() {
    clearInterval(timer);
    isGameRunning = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('mathProblem').textContent = '';
    document.getElementById('mathAnswer').value = '';
    score = 100;
    level = 1;
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    updateIQMeter();
}
