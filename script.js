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

