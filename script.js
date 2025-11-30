// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenus = document.querySelectorAll('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenus.forEach(menu => {
        menu.classList.toggle('active');
    });
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenus.forEach(menu => {
            menu.classList.remove('active');
        });
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to next section function
function scrollToNext() {
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
    });
}

// Navbar scroll effect - removed box-shadow changes since design specifies no shadow

// Gallery Slider Functionality
let currentSlide = 1; // Start with second image (index 1)
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.pagination-dot');
const totalSlides = slides.length;

function updateSlidePositions() {
    // Remove all position classes
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });
    
    // Set active slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    
    // Set previous slide (left side)
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    if (slides[prevIndex]) {
        slides[prevIndex].classList.add('prev');
    }
    
    // Set next slide (right side)
    const nextIndex = (currentSlide + 1) % totalSlides;
    if (slides[nextIndex]) {
        slides[nextIndex].classList.add('next');
    }
    
    // Update pagination dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function showSlide(index) {
    currentSlide = index;
    updateSlidePositions();
}

function rotateToSlide(clickedIndex) {
    // Calculate rotation direction
    if (clickedIndex === currentSlide) return;
    
    // If clicking left side (prev), rotate left
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    if (clickedIndex === prevIndex) {
        currentSlide = clickedIndex;
    }
    // If clicking right side (next), rotate right
    else {
        const nextIndex = (currentSlide + 1) % totalSlides;
        if (clickedIndex === nextIndex) {
            currentSlide = clickedIndex;
        }
        // Direct click on a specific slide
        else {
            currentSlide = clickedIndex;
        }
    }
    
    updateSlidePositions();
}

// Initialize slider
if (slides.length > 0) {
    showSlide(1); // Start with second image (index 1)
    
    // Add click handlers to pagination dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Add click handlers to slides (for clicking on side images)
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (!slide.classList.contains('active')) {
                rotateToSlide(index);
            }
        });
    });
}

// Reviews Slider Functionality
let currentReview = 0;
const reviewSlides = document.querySelectorAll('.review-slide');
const reviewImageSlides = document.querySelectorAll('.review-image-slide');
const reviewDots = document.querySelectorAll('.review-dot');
const totalReviews = reviewSlides.length;

function showReview(index) {
    // Remove active class from all review slides and images
    reviewSlides.forEach(slide => slide.classList.remove('active'));
    reviewImageSlides.forEach(slide => slide.classList.remove('active'));
    reviewDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current review
    if (reviewSlides[index]) {
        reviewSlides[index].classList.add('active');
    }
    if (reviewImageSlides[index]) {
        reviewImageSlides[index].classList.add('active');
    }
    if (reviewDots[index]) {
        reviewDots[index].classList.add('active');
    }
    
    currentReview = index;
}

function nextReview() {
    const nextIndex = (currentReview + 1) % totalReviews;
    showReview(nextIndex);
}

function prevReview() {
    const prevIndex = (currentReview - 1 + totalReviews) % totalReviews;
    showReview(prevIndex);
}

// Initialize reviews slider
if (reviewSlides.length > 0) {
    showReview(0);
    
    // Add click handlers to navigation arrows
    const leftArrow = document.querySelector('.slider-arrow-left');
    const rightArrow = document.querySelector('.slider-arrow-right');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', prevReview);
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', nextReview);
    }
    
    // Add click handlers to pagination dots
    reviewDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showReview(index);
        });
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    // Initially hide the button
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.pointerEvents = 'none';
    scrollToTopBtn.style.transition = 'opacity 0.3s ease';
}

