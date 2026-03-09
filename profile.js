document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadUserBooks();
    loadReviews();
    loadHistory();
});

function loadProfile() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
        document.getElementById('profileName').textContent = user.name || 'User';
        document.getElementById('profileEmail').textContent = user.email || 'email@example.com';
        
        document.getElementById('totalExchanges').textContent = user.exchanges || 12;
        document.getElementById('totalSales').textContent = user.sales || 8;
        document.getElementById('totalBooks').textContent = user.booksListed || 20;
    }
}

function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tab + 'Tab').classList.add('active');
}

function loadUserBooks() {
    const grid = document.getElementById('userBooksGrid');
    const userBooks = [
        {
            title: 'Clean Code',
            author: 'Robert Martin',
            status: 'Available',
            img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'
        },
        {
            title: 'Design Patterns',
            author: 'GoF',
            status: 'Exchanged',
            img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'
        }
    ];
    
    grid.innerHTML = userBooks.map(book => `
        <div class="book-card">
            <img src="${book.img}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <span class="book-status ${book.status.toLowerCase()}">${book.status}</span>
            </div>
        </div>
    `).join('');
}

function loadReviews() {
    const list = document.getElementById('reviewsList');
    const reviews = [
        {
            user: 'Rahul K.',
            rating: 5,
            comment: 'Great exchange! Book was in perfect condition.',
            date: '2 days ago'
        },
        {
            user: 'Priya S.',
            rating: 4,
            comment: 'Smooth transaction. Would recommend!',
            date: '1 week ago'
        }
    ];
    
    list.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <strong>${review.user}</strong>
                <span class="review-rating">${'⭐'.repeat(review.rating)}</span>
            </div>
            <p>${review.comment}</p>
            <span class="review-date">${review.date}</span>
        </div>
    `).join('');
}

function loadHistory() {
    const list = document.getElementById('historyList');
    const history = [
        {
            type: 'exchange',
            book: 'Clean Code',
            with: 'Rahul K.',
            date: '2 days ago',
            points: 50
        },
        {
            type: 'sale',
            book: 'Design Patterns',
            price: '₹450',
            date: '1 week ago',
            points: 30
        }
    ];
    
    list.innerHTML = history.map(item => `
        <div class="history-card ${item.type}">
            <div class="history-icon">${item.type === 'exchange' ? '🔄' : '💰'}</div>
            <div class="history-details">
                <strong>${item.book}</strong>
                <p>With: ${item.with || 'N/A'}</p>
                <span>${item.date}</span>
            </div>
            <div class="history-points">
                +${item.points} pts
            </div>
        </div>
    `).join('');
}