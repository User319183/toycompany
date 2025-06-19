// Sample customer reviews data
const customerReviews = [
	{
		name: "Stella Bella",
		location: "New York",
		rating: 5,
		text: "The wooden train set we purchased for our son's birthday is absolutely beautiful! The craftsmanship is outstanding and it's clear that a lot of care went into making it. He plays with it every day.",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		child_image: "https://images.unsplash.com/photo-1536640712610-892bdf6ae838?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
	},
	{
		name: "Michael Peterson",
		location: "Chicago",
		rating: 5,
		text: "These are the kinds of toys that get passed down through generations. The wooden airplane we bought has survived two energetic boys and still looks almost new. Worth every penny!",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		child_image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
	},
	{
		name: "Emily Rodriguez",
		location: "Seattle",
		rating: 4,
		text: "I love that these toys don't need batteries! My daughter uses her imagination when playing with her wooden boat, making up new stories every time. The quality is excellent.",
		image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		child_image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
	},
	{
		name: "David Wilson",
		location: "Austin",
		rating: 5,
		text: "I was hesitant about the price at first, but after seeing how much my kids love these wooden blocks and how durable they are, I'm completely convinced. These toys are an investment.",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		child_image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
	}
];

// Display reviews
function displayReviews() {
	const reviewsContainer = document.getElementById('reviews-container');

	if (!reviewsContainer) {
		console.error("Reviews container not found");
		return;
	}

	// Clear the container
	reviewsContainer.innerHTML = '';

	// Create HTML for each review
	customerReviews.forEach(review => {
		// Create stars HTML based on rating
		let starsHTML = '';
		for (let i = 0; i < 5; i++) {
			if (i < review.rating) {
				starsHTML += '<i class="bi bi-star-fill text-warning"></i>';
			} else {
				starsHTML += '<i class="bi bi-star text-warning"></i>';
			}
		}

		// Create review card
		const reviewCard = document.createElement('div');
		reviewCard.className = 'col-md-6'; reviewCard.innerHTML = `
            <div class="testimonial-item">
                <div class="testimonial-content">
                    <div class="testimonial-quote">
                        <p>"${review.text}"</p>
                    </div>
                    <div class="testimonial-stars mb-3" title="${review.rating}/5 stars">
                        ${starsHTML}
                    </div>
                    <div class="testimonial-person">
                        <img src="${review.image}" alt="${review.name}" class="testimonial-avatar" width="70" height="70" onerror="this.src='images/avatar-placeholder.png'">
                        <div class="testimonial-info">
                            <h5>${review.name}</h5>
                            <p class="text-muted">${review.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

		reviewsContainer.appendChild(reviewCard);
	});
}

// Initialize reviews when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
	const reviewsContainer = document.getElementById('reviews-container');

	// Only proceed if the reviews container exists on this page
	if (!reviewsContainer) {
		console.log('Reviews container not found on this page. Skipping reviews loading.');
		return;
	}

	displayReviews();
});
