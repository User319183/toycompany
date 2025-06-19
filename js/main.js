/**
 * Main Script for Little Bird Toys Website
 * This script handles general website functionality including animations,
 * UI effects, and interactive components.
 */

/**
 * Displays a toast notification to the user
 * @param {string} title - The title/header of the toast notification
 * @param {string} message - The message body to display in the toast
 */
function showToast(title, message) {
	// Check if toast container exists, create one if not
	let toastContainer = document.querySelector(".toast-container");
	if (!toastContainer) {
		toastContainer = document.createElement("div");
		toastContainer.className =
			"toast-container position-fixed bottom-0 end-0 p-3";
		document.body.appendChild(toastContainer);
	}

	// Generate unique ID for the toast element
	const toastId = "toast-" + Date.now();

	// Create toast HTML structure using template literals
	const toastHTML = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

	// Add the toast HTML to the container
	toastContainer.innerHTML += toastHTML;

	// Get the new toast element and initialize Bootstrap toast
	const toastElement = document.getElementById(toastId);
	const toast = new bootstrap.Toast(toastElement, {
		autohide: true,
		delay: 5000,
	});

	// Display the toast
	toast.show();
}

/**
 * Sets up smooth scrolling behavior for anchor links
 * Enables clicking on navigation links to smoothly scroll to page sections
 */
function setupSmoothScrolling() {
	// Select all anchor links that point to internal page elements
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		// Add click event listener to each anchor
		anchor.addEventListener("click", function (e) {
			// Prevent default link behavior
			e.preventDefault();

			// Get the target element ID from the href attribute
			const targetId = this.getAttribute("href");

			// Skip empty links (href="#")
			if (targetId === "#") {
				return;
			}

			// Find the target element in the document
			const targetElement = document.querySelector(targetId);

			// If target exists, scroll to it with offset for the navbar
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 70, // Offset to account for fixed navbar
					behavior: "smooth", // Enable smooth scrolling animation
				});
			}
		});
	});
}

/**
 * Initializes parallax scrolling effect for elements with the parallax-element class
 * Creates a visual effect where elements move at different speeds while scrolling
 */
function initParallax() {
	// Add scroll event listener to create parallax effect
	window.addEventListener('scroll', function () {
		// Select all elements with parallax-element class
		const parallaxElements = document.querySelectorAll('.parallax-element');
		// Get current scroll position
		let scrollPosition = window.pageYOffset;

		// Apply transform to each parallax element based on scroll position
		parallaxElements.forEach(element => {
			// Get custom speed from data attribute or use default
			const speed = element.dataset.speed || 0.5;
			// Apply vertical translation based on scroll position and speed
			element.style.transform = `translateY(${scrollPosition * speed}px)`;
		});
	});
}

/**
 * Initializes animated number counters
 * Counts up numbers when the counter elements come into view
 */
function initCounters() {
	// Select all elements with the counter class
	const counterElements = document.querySelectorAll('.counter');
	// Configuration for the Intersection Observer
	const options = {
		threshold: 0.7 // Element must be 70% visible before triggering
	};

	// Create Intersection Observer to detect when counter elements are visible
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			// When a counter element becomes visible
			if (entry.isIntersecting) {
				const target = entry.target;
				// Get the target value from data attribute
				const countTo = parseInt(target.dataset.count);
				let count = 0;

				// Set interval to increment the counter
				const interval = setInterval(() => {
					// Update the counter text
					target.innerText = count;
					// Check if we've reached the target value
					if (count >= countTo) {
						clearInterval(interval);
					}
					// Calculate increment amount (faster for larger numbers)
					count += Math.ceil(countTo / 20);
					// Ensure we don't exceed the target
					if (count > countTo) count = countTo;
				}, 50);

				// Stop observing this element once animation has started
				observer.unobserve(target);
			}
		});
	}, options);

	// Start observing all counter elements
	counterElements.forEach(counter => {
		observer.observe(counter);
	});
}

/**
 * Transforms a static reviews container into a Bootstrap carousel
 * Groups review cards together and adds carousel navigation controls
 */
