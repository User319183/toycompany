// Clean up homepage functionality
document.addEventListener("DOMContentLoaded", function () {
    // Set up smooth scrolling
    setupSmoothScrolling();

    // Add intersection observer to animate sections when they come into view
    const animatedSections = document.querySelectorAll('.featured-products, .craftsmanship-section, .testimonials-section, .cta-section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section-animation');
    });

    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('hover');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
        });
    });
});
