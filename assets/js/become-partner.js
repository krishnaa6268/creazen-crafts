// ---------------------------------------------
// Creazen Crafts - Become a Partner / Seller JS
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const partnerForm = document.getElementById('jobForm') || document.getElementById('partnerForm');

  if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName')?.value || 'Artisan Partner';
      const email = document.getElementById('email')?.value;

      if (window.CreazenCart) {
        window.CreazenCart.showToast(`Thank you, ${name}! Your partner application has been submitted. 🎉`, 'success');
      }

      partnerForm.reset();

      // Show success modal if exists
      const successModal = document.getElementById('partnerSuccessModal');
      if (successModal) {
        successModal.classList.add('active');
      }
    });
  }
});
