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
	// This function creates a pop-up notification (toast) that appears temporarily at the bottom of the screen
	// It takes two parameters: title (the heading of the notification) and message (the main content)

	// Check if toast container exists, create one if not
	let toastContainer = document.querySelector(".toast-container");
	// This line searches the page for an element with class="toast-container" to hold our notifications
	// querySelector looks for the first matching element on the page - just like CSS selectors

	if (!toastContainer) {
		// If no container is found (returns null), this if statement runs
		// The ! symbol means "not" - so this code runs if toastContainer is null (doesn't exist)

		toastContainer = document.createElement("div");
		// Create a new <div> element to be our toast container
		// createElement makes a new HTML element that we can customize

		toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
		// Set classes for styling and positioning the container
		// position-fixed makes it stick to the screen, bottom-0 and end-0 put it at the bottom right corner
		// p-3 adds padding (Bootstrap class)

		document.body.appendChild(toastContainer);
		// Add the new container to the body of the webpage
		// appendChild puts the new element inside the body element at the end
	}

	// Generate unique ID for the toast element
	const toastId = "toast-" + Date.now();
	// Create a unique ID by adding the current timestamp (in milliseconds) to "toast-"
	// Date.now() returns the current time in milliseconds since January 1, 1970
	// This ensures each toast has a different ID, even if created at similar times

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
	// This creates the HTML structure for our toast notification using a template literal (backticks)
	// ${toastId} inserts the unique ID we created
	// ${title} inserts the title parameter into the header
	// ${message} inserts the message parameter into the body
	// The HTML includes Bootstrap classes for styling and a close button

	// Add the toast HTML to the container
	toastContainer.innerHTML += toastHTML;
	// This adds our new toast HTML to the container we found or created earlier
	// += means "add to existing content" rather than replacing it
	// This allows multiple toast notifications to exist at the same time

	// Get the new toast element and initialize Bootstrap toast
	const toastElement = document.getElementById(toastId);
	// Find the toast element we just created using the unique ID
	// getElementById looks up HTML elements by their id attribute

	const toast = new bootstrap.Toast(toastElement, {
		autohide: true,  // Toast will automatically disappear
		delay: 5000,     // Toast will stay visible for 5000 milliseconds (5 seconds)
	});
	// This creates a new Bootstrap Toast object with our element
	// Bootstrap is a framework that provides pre-made components
	// The options object configures how the toast behaves

	// Display the toast
	toast.show();
	// This makes the toast notification appear on the screen
	// The show() method is provided by Bootstrap's Toast component
}

/**
 * Sets up smooth scrolling behavior for anchor links
 * Enables clicking on navigation links to smoothly scroll to page sections
 */
