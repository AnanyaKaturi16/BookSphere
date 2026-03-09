let haveBooks = [];
let needBooks = [];

function addHaveBook() {
    const input = document.getElementById('haveBookInput');
    const book = input.value.trim();
    
    if (book && !haveBooks.includes(book)) {
        haveBooks.push(book);
        updateHaveBooks();
        input.value = '';
    }
}

function addNeedBook() {
    const input = document.getElementById('needBookInput');
    const book = input.value.trim();
    
    if (book && !needBooks.includes(book)) {
        needBooks.push(book);
        updateNeedBooks();
        input.value = '';
    }
}

function removeBook(element) {
    const bookText = element.parentElement.textContent.slice(0, -1); // Remove ×
    haveBooks = haveBooks.filter(b => b !== bookText);
    needBooks = needBooks.filter(b => b !== bookText);
    element.parentElement.remove();
}

function updateHaveBooks() {
    const container = document.getElementById('haveBooks');
    container.innerHTML = haveBooks.map(book => 
        `<div class="book-tag">${book} <i class="fas fa-times" onclick="removeBook(this)"></i></div>`
    ).join('');
}

function updateNeedBooks() {
    const container = document.getElementById('needBooks');
    container.innerHTML = needBooks.map(book => 
        `<div class="book-tag">${book} <i class="fas fa-times" onclick="removeBook(this)"></i></div>`
    ).join('');
}

function findMatches() {
    
    const results = document.getElementById('matchResults');
    
    if (haveBooks.length === 0 || needBooks.length === 0) {
        results.innerHTML = '<div class="no-books">Please add books to both lists</div>';
        return;
    }
    
  
    const mockMatches = [
        {
            user: 'Priya S.',
            has: 'Clean Code',
            needs: 'Design Patterns',
            distance: '0.5 km',
            rating: 4.8
        },
        {
            user: 'Amit P.',
            has: 'JavaScript: The Good Parts',
            needs: 'You Don\'t Know JS',
            distance: '1.2 km',
            rating: 4.9
        }
    ];
    
    results.innerHTML = `
        <h3>Found ${mockMatches.length} Matches!</h3>
        <div class="matches-grid">
            ${mockMatches.map(match => `
                <div class="match-card">
                    <div class="match-user">
                        <img src="https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg" alt="User">
                        <div>
                            <strong>${match.user}</strong>
                            <span class="match-rating">⭐ ${match.rating}</span>
                        </div>
                    </div>
                    <div class="match-books">
                        <span class="has-book">📚 Has: ${match.has}</span>
                        <span class="needs-book">📖 Needs: ${match.needs}</span>
                    </div>
                    <div class="match-footer">
                        <span class="match-distance">📍 ${match.distance}</span>
                        <button class="btn-small btn-primary" onclick="connectMatch('${match.user}')">
                            Connect
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function connectMatch(user) {
    showNotification(`✅ Connection request sent to ${user}!`, 'success');
}

document.getElementById('haveBookInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addHaveBook();
});

document.getElementById('needBookInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addNeedBook();
});