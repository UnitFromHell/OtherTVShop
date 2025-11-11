
async function addToCart(productId) {
    try {
        console.log("Добавление товара:", productId);

        const formData = new FormData();
        formData.append('id', productId);

        const response = await fetch('/Cart/Add', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin' 
        });

        const result = await response.json();
        console.log("Ответ от сервера:", result);

        if (result.success) {
            showNotification(result.message || 'Товар добавлен в корзину', 'success');
            updateCartCount(result.cartCount ?? (parseInt(getCartCount()) + 1));
        } else {
            showNotification(result.message || 'Ошибка при добавлении в корзину', 'error');
        }
    } catch (error) {
        console.error("Ошибка при добавлении:", error);
        showNotification('Ошибка при добавлении в корзину', 'error');
    }
}


function updateCartCount(count) {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    cartCount.textContent = count;
    if (count > 0) {
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
}

function getCartCount() {
    const el = document.getElementById('cartCount');
    return el ? parseInt(el.textContent || '0') : 0;
}

function showNotification(message, type = 'success') {
    document.querySelectorAll('.custom-notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `custom-notification fixed top-6 right-6 z-[10000] text-white font-semibold shadow-2xl px-6 py-4 rounded-2xl text-base`;
    notification.style.background = type === 'success' ? '#10B981' : '#EF4444';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/Cart/GetCount', { credentials: 'same-origin' });
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                updateCartCount(data.count);
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки количества товаров:', error);
    }
});

async function updateQuantity(productId, quantity) {
    try {
        const formData = new FormData();
        formData.append('id', productId);
        formData.append('quantity', quantity);

        const response = await fetch('/Cart/UpdateQuantity', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });

        const result = await response.json();
        if (result.success) {
            location.reload();
        } else {
            showNotification('Ошибка при изменении количества', 'error');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Ошибка при обновлении количества', 'error');
    }
}

async function removeFromCart(productId) {
    try {
        const formData = new FormData();
        formData.append('id', productId);

        const response = await fetch('/Cart/Remove', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });

        const result = await response.json();
        if (result.success) {
            showNotification('Товар удалён из корзины');
            setTimeout(() => location.reload(), 1000);
        } else {
            showNotification('Ошибка при удалении товара', 'error');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Ошибка при удалении товара', 'error');
    }
}

async function clearCart() {
    if (!confirm('Вы уверены, что хотите очистить корзину?')) return;

    try {
        const response = await fetch('/Cart/Clear', {
            method: 'POST',
            credentials: 'same-origin'
        });

        const result = await response.json();
        if (result.success) {
            showNotification('Корзина очищена');
            setTimeout(() => location.reload(), 1000);
        } else {
            showNotification('Ошибка при очистке корзины', 'error');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Ошибка при очистке корзины', 'error');
    }
}

async function checkout() {
    try {
        const response = await fetch('/Cart/Checkout', {
            method: 'POST',
            credentials: 'same-origin'
        });

        const result = await response.json();
        if (result.success) {
            showNotification('Заказ успешно оформлен!');
            setTimeout(() => (window.location.href = '/'), 1500);
        } else {
            showNotification(result.message || 'Ошибка при оформлении', 'error');
        }
    } catch (error) {
        console.error('Ошибка при оформлении:', error);
        showNotification('Ошибка при оформлении заказа', 'error');
    }
}
