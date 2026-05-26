document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // 2. Dynamic Header on Scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  // Run on load to set initial state
  handleScroll();

  // 3. Mobile Menu Toggle
  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    if (navList.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', toggleMobileMenu);

  // 4. Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // 5. IntersectionObserver for Scroll Animations (Scroll Reveal)
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, revealOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => revealObserver.observe(element));

  // 6. Active Nav Link on Scroll
  const activeNavOptions = {
    threshold: 0.3,
    rootMargin: '-20% 0px -60% 0px'
  };

  const activeNavObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, activeNavOptions);

  sections.forEach(section => activeNavObserver.observe(section));
});
