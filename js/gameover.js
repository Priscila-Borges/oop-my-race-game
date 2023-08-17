const finalScore = localStorage.getItem('points');

const scoreContainer = document.getElementById('finalScore');
if (scoreContainer && finalScore) {
    scoreContainer.textContent = finalScore;
}