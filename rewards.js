document.addEventListener('DOMContentLoaded', function() {
    loadUserPoints();
});

function loadUserPoints() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
        document.getElementById('totalPoints').textContent = user.points || 1250;
        
        document.getElementById('exchangePoints').textContent = Math.floor((user.points || 1250) * 0.4);
        document.getElementById('salePoints').textContent = Math.floor((user.points || 1250) * 0.35);
        document.getElementById('bonusPoints').textContent = Math.floor((user.points || 1250) * 0.25);
    }
}

function redeemReward(points, reward) {
    const user = JSON.parse(localStorage.getItem('userData'));
    
    if (user && user.points >= points) {
        user.points -= points;
        localStorage.setItem('userData', JSON.stringify(user));
        
        showNotification(`🎉 Successfully redeemed: ${reward}!`, 'success');
        loadUserPoints();
        updatePointsDisplay();
    } else {
        showNotification('❌ Not enough points!', 'error');
    }
}

function updatePointsDisplay() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const pointsDisplay = document.getElementById('userPointsDisplay');
    if (pointsDisplay && user) {
        pointsDisplay.innerHTML = `🔥 ${user.points} pts`;
    }
}