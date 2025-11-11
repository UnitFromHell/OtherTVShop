

ymaps.ready(function () {
    var map = new ymaps.Map("map", {
        center: [59.916360, 30.315691], 
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    });

    var placemark = new ymaps.Placemark([59.916360, 30.315691], {
        hintContent: 'TVShop',
        balloonContent: `
            <div class="p-4">
                <h3 class="font-bold text-lg text-gray-800 mb-2">TVShop</h3>
                <p class="text-gray-600 mb-2">ул. 1-я Красноармейская, д. 1/21</p>
                <p class="text-blue-600 font-semibold">"Качество, которое видно!"</p>
            </div>
        `
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiM2QjgyRkYiLz4KPHBhdGggZD0iTTIwIDhDMTMuMzcgOCA4IDEzLjM3IDggMjBDOCAyNi42MyAxMy4zNyAzMiAyMCAzMkMyNi42MyAzMiAzMiAyNi42MyAzMiAyMEMzMiAxMy4zNyAyNi42MyA4IDIwIDhaTTIwIDMwQzE0LjQ4IDMwIDEwIDI1LjUyIDEwIDIwQzEwIDE0LjQ4IDE0LjQ4IDEwIDIwIDEwQzI1LjUyIDEwIDMwIDE0LjQ4IDMwIDIwQzMwIDI1LjUyIDI1LjUyIDMwIDIwIDMwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIwIDE2QzE3Ljc5IDE2IDE2IDE3Ljc5IDE2IDIwQzE2IDIyLjIxIDE3Ljc5IDI0IDIwIDI0QzIyLjIxIDI0IDI0IDIyLjIxIDI0IDIwQzI0IDE3Ljc5IDIyLjIxIDE2IDIwIDE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
    });

    map.geoObjects.add(placemark);
    placemark.balloon.open();
});

function scrollToMap() {
    document.getElementById('map').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

function showSuccessMessage() {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-check-circle"></i>
            <span>Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
        background: #10B981;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.bg-white, .bg-gradient-to-r');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
