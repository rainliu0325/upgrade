(function() {
        var navLinks = document.querySelectorAll('nav a:not(.cta-btn)');
        var pages = document.querySelectorAll('.page');
        var currentPage = 'home';
        var isTransitioning = false;

        window.showPage = function(pageId) {
            if (!pageId || currentPage === pageId || isTransitioning) return;

            isTransitioning = true;

            var currentPageEl = document.getElementById(currentPage);
            if (currentPageEl) {
                currentPageEl.classList.add('exit');
                setTimeout(function() {
                    currentPageEl.classList.remove('exit');
                    currentPageEl.style.display = 'none';
                }, 300);
            }

            setTimeout(function() {
                var target = document.getElementById(pageId);
                if (target) {
                    target.style.display = 'block';
                    target.classList.remove('active-page');
                    void target.offsetWidth;
                    target.classList.add('active-page');
                    currentPage = pageId;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                navLinks.forEach(function(link) {
                    link.parentElement.classList.remove('active-tab');
                    var href = link.getAttribute('href');
                    if (href === '#' + pageId) {
                        link.parentElement.classList.add('active-tab');
                    }
                });

                isTransitioning = false;
            }, 350);
        };

        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    var pageId = href.substring(1);
                    window.showPage(pageId);
                }
            });
        });

        pages.forEach(function(page) {
            if (!page.classList.contains('active-page')) {
                page.style.display = 'none';
            }
        });

        var hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            setTimeout(function() { window.showPage(hash); }, 100);
        }

        var accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(function(header) {
            header.addEventListener('click', function() {
                var currentItem = this.parentElement;
                var isOpen = currentItem.classList.contains('active');
                
                document.querySelectorAll('.accordion-item').forEach(function(item) {
                    item.classList.remove('active');
                    var btn = item.querySelector('.accordion-header');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                });
                
                if (!isOpen) {
                    currentItem.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    })();

    function openNav() {
        document.getElementById("fullscreenNav").style.height = "100%";
    }
    
    function closeNav() {
        document.getElementById("fullscreenNav").style.height = "0%";
    }

    var slideIndex = 0;
    var holder = document.querySelector('.home-slider-holder');

    function showSlide(i) {
        if (holder) {
            var slides = document.querySelectorAll('.home-slide');
            if (i >= slides.length) slideIndex = 0;
            if (i < 0) slideIndex = slides.length - 1;
            holder.style.transform = 'translateX(-' + (slideIndex * 100) + '%)';
        }
    }

    function slideLeft() {
        slideIndex--;
        showSlide(slideIndex);
    }

    function slideRight() {
        slideIndex++;
        showSlide(slideIndex);
    }

    var autoSlide = setInterval(slideRight, 5000);

    var slider = document.querySelector('.home-slider');
    if (slider) {
        slider.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });
        slider.addEventListener('mouseleave', function() {
            autoSlide = setInterval(slideRight, 5000);
        });
    }

    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#FFB7C5"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.7,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#FF6B8B",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 300,
                    "line_linked": {
                        "opacity": 0.4
                    }
                },
                "bubble": {
                    "distance": 150,
                    "size": 8,
                    "duration": 0.4,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 150,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
