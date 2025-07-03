document.addEventListener('DOMContentLoaded', function() {
  // 1. Animation des particules (fond dynamique) - Version plus performante
  const particlesEl = document.getElementById('particles-js');
  if (particlesEl) {
    try {
      particlesJS('particles-js', {
        particles: {
          number: { 
            value: 80, 
            density: { 
              enable: true, 
              value_area: 1000 
            } 
          },
          color: { 
            value: ["#6e45e2", "#88d3ce", "#ff7e5f"] 
          },
          shape: { 
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: { 
            value: 0.7, 
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: { 
            value: 4, 
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: { 
            enable: true, 
            distance: 150, 
            color: "#6e45e2", 
            opacity: 0.3, 
            width: 1 
          },
          move: { 
            enable: true, 
            speed: 2.5, 
            direction: "none", 
            random: true, 
            straight: false, 
            out_mode: "bounce",
            bounce: true,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: { 
              enable: true, 
              mode: "bubble" 
            },
            onclick: { 
              enable: true, 
              mode: "push" 
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    } catch (e) {
      console.error("Erreur lors du chargement des particules:", e);
    }
  }

  // 2. Animation de texte (effet machine à écrire) avec options étendues
  const typingElements = document.querySelectorAll('.typing-effect');
  if (typingElements.length) {
    typingElements.forEach(el => {
      try {
        new Typed(el, {
          strings: el.dataset.typedItems ? 
                   JSON.parse(el.dataset.typedItems) : 
                   ["nouvelle génération", "sécurisées", "intelligentes", "rapides"],
          typeSpeed: 40,
          backSpeed: 25,
          loop: true,
          showCursor: true,
          cursorChar: '|',
          smartBackspace: true,
          backDelay: 1500,
          startDelay: 500,
          fadeOut: false,
          shuffle: false
        });
      } catch (e) {
        console.error("Erreur Typed.js:", e);
      }
    });
  }

  // 3. Effet de scroll sur la navbar - version optimisée
  const navbar = document.querySelector('.glass-nav');
  if (navbar) {
    let lastScroll = 0;
    const scrollHandler = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll <= 0) {
        navbar.classList.remove('scrolled', 'scrolled-down');
        return;
      }
      
      if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.classList.add('scrolled', 'scrolled-down');
      } else if (currentScroll < lastScroll) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('scrolled-down');
      }
      
      lastScroll = currentScroll;
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  // 4. Menu mobile amélioré avec accessibilité
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    const toggleMenu = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Gestion du défilement
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
    
    // Touche ESC pour fermer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  }

  // 5. Animation des liens de navigation - version CSS transition
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    item.style.transition = 'transform 0.3s ease';
    
    const icon = item.querySelector('i');
    const text = item.querySelector('span');
    
    if (icon && text) {
      icon.style.transition = 'transform 0.3s ease';
      text.style.transition = 'transform 0.3s ease';
      
      item.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-3px)';
        text.style.transform = 'translateX(5px)';
      });
      
      item.addEventListener('mouseleave', () => {
        icon.style.transform = '';
        text.style.transform = '';
      });
    }
  });

  // 6. Animation au scroll avec IntersectionObserver (plus performant)
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      elements.forEach(el => observer.observe(el));
    } else {
      // Fallback pour les anciens navigateurs
      const scrollHandler = () => {
        elements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const isVisible = (rect.top <= window.innerHeight * 0.75);
          
          if (isVisible) {
            element.classList.add('animated');
          }
        });
      };
      
      window.addEventListener('scroll', scrollHandler);
      scrollHandler(); // Vérifier les éléments visibles au chargement
    }
  };

  // Initialisation
  animateOnScroll();
});

// Optimisation des performances
window.addEventListener('load', function() {
  // Retarder le chargement des éléments non critiques
  const lazyLoad = () => {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  };
  
  lazyLoad();
});