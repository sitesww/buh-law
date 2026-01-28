document.addEventListener('DOMContentLoaded', () => {
    // === 1. НАСТРОЙКИ ТЕЛЕГРАМ ===
    const TELEGRAM_TOKEN = '8070334767:AAGcSITrZjkImBKXnl73xRB7MCg4Q1M9Aog';
    const CHAT_ID = '1040123970';

    // === 2. ФУНКЦИЯ ВСПЛЫВАЮЩЕГО ОКНА (TOAST) ===
    function showToast(message, type = 'error') {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        toast.innerText = message;
        toast.className = `toast show ${type}`;
        
        // Скрываем через 3.5 секунды
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // === 3. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ===
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // === 4. ВЫПАДАЮЩИЙ СПИСОК "УСЛУГИ" ===
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

    // === 5. ОБРАБОТКА ФОРМЫ И ОТПРАВКА В ТГ ===
    const requestForm = document.getElementById('request-form');

    if (requestForm) {
        requestForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const btn = this.querySelector('button');
            const nameInput = document.getElementById('user_name');
            const phoneInput = document.getElementById('user_phone');
            const tgInput = document.getElementById('user_tg'); // Необязательное поле
            
            const nameValue = nameInput.value.trim();
            const phoneValue = phoneInput.value.trim();
            const tgValue = tgInput ? tgInput.value.trim() : '';

            // --- ВАЛИДАЦИЯ ---
            if (nameValue === '' || phoneValue === '') {
                showToast('Заполните обязательные поля');
                return;
            }

            const phoneRegex = /^[0-9+ ]+$/;
            if (!phoneRegex.test(phoneValue)) {
                showToast('В номере разрешены только цифры и "+"');
                phoneInput.style.border = '2px solid #ef4444';
                return;
            } else {
                phoneInput.style.border = ''; 
            }

            // --- ПОДГОТОВКА ОТПРАВКИ ---
            btn.innerText = 'Отправка...';
            btn.disabled = true;

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
                    showToast('Заявка успешно отправлена!', 'success');

                    // Плавное исчезновение инпутов
                    const inputs = this.querySelectorAll('input');
                    inputs.forEach(el => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(-10px)';
                        el.style.transition = 'all 0.4s ease';
                        setTimeout(() => el.style.display = 'none', 400);
                    });

                    // Замена заголовка
                    const box = this.closest('.cta-box') || this.closest('.cta-section');
                    if (box) {
                        const title = box.querySelector('h2');
                        const desc = box.querySelector('p');
                        if (desc) {
                    
                          desc.style.opacity = '0';
                            setTimeout(() => desc.style.display = 'none', 300);
                        }
                        if (title) title.innerText = 'Заявка принята!';
                    }


                    btn.innerText = 'Отправлено успешно';
                    btn.style.background = '#10b981'; 
                    btn.style.width = '100%';
                    btn.style.marginTop = '20px';
                } else {
                    throw new Error();
                }
            } catch (error) {
                showToast('Ошибка сети. Попробуйте позже');
                btn.innerText = 'Попробовать снова';
                btn.disabled = false;
            }
        });
    }
});