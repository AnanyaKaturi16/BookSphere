let currentUser = null;
let allBooks = [];
let userBooks = [];

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPage = window.location.pathname.split('/').pop();
    
    const protectedPages = ['home.html', 'exchange.html', 'rewards.html', 'profile.html', 'wishlist.html'];
    
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    loadUserData();
    
    if (currentPage === 'home.html') {
        initializeHomePage();
    } else if (currentPage === 'profile.html') {
        initializeProfilePage();
    }
});

function loadUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUIWithUserData();
    }
}

function updateUIWithUserData() {
    const navUserName = document.getElementById('navUserName');
    const userPointsDisplay = document.getElementById('userPointsDisplay');
    const typingName = document.getElementById('typingName');
    
    if (navUserName && currentUser) {
        navUserName.textContent = currentUser.name || 'User';
    }
    
    if (userPointsDisplay && currentUser) {
        userPointsDisplay.innerHTML = `🔥 ${currentUser.points || 0} pts`;
    }
    
    if (typingName && currentUser) {
        startTypingEffect(currentUser.name || 'Explorer');
    }
}

function startTypingEffect(name) {
    const target = document.getElementById('typingName');
    if (!target) return;
    
    target.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < name.length) {
            target.innerHTML += name.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
}

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
}

const books = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "tech",
        price: "Exchange",
        points: 50,
        condition: "Like New",
        owner: "Rahul K.",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400"
    },
    {
        id: 2,
        title: "GATE CSE 2026",
        author: "Made Easy",
        category: "academic",
        price: "₹450",
        points: 30,
        condition: "Good",
        owner: "Priya S.",
        rating: 4.5,
        img: "https://images.unsplash.com/photo-1497633762265-9d0f5d5f7b8c?w=400"
    },
    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        category: "selfdev",
        price: "Exchange",
        points: 40,
        condition: "Like New",
        owner: "Amit P.",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
    },
    {
        id: 4,
        title: "Introduction to Algorithms",
        author: "CLRS",
        category: "academic",
        price: "₹650",
        points: 60,
        condition: "Good",
        owner: "Neha M.",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400"
    },
    {
        id: 5,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "selfdev",
        price: "Exchange",
        points: 35,
        condition: "Like New",
        owner: "Vikram S.",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
    },
    {
        id: 6,
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        category: "tech",
        price: "₹399",
        points: 25,
        condition: "Acceptable",
        owner: "Sneha R.",
        rating: 4.3,
        img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400"
    }
];

function renderBooks(filter = 'all') {
    const grid = document.getElementById('bookGrid');
    if (!grid) return;

    let filteredBooks = books;
    if (filter !== 'all') {
        filteredBooks = books.filter(book => book.category === filter);
    }

    if (filteredBooks.length === 0) {
        grid.innerHTML = '<div class="no-books">No books found in this category</div>';
        return;
    }

    grid.innerHTML = filteredBooks.map(book => `
        <div class="book-card" data-id="${book.id}">
            <div class="book-badge">${book.condition}</div>
            <img src="${book.img}" alt="${book.title}" loading="lazy">
            <div class="book-info">
                <span class="book-category">${book.category}</span>
                <h3>${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-meta">
                    <span class="book-price">${book.price}</span>
                    <span class="book-points">🎯 ${book.points} pts</span>
                </div>
                <div class="book-owner">
                    <img src="https://randomuser.me/api/portraits/thumb/men/${book.id}.jpg" alt="Owner">
                    <span>${book.owner}</span>
                    <span class="owner-rating">⭐ ${book.rating}</span>
                </div>
                <div class="book-actions">
                    <button class="btn-action" onclick="claimBook(${book.id})">
                        <i class="fas fa-hand-holding-heart"></i> Claim
                    </button>
                    <button class="btn-wishlist" onclick="addToWishlist(${book.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterBooks(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderBooks(category);
}

function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('bookGrid');
    if (!grid) return;

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );

    if (filteredBooks.length === 0) {
        grid.innerHTML = '<div class="no-books">📚 No books found. Try a different search!</div>';
        return;
    }

    grid.innerHTML = filteredBooks.map(book => `
        <div class="book-card">
            <img src="${book.img}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="book-match">✨ ${book.price}</p>
            </div>
        </div>
    `).join('');
}

function claimBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        if (currentUser) {
            currentUser.points = (currentUser.points || 0) + book.points;
            localStorage.setItem('userData', JSON.stringify(currentUser));
            updateUIWithUserData();
        }
        
        showNotification(`✨ You claimed "${book.title}"! Earned ${book.points} points!`, 'success');
        updateCounters();
    }
}

function addToWishlist(bookId) {
    const book = books.find(b => b.id === bookId);
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.find(b => b.id === bookId)) {
        wishlist.push(book);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification(`❤️ Added "${book.title}" to wishlist!`, 'success');
    } else {
        showNotification('Book already in wishlist!', 'info');
    }
}

function updateCounters() {
    const reuseCount = document.getElementById('reuseCount');
    const treeCount = document.getElementById('treeCount');
    
    if (reuseCount) {
        let count = parseInt(reuseCount.textContent) || 247;
        reuseCount.textContent = count + 1;
    }
    
    if (treeCount) {
        let count = parseInt(treeCount.textContent) || 19;
        treeCount.textContent = (count + 0.1).toFixed(1);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showAddBookModal() {
    document.getElementById('addBookModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addBookModal').style.display = 'none';
}

function loadMoreBooks() {
    showNotification('📚 Loading more books...', 'info');
    setTimeout(() => {
        renderBooks();
    }, 1000);
}

function connectMatch(user) {
    showNotification(`🔗 Connection request sent to ${user}!`, 'success');
}

function initializeHomePage() {
    renderBooks();
    animateStats();
    
    setInterval(() => {
        updateLiveMarketplace();
    }, 30000);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-card h2');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

function updateLiveMarketplace() {
    const randomBook = Math.floor(Math.random() * books.length);
    showNotification(`📢 New book added: "${books[randomBook].title}"`, 'info');
}

function initializeProfilePage() {
    if (currentUser) {
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('addBookModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}