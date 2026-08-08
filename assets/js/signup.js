// ---------------------------------------------
// Creazen Crafts - Signup Form Logic
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || document.getElementById('email')?.value.split('@')[0] || 'Artisan Guest';
      const email = document.getElementById('email')?.value.trim();
      const password = document.getElementById('password')?.value;

      if (!email || !password) {
        if (window.CreazenCart) {
          window.CreazenCart.showToast('Please fill out all required fields.', 'warning');
        }
        return;
      }

      if (window.CreazenAuth) {
        const result = window.CreazenAuth.signup(name, email, password);
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
