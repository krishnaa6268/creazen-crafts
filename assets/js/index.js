console.log("Hello Creazen Crafts...");

// ------------Search-Button----------
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const dropdown = document.querySelector('.dropdown');

  // Handle search button click
  searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
          console.log(`Searching for: ${query}`);
          // Add your search logic here (e.g., API call, redirect, etc.)
      } else {
          console.log('Please enter a search query.');
      }
  });

  // Handle Enter key press in the input field
  searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          searchButton.click();
      }
  });

  // Handle dropdown click (for demo purposes, just logging)
  dropdown.addEventListener('click', () => {
      console.log('Dropdown clicked! Add your dropdown logic here.');
      // You can add logic to show/hide a dropdown menu here
  });
});


// ------------toogle-button-------------------
// JavaScript to toggle the active state without preventing navigation

const toggleLinks = document.querySelectorAll('.toggle-bar a');

// Check the current URL to set the active state on page load
const currentPath = window.location.pathname;
toggleLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath)) {
        toggleLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }

    // Add click event to update active state before navigation
    link.addEventListener('click', function() {
        toggleLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        // Navigation happens naturally via the href
    });
});


// ------------Drop-------------------------------







//-----------swipper--------------
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });