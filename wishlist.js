document.addEventListener('DOMContentLoaded', function() {
    loadWishlist();
});

function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const grid = document.getElementById('wishlistGrid');
    
    if (wishlist.length === 0) {
        grid.innerHTML = `
            <div class="no-books">
                <h3>Your wishlist is empty</h3>
                <p>Start adding books you want to read!</p>
                <button class="btn-primary" onclick="location.href='home.html'">
                    Browse Books
                </button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = wishlist.map(book => `
        <div class="book-card">
            <img src="${book.img}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <div class="book-actions">
                    <button class="btn-action" onclick="removeFromWishlist(${book.id})">
                        Remove
                    </button>
                    <button class="btn-primary" onclick="claimBook(${book.id})">
                        Claim Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function removeFromWishlist(bookId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(book => book.id !== bookId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
    showNotification('Book removed from wishlist', 'info');
}