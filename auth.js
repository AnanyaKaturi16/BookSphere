const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = {
            name: document.getElementById('signupName').value,
            email: document.getElementById('signupEmail').value,
            pass: document.getElementById('signupPass').value,
            genre: document.getElementById('favGenre')?.value || 'general',
            points: 1250, 
            level: 'Silver Reader',
            joinDate: new Date().toISOString(),
            exchanges: 0,
            sales: 0,
            booksListed: 0
        };

      
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        
        showNotification('🎉 Account Created Successfully! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;

        const storedUser = JSON.parse(localStorage.getItem('userData'));

        if (storedUser && storedUser.email === email && storedUser.pass === pass) {
          
            localStorage.setItem('isLoggedIn', 'true');

            showNotification('✅ Login Successful! Welcome back!', 'success');
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        } else {
            showNotification('❌ Invalid Email or Password!', 'error');
        }
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});


document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

function createParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particles.appendChild(particle);
    }
}

const style = document.createElement('style');
style.textContent = `
    .particle {
        position: fixed;
        width: 3px;
        height: 3px;
        background: linear-gradient(45deg, var(--primary), var(--accent));
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle 3s infinite;
        opacity: 0.3;
    }
    
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

if (document.querySelector('.particles')) {
    createParticles();
}
