// This file handles special effects and animations for the homepage

// Wait for the webpage to fully load before running any code
document.addEventListener("DOMContentLoaded", function () {
    // The DOMContentLoaded event fires when the HTML document is fully loaded
    // This ensures we don't try to work with elements that aren't loaded yet

    // Call the smooth scrolling setup function defined in main.js
    setupSmoothScrolling();
    // This makes the page scroll smoothly when clicking navigation links
    // The function is defined in main.js and imported automatically

    // Find all the sections we want to animate when scrolling
    const animatedSections = document.querySelectorAll('.featured-products, .craftsmanship-section, .testimonials-section, .cta-section');
    // querySelectorAll finds all elements that match the CSS selectors (multiple sections)
    // The comma lets us select multiple types of sections at once
    // This stores all matching sections in the animatedSections variable

    // Create a special observer that watches for elements coming into the viewport
    const sectionObserver = new IntersectionObserver((entries) => {
        // IntersectionObserver is a built-in JavaScript tool that watches when elements become visible
        // It runs the function we provide when elements enter or exit the viewport (visible area)
        // The (entries) => { ... } is an arrow function that receives entries (observed elements)

        // Process each element that the observer is tracking
        entries.forEach(entry => {
            // For each entry (element) being observed, run this function
            // The forEach loop goes through each item in the entries array

            // Check if the element is currently visible on screen
            if (entry.isIntersecting) {
                // isIntersecting is true when the element is visible in the viewport

                // Add the 'visible' class to the element to trigger its animation
                entry.target.classList.add('visible');
                // entry.target is the HTML element being observed
                // classList.add adds a CSS class that will start the animation

                // Stop watching this element since we only want to animate it once
                sectionObserver.unobserve(entry.target);
                // unobserve tells the observer to stop watching this specific element
                // This prevents the animation from happening again if user scrolls back up
            }
        });
    }, {
        // Configuration options for the observer
        threshold: 0.2
        // threshold: 0.2 means "trigger when 20% of the element is visible"
        // This makes the animation start a bit before the element is fully in view
    });

    // Set up each section to be animated
    animatedSections.forEach(section => {
        // Loop through each section we found earlier and set it up for animation

        // Tell the observer to start watching this section
        sectionObserver.observe(section);
        // This registers each section with our IntersectionObserver
        // When the section comes into view, the observer will trigger

        // Add the base animation class that sets the initial hidden state
        section.classList.add('section-animation');
        // This class makes elements start invisible and move up
        // When the 'visible' class is added later, it will animate in
    });

    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    // Find all elements with the class 'product-card'
    // These are the product cards displayed on the homepage

    productCards.forEach(card => {
        // For each product card we found, set up hover effects

        // Add event listener for when mouse enters the card
        card.addEventListener('mouseenter', function () {
            // When the mouse moves over a card, run this function

            this.classList.add('hover');
            // 'this' refers to the card that was hovered
            // Add the 'hover' class which triggers CSS effects
        });

        // Add event listener for when mouse leaves the card
        card.addEventListener('mouseleave', function () {
            // When the mouse leaves a card, run this function

            this.classList.remove('hover');
            // Remove the 'hover' class to revert to normal appearance
            // This returns the card to its original state
        });
    });

    // The closing bracket and parenthesis below end the DOMContentLoaded event handler
});
