// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const authButtons = document.querySelector('.auth-buttons');
  const testimonialControls = document.querySelectorAll('.testimonial-control');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const statNumbers = document.querySelectorAll('.stat-number');

  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.style.padding = '10px 0';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '20px 0';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Testimonial slider
  testimonialControls.forEach(control => {
    control.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      
      // Update active control
      testimonialControls.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      // Update active slide
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      testimonialSlides[index].classList.add('active');
    });
  });

  // Auto-rotate testimonials
  let currentTestimonial = 0;
  const testimonialInterval = setInterval(function() {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    testimonialControls.forEach(c => c.classList.remove('active'));
    testimonialControls[currentTestimonial].classList.add('active');
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialSlides[currentTestimonial].classList.add('active');
  }, 5000);

  // Animated stat counters
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100; // Adjust speed by changing divisor
    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 20);
  };

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate stats when they come into view
        if (entry.target.classList.contains('stat-container')) {
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateCounter(stat, target);
          });
        }
        
        // Add animation classes to feature cards
        if (entry.target.classList.contains('feature-cards')) {
          const cards = entry.target.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-in');
            }, index * 100);
          });
        }
      }
    });
  }, { threshold: 0.2 });

  // Observe elements
  observer.observe(document.querySelector('.stat-container'));
  observer.observe(document.querySelector('.feature-cards'));

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .testimonial-content, .cta-content, .cta-image');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('fade-in');
      }
    });
  };

  // Initial call and scroll event listener
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Smooth scrolling for navigation links
  const smoothScroll = (e) => {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      if (targetId === '#') return;
      
      const targetPosition = document.querySelector(targetId).offsetTop;
      window.scrollTo({
        top: targetPosition - 80,
        behavior: 'smooth'
      });
    }
  };

  // Add event listener to nav links
  document.querySelector('.nav-links').addEventListener('click', smoothScroll);

  // Button hover effects
  const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .feature-link');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(5px)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(0)';
      }
    });
  });
});