function setupSmoothScrolling() {
	// This function makes links that point to page sections scroll smoothly
	// Without this, clicking such links would make the page jump instantly

	// Select all anchor links that point to internal page elements
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		// Find all <a> tags whose href attribute starts with # (internal page links)
		// The ^ symbol means "starts with" in this selector
		// forEach runs the function for each link we found

		// Add click event listener to each anchor
		anchor.addEventListener("click", function (e) {
			// This adds code that runs whenever one of these links is clicked
			// e is the event object that contains information about the click

			// Prevent default link behavior
			e.preventDefault();
			// This stops the browser's normal link behavior (jumping to the location)
			// preventDefault() cancels the default action of the event

			// Get the target element ID from the href attribute
			const targetId = this.getAttribute("href");
			// Get the href value from the link that was clicked
			// this refers to the specific anchor element that was clicked
			// This will be something like "#about-section" or "#contact"

			// Skip empty links (href="#")
			if (targetId === "#") {
				// Check if the href is just "#" with nothing after it
				return;
				// If it's an empty link, exit the function and do nothing
			}

			// Find the target element in the document
			const targetElement = document.querySelector(targetId);
			// Look for the element that the link points to
			// querySelector searches using the ID we got from the href

			// If target exists, scroll to it with offset for the navbar
			if (targetElement) {
				// Only proceed if the target element was found
				window.scrollTo({
					// scrollTo moves the viewport to a specific position
					top: targetElement.offsetTop - 70, // Offset to account for fixed navbar
					// Calculate the position: element's top position minus 70 pixels
					// The -70 creates space for the fixed navigation bar at the top

					behavior: "smooth", // Enable smooth scrolling animation
					// This makes the page scroll smoothly instead of jumping instantly
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
	// This function creates the parallax effect - when elements move at different speeds while scrolling
	// Parallax effects create depth and make the page more visually interesting

	// Add scroll event listener to create parallax effect
	window.addEventListener('scroll', function () {
		// This sets up a function that runs every time the user scrolls the page
		// 'scroll' is the event we're listening for

		// Select all elements with parallax-element class
		const parallaxElements = document.querySelectorAll('.parallax-element');
		// Find all HTML elements that have the class "parallax-element"
		// These are the elements we want to move as the user scrolls

		// Get current scroll position
		let scrollPosition = window.pageYOffset;
		// pageYOffset tells us how far the user has scrolled from the top of the page
		// This value increases as the user scrolls down

		// Apply transform to each parallax element based on scroll position
		parallaxElements.forEach(element => {
			// For each parallax element we found, do the following:

			// Get custom speed from data attribute or use default
			const speed = element.dataset.speed || 0.5;
			// Look for a data-speed attribute on the element (like data-speed="0.3")
			// If it doesn't exist, use 0.5 as the default speed
			// || means "or" - use the first value if it exists, otherwise use the second value

			// Apply vertical translation based on scroll position and speed
			element.style.transform = `translateY(${scrollPosition * speed}px)`;
			// Change the CSS transform property to move the element vertically
			// scrollPosition * speed calculates how far to move based on scroll distance
			// Elements with higher speed values will move more than those with lower values
			// This creates the illusion of depth as you scroll
		});
	});
}

/**
 * Initializes animated number counters
 * Counts up numbers when the counter elements come into view
 */
function initCounters() {
	// This function creates animated number counters that count up when they come into view
	// For example, showing "15 Years of Experience" with the number counting from 0 to 15

	// Select all elements with the counter class
	const counterElements = document.querySelectorAll('.counter');
	// Find all HTML elements with the class "counter"
	// These are the elements containing numbers we want to animate

	// Configuration for the Intersection Observer
	const options = {
		threshold: 0.7 // Element must be 70% visible before triggering
		// threshold: 0.7 means the counter will start when 70% of it is visible on screen
		// This prevents the animation from starting too early as the user scrolls
	};

	// Create Intersection Observer to detect when counter elements are visible
	const observer = new IntersectionObserver((entries) => {
		// Create a new observer that watches our counter elements
		// IntersectionObserver is a JavaScript tool that can tell when elements are visible
		// The function inside runs whenever visibility of watched elements changes

		entries.forEach(entry => {
			// For each element the observer is tracking

			// When a counter element becomes visible
			if (entry.isIntersecting) {
				// isIntersecting is true when the element is visible in the viewport

				const target = entry.target;
				// target is the specific element that became visible

				// Get the target value from data attribute
				const countTo = parseInt(target.dataset.count);
				// Read the data-count attribute to know what number to count up to
				// parseInt converts the attribute value to an integer

				let count = 0;
				// Start counting from zero

				// Set interval to increment the counter
				const interval = setInterval(() => {
					// setInterval repeatedly runs the code inside at regular intervals
					// The arrow function => { } contains the code to run each time

					// Update the counter text
					target.innerText = count;
					// Change the text displayed in the element to the current count

					// Check if we've reached the target value
					if (count >= countTo) {
						clearInterval(interval);
						// If we've reached or passed the target, stop the interval
						// clearInterval stops the repeating code from running
					}

					// Calculate increment amount (faster for larger numbers)
					count += Math.ceil(countTo / 20);
					// Increment count by 1/20th of the total (rounded up)
					// This makes the counter animation smoother and appropriately fast
					// Math.ceil rounds up to the next integer

					// Ensure we don't exceed the target
					if (count > countTo) count = countTo;
					// If our increment would go past the target value, just set it to the target
				}, 50);
				// 50 is the interval in milliseconds (50ms = 0.05 seconds)
				// This means the function runs about 20 times per second

				// Stop observing this element once animation has started
				observer.unobserve(target);
				// Tell the observer to stop watching this element
				// This prevents the counter from restarting if it goes out of view and back
			}
		});
	}, options);
	// Pass the options we defined earlier to the observer

	// Start observing all counter elements
	counterElements.forEach(counter => {
		// For each counter element we found earlier
		observer.observe(counter);
		// Tell the observer to start watching this counter
		// This begins the observation of when the element comes into view
	});
}

/**
 * Transforms a static reviews container into a Bootstrap carousel
 * Groups review cards together and adds carousel navigation controls
 */
function initReviewCarousel() {
	// This function turns a static list of reviews into an interactive slideshow (carousel)
	// Carousels let users click through multiple slides of content

	// Find the reviews container
	const reviewsContainer = document.getElementById('reviews-container');
	// Look for an element with id="reviews-container" that holds our review cards

	// Exit if container doesn't exist in current page
	if (!reviewsContainer) return;
	// If we can't find the container, exit the function early
	// This prevents errors if this script runs on a page without reviews

	// Add Bootstrap carousel classes to the container
	reviewsContainer.classList.add('carousel', 'slide');
	// Add the CSS classes 'carousel' and 'slide' to the container
	// These Bootstrap classes provide the basic carousel styling and functionality

	reviewsContainer.setAttribute('data-bs-ride', 'carousel');
	// Add a data attribute that configures how the carousel behaves
	// data-bs-ride="carousel" enables automatic sliding (if desired)

	reviewsContainer.id = 'reviewCarousel';
	// Set a specific ID for the carousel so we can target it with controls
	// This replaces any existing ID on the container

	// Get all review cards and prepare for carousel conversion
	const reviewCards = Array.from(reviewsContainer.children);
	// Get all the child elements inside the reviews container
	// Array.from converts the HTMLCollection into a regular array we can work with more easily

	const carouselInner = document.createElement('div');
	// Create a new div element that will contain the carousel slides

	carouselInner.className = 'carousel-inner';
	// Add the class 'carousel-inner' which is required by Bootstrap carousels
	// This div will hold all the individual slides

	// Group cards into pairs for carousel slides
	for (let i = 0; i < reviewCards.length; i += 2) {
		// Loop through the review cards, incrementing by 2 each time
		// This lets us put 2 review cards in each carousel slide
		// i += 2 means we increase i by 2 on each loop iteration

		// Create carousel item (slide)
		const carouselItem = document.createElement('div');
		// Create a new div element for the current slide

		carouselItem.className = 'carousel-item';
		// Add the class 'carousel-item' which Bootstrap uses for each slide

		// Make first slide active
		if (i === 0) carouselItem.classList.add('active');
		// Add the 'active' class only to the first slide (when i is 0)
		// In Bootstrap carousels, the active slide is the one initially displayed

		// Create row for layout
		const row = document.createElement('div');
		// Create another div to hold the cards in a row layout

		row.className = 'row justify-content-center';
		// Add Bootstrap row class and center the content horizontally

		// Add first card in current pair
		row.appendChild(reviewCards[i]);
		// Add the current review card to our row
		// appendChild moves the element (it doesn't copy it)

		// Add second card if it exists
		if (reviewCards[i + 1]) {
			// Check if there is another card to make a pair
			// This prevents errors for odd numbers of cards
			row.appendChild(reviewCards[i + 1]);
			// Add the next review card to our row if it exists
		}

		// Add row to carousel item and carousel item to inner container
		carouselItem.appendChild(row);
		// Put the row of cards inside the carousel slide

		carouselInner.appendChild(carouselItem);
		// Add this slide to the carousel inner container
	}

	// Clear original container and add carousel structure
	reviewsContainer.innerHTML = '';
	// Clear out all existing content in the reviews container
	// innerHTML = '' removes all the HTML inside the element

	reviewsContainer.appendChild(carouselInner);
	// Add our new carousel inner container with all the slides to the main container

	// Create previous slide control button
	const prevButton = document.createElement('button');
	// Create a new button element for the "previous" control

	prevButton.className = 'carousel-control-prev';
	// Add the Bootstrap class for previous button styling

	prevButton.type = 'button';
	// Set the button type attribute

	prevButton.dataset.bsTarget = '#reviewCarousel';
	// Set the data-bs-target attribute to point to our carousel ID
	// This tells the button which carousel to control

	prevButton.dataset.bsSlide = 'prev';
	// Set the data-bs-slide attribute to 'prev' to go to previous slide
	// This tells Bootstrap what action to take when clicked

	prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';
	// Add the HTML content for the button, including the arrow icon
	// visually-hidden text is for screen readers (accessibility)

	// Create next slide control button
	const nextButton = document.createElement('button');
	// Create a new button element for the "next" control

	nextButton.className = 'carousel-control-next';
	// Add the Bootstrap class for next button styling

	nextButton.type = 'button';
	// Set the button type attribute

	nextButton.dataset.bsTarget = '#reviewCarousel';
	// Set the data-bs-target attribute to point to our carousel ID
	// This tells the button which carousel to control

	nextButton.dataset.bsSlide = 'next';
	// Set the data-bs-slide attribute to 'next' to go to next slide
	// This tells Bootstrap what action to take when clicked

	nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';
	// Add the HTML content for the button, including the arrow icon
	// visually-hidden text is for screen readers (accessibility)

	// Add control buttons to carousel
	reviewsContainer.appendChild(prevButton);
	// Add the previous button to the carousel container

	reviewsContainer.appendChild(nextButton);
	// Add the next button to the carousel container
}

/**
 * Adds scroll effect to the navbar
 * Changes navbar appearance when user scrolls down the page
 */
function initNavbarScroll() {
	// This function changes how the navigation bar looks when scrolling down the page
	// Typically it makes the navbar more compact or changes its color/transparency

	// Find the navbar element
	const navbar = document.querySelector('.navbar');
	// Look for the first element with class="navbar"

	// Exit if navbar doesn't exist
	if (!navbar) return;
	// If we can't find the navbar, exit the function to avoid errors

	// Add scroll event listener to monitor page scrolling
	window.addEventListener('scroll', function () {
		// This sets up a function that runs every time the user scrolls the page

		// Add 'scrolled' class when page is scrolled down beyond 50px
		if (window.scrollY > 50) {
			// window.scrollY is how many pixels the page has been scrolled vertically
			// Check if the user has scrolled more than 50 pixels down

			navbar.classList.add('scrolled');
			// If scrolled down enough, add the 'scrolled' class to the navbar
			// CSS can target this class to change the navbar's appearance
		} else {
			// Remove class when back at the top
			navbar.classList.remove('scrolled');
			// If user has scrolled back to top (or less than 50px down),
			// remove the 'scrolled' class to restore the original appearance
		}
	});
}

/**
 * Main initialization function that runs when the DOM is fully loaded
 * Sets up all interactive features and animations
 */
document.addEventListener("DOMContentLoaded", function () {
	// This event listener waits for the HTML document to be fully loaded before running our code
	// DOMContentLoaded fires when the HTML is completely loaded and parsed
	// This ensures all HTML elements are available before our JavaScript tries to access them

	// Initialize all main UI components
	setupSmoothScrolling();
	// Call our function that makes page links scroll smoothly

	initParallax();
	// Call our function that creates parallax scrolling effects

	initCounters();
	// Call our function that sets up the animated number counters

	initReviewCarousel();
	// Call our function that transforms reviews into a carousel/slideshow

	initNavbarScroll();
	// Call our function that changes navbar appearance when scrolling

	// Select elements to reveal on scroll
	const revealElements = document.querySelectorAll(
		".featured-products, .about-brief, .customer-reviews"
	);
	// Find all elements with these classes that we want to animate when scrolled into view
	// querySelectorAll returns multiple elements at once (like multiple CSS selectors)
	// These elements will fade in and move up when they become visible

	/**
	 * Function to check and reveal elements when they enter the viewport
	 */
	const revealOnScroll = function () {
		// This function checks if our elements are visible in the viewport (visible area)
		// It will add a class to make them visible when they come into view

		for (let i = 0; i < revealElements.length; i++) {
			// Loop through each element we want to reveal
			// This is a traditional for loop that goes from 0 to the total number of elements

			// Calculate element position relative to viewport
			let elementTop = revealElements[i].getBoundingClientRect().top;
			// getBoundingClientRect() gets the position and size of an element
			// .top property tells us the distance from the element's top to the viewport's top

			let windowHeight = window.innerHeight;
			// Get the current height of the browser window (viewport)
			// innerHeight is the height of the browser window in pixels

			// Add reveal class when element is visible
			if (elementTop < windowHeight - 100) {
				// Check if the top of the element is above the bottom of the viewport minus 100 pixels
				// This means the element is at least partially visible, with 100px buffer
				revealElements[i].classList.add("revealed");
				// Add the "revealed" class to the element
				// CSS will handle the transition from hidden to visible
			}
		}
	};

	// Create and inject CSS for scroll reveal animations
	const style = document.createElement("style");
	// Create a new <style> element for CSS
	// This lets us add CSS directly from JavaScript

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
	// Set the CSS text content of our style element
	// This CSS:
	// - Makes elements invisible (opacity: 0) and shifted down 30px
	// - Sets up a 1-second smooth transition for all changes
	// - When .revealed class is added, makes elements fully visible and in normal position

	document.head.appendChild(style);
	// Add our new style element to the <head> of the HTML document
	// This injects our CSS rules into the page

	// Setup scroll listener for reveal animation and trigger once for elements already in view
	window.addEventListener("scroll", revealOnScroll);
	// Add an event listener that calls revealOnScroll whenever the user scrolls
	// This continuously checks if elements should be revealed while scrolling

	revealOnScroll();
	// Call the function once immediately to reveal any elements already in view
	// This handles elements that are visible when the page first loads

	// Initialize hover effects for product images
	const productImages = document.querySelectorAll('.product-card img');
	// Find all images inside elements with class "product-card"
	// These are our product images that will get hover effects

	productImages.forEach(img => {
		// Loop through each product image we found
		// forEach is a modern way to loop through collections

		// Add scale and rotate effect on mouse over
		img.addEventListener('mouseover', function () {
			// Add an event that triggers when the mouse moves over the image
			// mouseover is the event name, and the function runs when that happens

			this.style.transform = 'scale(1.05) rotate(2deg)';
			// this refers to the specific image being hovered over
			// This makes the image 5% larger (scale 1.05) and rotates it 2 degrees
			// This creates a subtle "pop" effect when hovering over products
		});

		// Reset transform on mouse out
		img.addEventListener('mouseout', function () {
			// Add an event that triggers when the mouse leaves the image
			// mouseout is the event name

			this.style.transform = 'scale(1)';
			// Reset the transform back to normal size (scale 1)
			// This removes the scale and rotation effects when no longer hovering
		});
	});
});

/**
 * About Page Specific Animations
 * These functions only run on the about page
 */
document.addEventListener('DOMContentLoaded', function () {
	// This event listener waits for the HTML document to be fully loaded before running our code
	// We're using it again for About page specific features

	// Check if current page is the about page
	if (window.location.pathname.includes('about.html')) {
		// window.location.pathname gives us the current page URL path
		// .includes('about.html') checks if "about.html" is part of that path
		// This makes sure this code only runs on the About page

		// Select elements to animate
		const animateElements = document.querySelectorAll('.timeline-item, .team-member, .mission-card, .gallery-item');
		// Find all elements with these specific classes that we want to animate
		// These are elements unique to the About page
		// querySelectorAll finds multiple elements at once using CSS-style selectors

		// Create Intersection Observer to detect when elements come into view
		const observer = new IntersectionObserver((entries) => {
			// Create a new IntersectionObserver to watch when elements enter the viewport
			// This observer will run the arrow function when elements enter or exit the viewport
			// entries is an array of all the elements being observed that have changed visibility

			entries.forEach(entry => {
				// Loop through each element that has changed visibility status

				// Add animation class when element is visible
				if (entry.isIntersecting) {
					// Check if the element is now visible in the viewport
					// isIntersecting will be true when the element is visible

					entry.target.classList.add('animate-fadeInUp');
					// Add the 'animate-fadeInUp' class to the visible element
					// This class triggers a CSS animation that fades in the element from below

					// Stop observing once animation is applied
					observer.unobserve(entry.target);
					// Tell the observer to stop watching this element
					// This prevents the animation from repeating if the element goes out of view and back
				}
			});
		}, { threshold: 0.2 });
		// threshold: 0.2 means the element must be 20% visible before triggering the animation
		// This prevents animations starting when just a tiny part of the element is visible

		// Start observing all animation elements
		animateElements.forEach(element => {
			// Loop through each element we want to animate

			observer.observe(element);
			// Tell the observer to start watching this element
			// The observer will now track when this element enters the viewport
		});

		// Setup smooth scrolling for about page anchor links
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			// Find all link elements whose href attribute starts with # (internal page links)
			// Loop through each link found

			anchor.addEventListener('click', function (e) {
				// Add code that runs when one of these links is clicked

				// Prevent default link behavior
				e.preventDefault();
				// Stop the browser from immediately jumping to the target
				// This allows us to use our custom smooth scrolling instead

				// Get target element ID and find in document
				const targetId = this.getAttribute('href');
				// Get the href attribute from the clicked link (like "#team-section")

				const targetElement = document.querySelector(targetId);
				// Find the element on the page that has this ID

				// Scroll to target element with offset
				if (targetElement) {
					// Only proceed if the target element exists on the page

					window.scrollTo({
						// Use the scrollTo method to scroll the window to a specific position

						top: targetElement.offsetTop - 100, // Offset for navbar
						// Calculate position: element's top position minus 100 pixels
						// The -100 creates space for the fixed navigation bar at the top

						behavior: 'smooth' // Smooth scrolling animation
						// This creates a smooth scrolling effect instead of an instant jump
					});
				}
			});
		});
	}
});
