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

document.addEventListener("DOMContentLoaded", function () {
	setupSmoothScrolling();
	initScrollToTopButton();

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
        .featured-products, .about-brief, .customer-reviews, {
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
});
