const reviews = [
	{
		id: 1,
		name: "Samantha J.",
		review: "Beautiful craftsmanship! My daughter loves her wooden train set. The quality is exceptional and I know it will last for years.",
		rating: 5,
	},
	{
		id: 2,
		name: "Michael T.",
		review: "The building blocks are perfect for my son. He spends hours creating different structures. Love that they're made from sustainable wood.",
		rating: 5,
	},
	{
		id: 3,
		name: "Rachel K.",
		review: "We purchased the rocking horse for our grandson. The attention to detail is amazing and it's very sturdy. Highly recommend!",
		rating: 4,
	},
	{
		id: 4,
		name: "David L.",
		review: "The stacking rings have been a hit with our twins. Great quality and the colors are vibrant without being overwhelming.",
		rating: 5,
	},
];

function generateStarRating(rating) {
	let stars = "";

	for (let i = 0; i < rating; i++) {
		stars += '<i class="fas fa-star"></i>';
	}

	for (let i = rating; i < 5; i++) {
		stars += '<i class="far fa-star"></i>';
	}

	return stars;
}

function displayCustomerReviews() {
	const reviewsContainer = document.getElementById("reviews-container");

	if (!reviewsContainer) {
		console.error("Reviews container not found!");
		return;
	}
	reviews.forEach((review) => {
		const reviewCard = document.createElement("div");
		reviewCard.className = "col-md-6 col-lg-3 mb-4";

		reviewCard.innerHTML = `
            <div class="review-card h-100">
                <div class="stars">
                    ${generateStarRating(review.rating)}
                </div>
                <p class="review-text">"${review.review}"</p>
                <p class="customer-name">- ${review.name}</p>
            </div>
        `;

		reviewsContainer.appendChild(reviewCard);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	// Only run displayCustomerReviews if we're on a page with reviews-container
	if(document.getElementById("reviews-container")) {
		displayCustomerReviews();
	}
});
