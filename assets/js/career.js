// ---------------------------------------------
// Creazen Crafts - Career & Work With Us JS
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const jobForm = document.getElementById('jobForm');

  if (jobForm) {
    jobForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName')?.value || 'Applicant';

      if (window.CreazenCart) {
        window.CreazenCart.showToast(`Thank you, ${name}! Your job application has been received. 🚀`, 'success');
      }

      jobForm.reset();
    });
  }
});
