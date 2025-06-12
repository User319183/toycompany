function showToast(title, message) {
	let toastContainer = document.querySelector(".toast-container");
	if (!toastContainer) {
		toastContainer = document.createElement("div");
		toastContainer.className =
			"toast-container position-fixed bottom-0 end-0 p-3";
		document.body.appendChild(toastContainer);
	}

	const toastId = "toast-" + Date.now();

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

	toastContainer.innerHTML += toastHTML;

	const toastElement = document.getElementById(toastId);
	const toast = new bootstrap.Toast(toastElement, {
		autohide: true,
		delay: 5000,
	});
	toast.show();
}

function setupSmoothScrolling() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");

			if (targetId === "#") {
				return;
			}

			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 70,
					behavior: "smooth",
				});
			}
		});
	});
}

function initScrollToTopButton() {
	const scrollToTopBtn = document.getElementById("scrollToTopBtn");

	if (!scrollToTopBtn) {
		return;
	}

	window.addEventListener("scroll", function () {
		if (window.scrollY > 300) {
			scrollToTopBtn.classList.add("show");
		} else {
			scrollToTopBtn.classList.remove("show");
		}
	});

	scrollToTopBtn.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}

// Initialize parallax effect
function initParallax() {
	window.addEventListener('scroll', function() {
		const parallaxElements = document.querySelectorAll('.parallax-element');
		let scrollPosition = window.pageYOffset;
		
		parallaxElements.forEach(element => {
			const speed = element.dataset.speed || 0.5;
			element.style.transform = `translateY(${scrollPosition * speed}px)`;
		});
	});
}

// Initialize animated counters
function initCounters() {
	const counterElements = document.querySelectorAll('.counter');
	const options = {
		threshold: 0.7
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const target = entry.target;
				const countTo = parseInt(target.dataset.count);
				let count = 0;
				const interval = setInterval(() => {
					target.innerText = count;
					if (count >= countTo) {
						clearInterval(interval);
					}
					count += Math.ceil(countTo / 20);
					if (count > countTo) count = countTo;
				}, 50);
				observer.unobserve(target);
			}
		});
	}, options);
	
	counterElements.forEach(counter => {
		observer.observe(counter);
	});
}

// Transform reviews into a carousel
function initReviewCarousel() {
	const reviewsContainer = document.getElementById('reviews-container');
	if (!reviewsContainer) return;
	
	reviewsContainer.classList.add('carousel', 'slide');
	reviewsContainer.setAttribute('data-bs-ride', 'carousel');
	reviewsContainer.id = 'reviewCarousel';
	
	// Get all review cards and group them for the carousel
	const reviewCards = Array.from(reviewsContainer.children);
	const carouselInner = document.createElement('div');
	carouselInner.className = 'carousel-inner';
	
	// Group cards into pairs (or adjust based on screen size)
	for (let i = 0; i < reviewCards.length; i += 2) {
		const carouselItem = document.createElement('div');
		carouselItem.className = 'carousel-item';
		if (i === 0) carouselItem.classList.add('active');
		
		const row = document.createElement('div');
		row.className = 'row justify-content-center';
		
		row.appendChild(reviewCards[i]);
		if (reviewCards[i + 1]) {
			row.appendChild(reviewCards[i + 1]);
		}
		
		carouselItem.appendChild(row);
		carouselInner.appendChild(carouselItem);
	}
	
	// Clear and rebuild the reviews container as a carousel
	reviewsContainer.innerHTML = '';
	reviewsContainer.appendChild(carouselInner);
	
	// Carousel controls
	const prevButton = document.createElement('button');
	prevButton.className = 'carousel-control-prev';
	prevButton.type = 'button';
	prevButton.dataset.bsTarget = '#reviewCarousel';
	prevButton.dataset.bsSlide = 'prev';
	prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';
	
	const nextButton = document.createElement('button');
	nextButton.className = 'carousel-control-next';
	nextButton.type = 'button';
	nextButton.dataset.bsTarget = '#reviewCarousel';
	nextButton.dataset.bsSlide = 'next';
	nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';
	
	reviewsContainer.appendChild(prevButton);
	reviewsContainer.appendChild(nextButton);
}

// Initialize navbar scroll effect
function initNavbarScroll() {
	const navbar = document.querySelector('.navbar');
	if (!navbar) return;
	
	window.addEventListener('scroll', function() {
		if (window.scrollY > 50) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
	});
}

document.addEventListener("DOMContentLoaded", function () {
	setupSmoothScrolling();
	initScrollToTopButton();
	initParallax();
	initCounters();
	initReviewCarousel();
	initNavbarScroll();

	const revealElements = document.querySelectorAll(
		".featured-products, .about-brief, .customer-reviews"
	);

	const revealOnScroll = function () {
		for (let i = 0; i < revealElements.length; i++) {
			let elementTop = revealElements[i].getBoundingClientRect().top;
			let windowHeight = window.innerHeight;

			if (elementTop < windowHeight - 100) {
				revealElements[i].classList.add("revealed");
			}
		}
	};

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

	window.addEventListener("scroll", revealOnScroll);
	revealOnScroll();
	
	// Initialize image hover effects
	const productImages = document.querySelectorAll('.product-card img');
	productImages.forEach(img => {
		img.addEventListener('mouseover', function() {
			this.style.transform = 'scale(1.05) rotate(2deg)';
		});
		img.addEventListener('mouseout', function() {
			this.style.transform = 'scale(1)';
		});
	});
});
