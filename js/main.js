document.addEventListener('DOMContentLoaded', () => {
    // === 1. НАСТРОЙКИ ТЕЛЕГРАМ ===
    const TELEGRAM_TOKEN = '8070334767:AAGcSITrZjkImBKXnl73xRB7MCg4Q1M9Aog';
    const CHAT_ID = '1040123970';

    // === 2. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ===
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // === 3. ВЫПАДАЮЩИЙ СПИСОК "УСЛУГИ" (DROPDOWN) ===
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown > a') || document.querySelector('.dropdown-toggle');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }

    // === 4. ОБРАБОТКА ФОРМЫ И ОТПРАВКА В ТЕЛЕГРАМ ===
    const requestForm = document.getElementById('request-form');

    if (requestForm) {
        requestForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const btn = this.querySelector('button');
            const nameInput = document.getElementById('user_name');
            const phoneInput = document.getElementById('user_phone');
            const tgInput = document.getElementById('user_tg'); // Новое поле
            
            const nameValue = nameInput.value.trim();
            const phoneValue = phoneInput.value.trim();
            const tgValue = tgInput ? tgInput.value.trim() : ''; // Берем значение ТГ

            // --- ВАЛИДАЦИЯ ---
            
            if (nameValue === '' || phoneValue === '') {
                alert('Пожалуйста, заполните обязательные поля');
                return;
            }

            const phoneRegex = /^[0-9+ ]+$/;
            if (!phoneRegex.test(phoneValue)) {
                alert('Ошибка: в номере телефона разрешены только цифры и знак "+"');
                phoneInput.style.border = '2px solid #ef4444';
                return;
            } else {
                phoneInput.style.border = ''; 
            }

            // --- ПРОЦЕСС ОТПРАВКИ ---
            btn.innerText = 'Отправка...';
            btn.disabled = true;

            // Формируем текст сообщения. Если ТГ пуст, пишем "Не указан"
            const displayTg = tgValue || 'Не указан';
            const message = `🚀 Новая заявка!\n👤 Имя: ${nameValue}\n📞 Телефон: ${phoneValue}\n✈️ Telegram: ${displayTg}`;

            try {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message
                    })
                });

                if (response.ok) {
                    // Эффект успеха: скрываем ВСЕ инпуты в форме
                    const inputs = this.querySelectorAll('input');
                    inputs.forEach(el => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(-10px)';
                        el.style.transition = 'all 0.4s ease';
                        setTimeout(() => el.style.display = 'none', 400);
                    });

                    // Поиск карточки для смены заголовка
                    const box = this.closest('.cta-box') || this.closest('.cta-section') || this.closest('.cta-card');
                    if (box) {
                        const title = box.querySelector('h2');
                        const desc = box.querySelector('p');
                        if (desc) {
                            desc.style.transition = 'opacity 0.3s';
                            desc.style.opacity = '0';
                            setTimeout(() => { desc.style.display = 'none'; }, 300);
                        }
                        if (title) title.innerText = 'Заявка принята!';
                    }

                    // Финальное состояние кнопки
                    btn.innerText = 'Отправлено успешно';
                    btn.style.background = '#10b981'; 
                    btn.style.width = '100%';
                    btn.style.marginTop = '20px';
                } else {
                    throw new Error('Сервер Telegram не ответил');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка при отправке. Проверьте интернет.');
                btn.innerText = 'Попробовать снова';
                btn.disabled = false;
            }
        });
    }
});