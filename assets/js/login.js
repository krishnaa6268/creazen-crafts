// ---------------------------------------------
// Creazen Crafts - Login Form Logic
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email')?.value.trim();
      const password = document.getElementById('password')?.value;

      if (!email || !password) {
        if (window.CreazenCart) {
          window.CreazenCart.showToast('Please enter both email and password.', 'warning');
        }
        return;
      }

      if (window.CreazenAuth) {
        const result = window.CreazenAuth.login(email, password);
        if (result.success) {
          setTimeout(() => {
            window.location.href = '../index.html';
          }, 800);
        } else {
          if (window.CreazenCart) {
            window.CreazenCart.showToast(result.message, 'error');
          } else {
            alert(result.message);
          }
        }
      }
    });
  }
});