function initReviewCarousel() {
	// Find the reviews container
	const reviewsContainer = document.getElementById('reviews-container');
	// Exit if container doesn't exist in current page
	if (!reviewsContainer) return;

	// Add Bootstrap carousel classes to the container
	reviewsContainer.classList.add('carousel', 'slide');
	reviewsContainer.setAttribute('data-bs-ride', 'carousel');
	reviewsContainer.id = 'reviewCarousel';

	// Get all review cards and prepare for carousel conversion
	const reviewCards = Array.from(reviewsContainer.children);
	const carouselInner = document.createElement('div');
	carouselInner.className = 'carousel-inner';

	// Group cards into pairs for carousel slides
	for (let i = 0; i < reviewCards.length; i += 2) {
		// Create carousel item (slide)
		const carouselItem = document.createElement('div');
		carouselItem.className = 'carousel-item';
		// Make first slide active
		if (i === 0) carouselItem.classList.add('active');

		// Create row for layout
		const row = document.createElement('div');
		row.className = 'row justify-content-center';

		// Add first card in current pair
		row.appendChild(reviewCards[i]);
		// Add second card if it exists
		if (reviewCards[i + 1]) {
			row.appendChild(reviewCards[i + 1]);
		}

		// Add row to carousel item and carousel item to inner container
		carouselItem.appendChild(row);
		carouselInner.appendChild(carouselItem);
	}

	// Clear original container and add carousel structure
	reviewsContainer.innerHTML = '';
	reviewsContainer.appendChild(carouselInner);

	// Create previous slide control button
	const prevButton = document.createElement('button');
	prevButton.className = 'carousel-control-prev';
	prevButton.type = 'button';
	prevButton.dataset.bsTarget = '#reviewCarousel';
	prevButton.dataset.bsSlide = 'prev';
	prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

	// Create next slide control button
	const nextButton = document.createElement('button');
	nextButton.className = 'carousel-control-next';
	nextButton.type = 'button';
	nextButton.dataset.bsTarget = '#reviewCarousel';
	nextButton.dataset.bsSlide = 'next';
	nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

	// Add control buttons to carousel
	reviewsContainer.appendChild(prevButton);
	reviewsContainer.appendChild(nextButton);
}

/**
 * Adds scroll effect to the navbar
 * Changes navbar appearance when user scrolls down the page
 */
function initNavbarScroll() {
	// Find the navbar element
	const navbar = document.querySelector('.navbar');
	// Exit if navbar doesn't exist
	if (!navbar) return;

	// Add scroll event listener to monitor page scrolling
	window.addEventListener('scroll', function () {
		// Add 'scrolled' class when page is scrolled down beyond 50px
		if (window.scrollY > 50) {
			navbar.classList.add('scrolled');
		} else {
			// Remove class when back at the top
			navbar.classList.remove('scrolled');
		}
	});
}

/**
 * Main initialization function that runs when the DOM is fully loaded
 * Sets up all interactive features and animations
 */
document.addEventListener("DOMContentLoaded", function () {
	// Initialize all main UI components
	setupSmoothScrolling();
	initParallax();
	initCounters();
	initReviewCarousel();
	initNavbarScroll();

	// Select elements to reveal on scroll
	const revealElements = document.querySelectorAll(
		".featured-products, .about-brief, .customer-reviews"
	);

	/**
	 * Function to check and reveal elements when they enter the viewport
	 */
	const revealOnScroll = function () {
		for (let i = 0; i < revealElements.length; i++) {
			// Calculate element position relative to viewport
			let elementTop = revealElements[i].getBoundingClientRect().top;
			let windowHeight = window.innerHeight;

			// Add reveal class when element is visible
			if (elementTop < windowHeight - 100) {
				revealElements[i].classList.add("revealed");
			}
		}
	};

	// Create and inject CSS for scroll reveal animations
	const style = document.createElement("style");
	style.textContent = `
        .featured-products, .about-brief, .customer-reviews {
            opacity: 0;
            transform: translateY(30px);
            transition: all 1s ease;
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
	document.head.appendChild(style);

	// Setup scroll listener for reveal animation and trigger once for elements already in view
	window.addEventListener("scroll", revealOnScroll);
	revealOnScroll();

	// Initialize hover effects for product images
	const productImages = document.querySelectorAll('.product-card img');
	productImages.forEach(img => {
		// Add scale and rotate effect on mouse over
		img.addEventListener('mouseover', function () {
			this.style.transform = 'scale(1.05) rotate(2deg)';
		});
		// Reset transform on mouse out
		img.addEventListener('mouseout', function () {
			this.style.transform = 'scale(1)';
		});
	});
});

/**
 * About Page Specific Animations
 * These functions only run on the about page
 */
document.addEventListener('DOMContentLoaded', function () {
	// Check if current page is the about page
	if (window.location.pathname.includes('about.html')) {
		// Select elements to animate
		const animateElements = document.querySelectorAll('.timeline-item, .team-member, .mission-card, .gallery-item');

		// Create Intersection Observer to detect when elements come into view
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				// Add animation class when element is visible
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-fadeInUp');
					// Stop observing once animation is applied
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 }); // Element must be 20% visible before triggering

		// Start observing all animation elements
		animateElements.forEach(element => {
			observer.observe(element);
		});

		// Setup smooth scrolling for about page anchor links
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				// Prevent default link behavior
				e.preventDefault();

				// Get target element ID and find in document
				const targetId = this.getAttribute('href');
				const targetElement = document.querySelector(targetId);

				// Scroll to target element with offset
				if (targetElement) {
					window.scrollTo({
						top: targetElement.offsetTop - 100, // Offset for navbar
						behavior: 'smooth' // Smooth scrolling animation
					});
				}
			});
		});
	}
});
