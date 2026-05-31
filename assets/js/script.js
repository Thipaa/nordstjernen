// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenus = document.querySelectorAll('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenus.forEach(menu => {
        menu.classList.toggle('active');
    });
    hamburger.classList.toggle('active');
});

// Dropdown — click toggle on mobile only
const navDropdownToggle = document.querySelector('.nav-dropdown-toggle');
const navItemDropdown = document.querySelector('.nav-item-dropdown');

if (navDropdownToggle && navItemDropdown) {
    navDropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            navItemDropdown.classList.toggle('active');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (link.classList.contains('nav-dropdown-toggle') && window.innerWidth <= 768) {
            return;
        }
        navMenus.forEach(menu => menu.classList.remove('active'));
        hamburger.classList.remove('active');
        if (navItemDropdown) navItemDropdown.classList.remove('active');
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

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePositions();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
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

    // Add click handlers to navigation arrows
    const galleryLeftArrow = document.querySelector('.gallery-arrow-left');
    const galleryRightArrow = document.querySelector('.gallery-arrow-right');

    if (galleryLeftArrow) {
        galleryLeftArrow.addEventListener('click', prevSlide);
    }

    if (galleryRightArrow) {
        galleryRightArrow.addEventListener('click', nextSlide);
    }

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

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only handle arrow keys if gallery is in viewport
        const gallerySection = document.querySelector('.gallery-section');
        if (!gallerySection) return;

        const rect = gallerySection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isInViewport) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
}

// Content Gallery (simple fading slider used on subpages)
document.querySelectorAll('.content-gallery').forEach(gallery => {
    const gSlides = gallery.querySelectorAll('.content-gallery-slide');
    const gDots = gallery.querySelectorAll('.content-gallery-dot');
    const gViewport = gallery.querySelector('.content-gallery-viewport');
    if (!gSlides.length) return;

    let gIndex = 0;
    function showGallerySlide(i) {
        gIndex = (i + gSlides.length) % gSlides.length;
        gSlides.forEach((s, n) => s.classList.toggle('active', n === gIndex));
        gDots.forEach((d, n) => d.classList.toggle('active', n === gIndex));
    }

    // Click anywhere on the image (or the arrow, which bubbles up here) advances.
    if (gViewport) gViewport.addEventListener('click', () => showGallerySlide(gIndex + 1));
    // Dots jump to a specific slide without also triggering the advance above.
    gDots.forEach((dot, n) => dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showGallerySlide(n);
    }));
    showGallerySlide(0);
});

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

// ============================================================
// AI Chat Widget
// ============================================================

const AI_API_URL = 'http://localhost:3001/api/chat';

const chatWidget = document.getElementById('chatWidget');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatPanel = document.getElementById('chatPanel');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

let chatHistory = []; // { role: 'user'|'assistant', content: string }
let isChatOpen = false;
let isLoading = false;

function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWidget.classList.toggle('open', isChatOpen);
    if (isChatOpen) {
        chatInput.focus();
        scrollChatToBottom();
    }
}

if (chatToggleBtn && chatCloseBtn && chatInput && chatSendBtn) {
    chatToggleBtn.addEventListener('click', toggleChat);
    chatCloseBtn.addEventListener('click', toggleChat);

    // Auto-resize textarea as user types
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });

    // Send on Enter (Shift+Enter for newline)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    chatSendBtn.addEventListener('click', sendMessage);
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendMessage(role, text) {
    const el = document.createElement('div');
    el.classList.add('chat-message', role);
    el.textContent = text;
    chatMessages.appendChild(el);
    scrollChatToBottom();
    return el;
}

function showTypingIndicator(label = 'Thinking…') {
    const el = document.createElement('div');
    el.classList.add('chat-typing');
    el.id = 'chatTyping';
    el.innerHTML = `
        <div class="chat-typing-dots">
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
        </div>
        <span class="chat-typing-label">${label}</span>
    `;
    chatMessages.appendChild(el);
    scrollChatToBottom();
}

function updateTypingLabel(label) {
    const el = document.getElementById('chatTyping');
    if (el) {
        el.querySelector('.chat-typing-label').textContent = label;
    }
}

function removeTypingIndicator() {
    const el = document.getElementById('chatTyping');
    if (el) el.remove();
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isLoading) return;

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Show user message
    appendMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    isLoading = true;
    chatSendBtn.disabled = true;
    showTypingIndicator('Thinking…');

    let assistantText = '';
    const assistantEl = document.createElement('div');
    assistantEl.classList.add('chat-message', 'assistant');
    let assistantAdded = false;

    try {
        const response = await fetch(AI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: chatHistory }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop(); // keep incomplete line

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const raw = line.slice(6).trim();
                if (!raw) continue;

                let event;
                try { event = JSON.parse(raw); } catch { continue; }

                if (event.type === 'tool_call') {
                    updateTypingLabel(`Using tool: ${event.name.replace(/_/g, ' ')}…`);
                } else if (event.type === 'text') {
                    removeTypingIndicator();
                    assistantText += event.text;

                    if (!assistantAdded) {
                        chatMessages.appendChild(assistantEl);
                        assistantAdded = true;
                    }
                    assistantEl.textContent = assistantText;
                    scrollChatToBottom();
                } else if (event.type === 'done') {
                    removeTypingIndicator();
                } else if (event.type === 'error') {
                    throw new Error(event.message);
                }
            }
        }
    } catch (err) {
        removeTypingIndicator();
        console.error('Chat error:', err);
        const isNetworkError = err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('NetworkError');
        const errorText = isNetworkError
            ? 'Could not connect to the AI server. Please make sure the server is running (see README).'
            : `Sorry, something went wrong: ${err.message}`;
        appendMessage('assistant', errorText);
        assistantText = errorText;
    }

    if (assistantText) {
        chatHistory.push({ role: 'assistant', content: assistantText });
    }

    isLoading = false;
    chatSendBtn.disabled = false;
    chatInput.focus();
}

