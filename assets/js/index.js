document.addEventListener('DOMContentLoaded', () => {
  console.log("Creazen Crafts script initialized...");

  // ---------------------------------------------
  // Mobile Navigation Drawer Toggle
  // ---------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenuWrapper = document.getElementById('navMenuWrapper');
  const navBackdrop = document.getElementById('navBackdrop');
  const dropdownLi = document.querySelector('.dropdown');

  function toggleMobileMenu() {
    const isOpen = navMenuWrapper.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileMenuBtn?.classList.add('active');
    navMenuWrapper?.classList.add('open');
    navBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenuBtn?.classList.remove('active');
    navMenuWrapper?.classList.remove('open');
    navBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Handle mobile accordion toggle for Category dropdown
  if (dropdownLi) {
    const categoryLink = dropdownLi.querySelector('.category');
    if (categoryLink) {
      categoryLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          dropdownLi.classList.toggle('active');
        }
      });
    }
  }

  // Close mobile drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenuWrapper?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ---------------------------------------------
  // Search Bar Functionality
  // ---------------------------------------------
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `./src/catagory.html?search=${encodeURIComponent(query)}`;
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
  }

  // ---------------------------------------------
  // Auth Pill Active State Handler
  // ---------------------------------------------
  const toggleLinks = document.querySelectorAll('.toggle-bar a');
  const currentPath = window.location.pathname;

  toggleLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.includes(linkPath)) {
      toggleLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }

    link.addEventListener('click', function() {
      toggleLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ---------------------------------------------
  // Hero Swiper Carousel Initialization
  // ---------------------------------------------
  if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      speed: 800,
    });
  }

  // ---------------------------------------------
  // Interactive Video Section Playback
  // ---------------------------------------------
  const videoWrappers = document.querySelectorAll('.video-wrapper');

  function pauseAllVideos() {
    videoWrappers.forEach((wrapper) => {
      const video = wrapper.querySelector('.video');
      if (video && !video.paused) {
        video.pause();
      }
    });
  }

  videoWrappers.forEach((wrapper) => {
    const video = wrapper.querySelector('.video');
    if (!video) return;

    // Hover effect for desktop
    wrapper.addEventListener('mouseenter', () => {
      pauseAllVideos();
      video.play().catch(err => console.log('Autoplay prevented:', err));
    });

    wrapper.addEventListener('mouseleave', () => {
      video.pause();
    });

    // Touch support for mobile devices
    wrapper.addEventListener('click', () => {
      if (video.paused) {
        pauseAllVideos();
        video.play().catch(err => console.log('Autoplay prevented:', err));
      } else {
        video.pause();
      }
    });
  });
});