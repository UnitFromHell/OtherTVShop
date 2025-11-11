
document.getElementById('mobileMenuButton')?.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    ['successNotification', 'errorNotification'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => {
                el.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => el.remove(), 300);
            }, id === 'errorNotification' ? 7000 : 5000);
        }
    });
});

document.querySelector('.newsletter-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.querySelector('.newsletter-input').value;
    if (email) {
        showNotification('Спасибо за подписку! Проверьте вашу почту.', 'success');
        document.querySelector('.newsletter-input').value = '';
    }
});
