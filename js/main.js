const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});
document.addEventListener('DOMContentLoaded', () => {
  const ctaForm = document.querySelector('.cta form');

  if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Чтобы страница не перезагружалась

      const btn = this.querySelector('button');
      const inputs = this.querySelectorAll('input');

      // 1. Скрываем все поля ввода
      inputs.forEach(input => {
        input.style.display = 'none';
      });

      // 2. Меняем кнопку
      btn.innerText = 'Отправлено!';
      btn.classList.add('sent-success');
      btn.disabled = true; // Чтобы не нажимали дважды

      // Здесь в будущем можно добавить отправку данных на почту или в Telegram
      console.log('Форма успешно отправлена!');
    });
  }
});
const form = document.querySelector('.cta form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Плавное исчезновение инпутов
    const inputs = this.querySelectorAll('input');
    const button = this.querySelector('button');
    
    inputs.forEach(input => {
      input.style.opacity = '0';
      input.style.transform = 'translateY(-10px)';
      setTimeout(() => input.style.display = 'none', 300);
    });

    // Изменение кнопки
    setTimeout(() => {
      button.innerText = 'Заявка принята';
      button.style.background = '#10b981'; // Изящный зеленый
      button.style.width = '100%';
      button.disabled = true;
    }, 350);
  });
}