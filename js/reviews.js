// Sample customer reviews data
const customerReviews = [
    {
        name: "Sarah Johnson",
        location: "New York",
        rating: 5,
        text: "The wooden train set we purchased for our son's birthday is absolutely beautiful! The craftsmanship is outstanding and it's clear that a lot of care went into making it. He plays with it every day.",
        image: "images/avatar1.jpg"
    },
    {
        name: "Michael Peterson",
        location: "Chicago",
        rating: 5,
        text: "These are the kinds of toys that get passed down through generations. The wooden airplane we bought has survived two energetic boys and still looks almost new. Worth every penny!",
        image: "images/avatar2.jpg"
    },
    {
        name: "Emily Rodriguez",
        location: "Seattle",
        rating: 4,
        text: "I love that these toys don't need batteries! My daughter uses her imagination when playing with her wooden boat, making up new stories every time. The quality is excellent.",
        image: "images/avatar3.jpg"
    },
    {
        name: "David Wilson",
        location: "Austin",
        rating: 5,
        text: "I was hesitant about the price at first, but after seeing how much my kids love these wooden blocks and how durable they are, I'm completely convinced. These toys are an investment.",
        image: "images/avatar4.jpg"
    }
];

// Function to display reviews
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
                starsHTML += '<i class="fas fa-star text-warning"></i>';
            } else {
                starsHTML += '<i class="far fa-star text-warning"></i>';
            }
        }
        
        // Create review card
        const reviewCard = document.createElement('div');
        reviewCard.className = 'col-md-6 col-lg-3';
        
        reviewCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${review.image}" alt="${review.name}" class="rounded-circle me-3" width="50" height="50" onerror="this.src='images/avatar-placeholder.png'">
                        <div>
                            <h5 class="card-title mb-0">${review.name}</h5>
                            <small class="text-muted">${review.location}</small>
                        </div>
                    </div>
                    <div class="mb-3">
                        ${starsHTML}
                    </div>
                    <p class="card-text">${review.text}</p>
                </div>
            </div>
        `;
        
        reviewsContainer.appendChild(reviewCard);
    });
}

// Initialize reviews when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviews-container');
    
    // Only proceed if the reviews container exists on this page
    if (!reviewsContainer) {
        console.log('Reviews container not found on this page. Skipping reviews loading.');
        return;
    }
    
    displayReviews();
});
