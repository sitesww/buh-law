document.addEventListener('DOMContentLoaded', () => {
    // 1. Управление мобильным меню (Бургер)
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // 2. Управление выпадающим списком "Сервисы" (Dropdown) на мобилках
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown > a');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            // Проверяем, что ширина экрана мобильная (до 768px)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Останавливаем переход по ссылке
                dropdown.classList.toggle('active'); // Открываем/закрываем вкладку
            }
        });
    }

    // 3. Обработка формы (CTA)
    const ctaForm = document.querySelector('.cta form');

    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const button = this.querySelector('button');
            const inputs = this.querySelectorAll('input');

            // Эффект исчезновения полей
            inputs.forEach(input => {
                input.style.transition = 'all 0.3s ease';
                input.style.opacity = '0';
                input.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    input.style.display = 'none';
                }, 300);
            });

            // Изменение кнопки после исчезновения полей
            setTimeout(() => {
                button.innerText = 'Заявка принята';
                button.style.background = '#10b981';
                button.style.width = '100%';
                button.disabled = true;
                button.classList.add('sent-success');
            }, 350);

            console.log('Форма успешно отправлена!');
        });
    }
});