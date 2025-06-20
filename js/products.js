// This array stores all the product information for our online toy store
// Each product is an object with properties like id, name, price, etc.
const products = [
	{
		id: 1,                                  // Unique identifier for the product
		name: "Wooden Airplane",                // Name of the toy product
		price: 24.99,                           // Price in dollars
		image: "images/plane1.jpg",             // Main image path for the product
		images: ["images/plane1.jpg", "images/plane2.jpg", "images/plane3.jpg"],  // Array of all product images for the gallery
		description: "Soar through imaginative skies with this classic wooden airplane.",  // Short description for product cards
		detailedDescription: "Handcrafted from sustainable Baltic birch wood with a safe, natural harvest finish and a spinning propeller. Measures 3.5\"H x 7\"L x 7\"W.",  // Longer description for product detail modal
		age: "Toddlers",                        // Recommended age group for the toy
		category: "airplanes",                  // Product category for filtering
		featured: true,                         // Whether this product should appear in the featured section
	},
	{
		id: 2,
		name: "Wooden Train Set",
		price: 34.99,
		image: "images/train2.jpg",
		images: ["images/train2.jpg", "images/train1.jpg", "images/train3.jpg", "images/train4.jpg"],
		description: "Embark on a charming journey with this beautiful handcrafted wooden train set.",
		detailedDescription: "Engine and three interchangeable cars boast intricate details made from real beech wood. Large size (84cm L x 11cm H x 13cm W) with moving wheels and a fully ecological design.",
		age: "3+",
		category: "trains",
		featured: true,
	},
	{
		id: 3,
		name: "Wooden Boat",
		price: 29.99,
		image: "images/boat1.jpg",
		images: ["images/boat1.jpg", "images/boat2.jpg"],
		description: "Set sail for bathtub adventures with this adorable wooden boat.",
		detailedDescription: "Made from solid Maine white pine, this handcrafted toy floats and features rounded edges for safety. Includes two peg \"lobster people.\" Size: 10.5\"W x 3.5\"H.",
		age: "All ages",
		category: "boats",
		featured: true,
	},
	{
		id: 4,
		name: "Wooden Block Set",
		price: 42.99,
		image: "images/block1.jpg",
		images: ["images/block1.jpg", "images/block2.jpg", "images/block3.jpg", "images/block4.jpg", "images/block5.jpg"],
		description: "Build creativity and imagination with this high-quality, 72-piece block set.",
		detailedDescription: "Made from naturally finished and smooth-sanded hardwood blocks, this set comes in a convenient wooden storage crate (13\" L x 12\" W x 2\" H).",
		age: "3+",
		category: "blocks",
		featured: true,
	},
	{
		id: 5,
		name: "Wooden Car",
		price: 19.99,
		image: "images/car1.jpg",
		images: ["images/car1.jpg", "images/car2.jpg", "images/car3.jpg", "images/car4.jpg"],
		description: "This heirloom-quality wooden car is a timeless treasure.",
		detailedDescription: "Handcrafted from domestic and exotic hardwoods with a clear lacquer finish, this unique car will inspire generations of imaginative play. Please note potential choking hazards for small children.",
		age: "All ages",
		category: "cars",
		featured: false,
	},
	{
		id: 6,
		name: "Deluxe Train Engine",
		price: 27.99,
		image: "images/train7.jpg",
		images: ["images/train7.jpg", "images/train5.jpg", "images/train6.jpg"],
		description: "Premium wooden train engine with detailed craftsmanship.",
		detailedDescription: "This premium wooden train engine features detailed craftsmanship and is compatible with most wooden track systems. Made from sustainable Baltic birch wood with natural, child-safe finishes.",
		age: "3+",
		category: "trains",
		featured: false,
	},
];

/**
 * This function displays the featured products on the homepage
 * It creates product cards for items marked as featured in our products array
 */
function displayFeaturedProducts() {
	// Find the container element where we'll put our featured products
	const featuredProductsContainer = document.getElementById(
		"featured-products-container"
	);

	// Check if the container exists on the current page
	if (!featuredProductsContainer) {
		// If the container doesn't exist, show an error message in the console
		console.error("Featured products container not found!");
		// Exit the function early to avoid errors
		return;
	}

	// Filter the products array to get only the featured products
	// The filter method creates a new array with only items that pass the test
	// Here we're keeping only products where featured is true
	const featuredProducts = products.filter((product) => product.featured);
	
	// Loop through each featured product and create a card for it
	featuredProducts.forEach((product) => {
		// Create a new div element for the product card
		const productCard = document.createElement("div");
		
		// Add Bootstrap responsive column classes
		// col-md-6 means take up half the width on medium screens
		// col-lg-3 means take up a quarter of the width on large screens
		productCard.className = "col-md-6 col-lg-3"; 
		
		// Create the HTML content for the product card using a template literal
		// Template literals allow us to insert variables using ${variable}
		productCard.innerHTML = `
            <div class="card product-card h-100">
                <div class="product-image-container">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="product-card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price">${product.price.toFixed(2)}</span>
                            <button class="btn btn-outline-primary btn-sm view-details" data-product-id="${product.id}">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

		// Add the product card to the container
		featuredProductsContainer.appendChild(productCard);
	});

	// Add click event listeners to all "View Details" buttons
	// First find all buttons with the class "view-details"
	document.querySelectorAll(".view-details").forEach((button) => {
		// Add a click event listener to each button
		button.addEventListener("click", function () {
			// Get the product ID from the button's data attribute
			// parseInt converts the string attribute to a number
			const productId = parseInt(this.getAttribute("data-product-id"));
			
			// Call the function to show the product details modal with this ID
			showProductDetails(productId);
		});
	});
}

/**
 * This function displays all products on the products page
 * It creates product cards for all items in our products array
 */
function displayAllProducts() {
	// Find the container element where we'll put all our products
	const productsContainer = document.getElementById("products-container");

	// Check if the container exists on the current page
	if (!productsContainer) {
		// If the container doesn't exist, show an error message in the console
		console.error("Products container not found!");
		// Exit the function early to avoid errors
		return;
	}

	// Clear existing content from the container
	// This ensures we don't add duplicate products if this function runs multiple times
	productsContainer.innerHTML = "";

	// Loop through each product and create a card for it
	products.forEach((product) => {
		// Create a new div element for the product card
		const productCard = document.createElement("div");
		
		// Add Bootstrap responsive column classes
		// col-sm-6 means take up half the width on small screens
		// col-lg-4 means take up a third of the width on large screens
		productCard.className = "col-sm-6 col-lg-4";
		
		// Add a data attribute for the product category
		// This will be used later for filtering products by category
		productCard.setAttribute("data-category", product.category); 
		
		// Create the HTML content for the product card using a template literal
		// This creates a more detailed card than the featured products version
		productCard.innerHTML = `
            <div class="card product-card h-100">
                <div class="product-image-container">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                    <div class="age-badge"><i class="fas fa-child me-1"></i> ${product.age}</div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="category-tag">${product.category}</div>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="product-card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price">${product.price.toFixed(2)}</span>
                            <button class="btn btn-primary learn-more" data-product-id="${product.id}">
                                Learn More <i class="fas fa-arrow-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

		// Add the product card to the container
		productsContainer.appendChild(productCard);
	});

	// Add event listeners to all "Learn More" buttons
	// First find all buttons with the class "learn-more"
	document.querySelectorAll(".learn-more").forEach((button) => {
		// Add a click event listener to each button
		button.addEventListener("click", function () {
			// Get the product ID from the button's data attribute
			// parseInt converts the string attribute to a number
			const productId = parseInt(this.getAttribute("data-product-id"));
			
			// Call the function to show the product details modal with this ID
			showProductDetails(productId);
		});
	});
}

/**
 * This function sets up the product category filter buttons
 * It allows users to filter products by category (trains, airplanes, etc.)
 */
function setupFilterButtons() {
	// Find all filter buttons on the page that have the class "filter-btn"
	const filterButtons = document.querySelectorAll(".filter-btn");
	
	// Find all product cards that have a data-category attribute
	// The [data-category] selector finds elements that have this attribute
	const productCards = document.querySelectorAll("[data-category]");

	// Loop through each filter button to add click event listeners
	filterButtons.forEach((button) => {
		// Add a click event listener to each button
		button.addEventListener("click", function () {
			// Get the filter value from the button's data-filter attribute
			// This will be either "all" or a specific category like "airplanes", "trains", etc.
			const filter = this.getAttribute("data-filter");

			// Update active state on buttons (change which button looks selected)
			// First, remove the active class from all buttons
			filterButtons.forEach((btn) => btn.classList.remove("active"));
			// Then add the active class to just the clicked button
			this.classList.add("active");

			// Show all products if filter is "all", otherwise filter by category
			if (filter === "all") {
				// If the "All" button was clicked, show every product
				productCards.forEach((card) => {
					// Make all product cards visible
					card.style.display = "block";
				});
			} else {
				// If a specific category button was clicked, show only matching products
				productCards.forEach((card) => {
					// Check if this card's category matches the selected filter
					if (card.getAttribute("data-category") === filter) {
						// If it matches, show this product card
						card.style.display = "block";
					} else {
						// If it doesn't match, hide this product card
						card.style.display = "none";
					}
				});
			}
		});
	});
}

/**
 * This function displays a detailed modal popup for a specific product
 * @param {number} productId - The id of the product to display
 */
function showProductDetails(productId) {
	// Find the product with the matching ID in our products array
	// The find method returns the first item that passes the test function
	const product = products.find((p) => p.id === productId);

	// Check if a product was found
	if (!product) {
		// If the product doesn't exist, show an error message in the console
		console.error("Product not found!");
		// Exit the function early to avoid errors
		return;
	}

	// Find the container element where we'll put our product details
	const modalContent = document.getElementById("productModalContent");

	// Check if the modal container exists
	if (!modalContent) {
		// If the container doesn't exist, show an error message
		console.error("Modal content container not found!");
		// Exit the function early to avoid errors
		return;
	}

	// Update modal title with the product name
	document.getElementById("productModalLabel").textContent = product.name;

	// Variable to hold the HTML for either a carousel or single image
	let imageCarousel = '';

	// Check if the product has multiple images
	if (product.images && product.images.length > 1) {
		// Create the carousel indicator buttons (the dots at the bottom)
		// map creates a new array by transforming each item in the original array
		const carouselIndicators = product.images.map((img, index) =>
			// For each image, create an indicator button with the proper attributes
			`<button type="button" data-bs-target="#productImageCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-label="Slide ${index + 1}"></button>`
		).join(''); // join combines all array items into a single string

		// Create the carousel slides (one for each product image)
		const carouselItems = product.images.map((img, index) =>
			// For each image, create a carousel slide with the proper attributes
			`<div class="carousel-item ${index === 0 ? 'active' : ''}">
				<img src="${img}" class="d-block w-100 rounded-3" alt="${product.name} - View ${index + 1}">
			</div>`
		).join(''); // join combines all array items into a single string

		// Create the complete Bootstrap carousel HTML structure
		imageCarousel = `
			<div id="productImageCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
				<div class="carousel-indicators">
					${carouselIndicators}
				</div>
				<div class="carousel-inner rounded-3 shadow">
					${carouselItems}
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		`;
	} else {
		// If there's only one image, just display it without a carousel
		imageCarousel = `<img src="${product.image}" class="img-fluid rounded-3 shadow" alt="${product.name}">`;
	}

	// Build the complete modal content HTML using a template literal
	// This includes the product details and layout structure
	modalContent.innerHTML = `
		<div class="row">
			<div class="col-lg-6 mb-4 mb-lg-0">
				${imageCarousel}
			</div>
			<div class="col-lg-6">
				<div class="product-meta mb-3 d-flex gap-2">
					<span class="badge bg-primary">Age: ${product.age}</span>
					<span class="badge bg-secondary text-capitalize">${product.category}</span>
				</div>
				<div class="price-tag mb-3 d-inline-block">
					<span class="fs-2 fw-bold text-primary">$${product.price.toFixed(2)}</span>
				</div>
				<div class="product-description mb-4">
					<p class="lead">${product.detailedDescription}</p>
				</div>
				<div class="product-features mb-4">
					<h5 class="fw-bold mb-3">Product Features</h5>
					<ul class="feature-list">
						<li><i class="fas fa-check-circle text-success me-2"></i> Handcrafted with care</li>
						<li><i class="fas fa-check-circle text-success me-2"></i> Sustainable materials</li>
						<li><i class="fas fa-check-circle text-success me-2"></i> Child-safe finishes</li>
						<li><i class="fas fa-check-circle text-success me-2"></i> Durable construction</li>
					</ul>
				</div>
				<div class="product-actions">
					<div class="quantity-selector mb-3 d-flex align-items-center">
						<span class="me-3 fw-bold">Quantity:</span>
						<div class="input-group" style="width: 130px">
							<button class="btn btn-outline-secondary product-quantity-decrease" type="button"><i class="fas fa-minus"></i></button>
							<input type="text" class="form-control text-center product-quantity-input" value="1" aria-label="Quantity">
							<button class="btn btn-outline-secondary product-quantity-increase" type="button"><i class="fas fa-plus"></i></button>
						</div>
					</div>
					<button class="btn btn-primary btn-lg w-100" data-product-id="${product.id}">
						<i class="fas fa-shopping-cart me-2"></i> Add to Cart
					</button>
				</div>
			</div>
		</div>
	`;

	// Create a new Bootstrap modal using the productModal element
	// The Bootstrap Modal is a popup dialog box component
	const productModal = new bootstrap.Modal(document.getElementById('productModal'));
	
	// Display the modal by calling its show() method
	productModal.show();
}

/**
 * This function sets up click events for all product detail buttons
 * Allows product details to be shown from anywhere on the site
 */
function setupProductDetails() {
	// Find all elements with a data-product-id attribute
	// This selects any element that can trigger a product detail modal
	document.querySelectorAll('[data-product-id]').forEach(element => {
		// Add a click event listener to each element
		element.addEventListener('click', function () {
			// Get the product ID from the element's data attribute
			// parseInt converts the string attribute to a number
			const productId = parseInt(this.getAttribute('data-product-id'));
			// Call the function to show the product details modal
			showProductDetails(productId);
		});
	});
}

/**
 * Function to ensure proper cleanup after modal close
 * Fixes Bootstrap modal issues like stuck backdrops or scrolling problems
 */
function ensureModalCleanup() {
	// Find the modal backdrop element (the dark overlay behind modals)
	const backdrop = document.querySelector('.modal-backdrop');
	
	// Check if the backdrop exists
	if (backdrop) {
		// Remove the backdrop element from the DOM completely
		backdrop.remove();
	}
	
	// Remove the 'modal-open' class from the body
	// This class prevents scrolling on the main page while a modal is open
	document.body.classList.remove('modal-open');
	
	// Reset the body's overflow style to enable scrolling again
	document.body.style.overflow = '';
	
	// Remove any padding added to the body by Bootstrap
	// Bootstrap adds padding to prevent layout shift when scrollbars appear/disappear
	document.body.style.paddingRight = '';
}

/**
 * This event listener runs when the HTML document is fully loaded
 * It initializes all product-related functionality
 */
document.addEventListener("DOMContentLoaded", function () {
	// Check if we're on a page with the featured products container
	// This helps us only run code that's needed for the current page
	if (document.getElementById("featured-products-container")) {
		// If we found the featured products container, display featured products
		displayFeaturedProducts();
	}

	// Set up the "Continue Shopping" button in the modal
	// Find the button by its ID
	const continueShoppingBtn = document.getElementById('continueShopping');
	
	// Check if the button exists on this page
	if (continueShoppingBtn) {
		// Add a click event listener to the button
		continueShoppingBtn.addEventListener('click', function () {
			// Use setTimeout to delay the cleanup by 150 milliseconds
			// This ensures the modal is fully dismissed before cleanup
			setTimeout(ensureModalCleanup, 150);
		});
	}

	// Add cleanup when the product modal is hidden
	// Find the modal element by its ID
	const productModal = document.getElementById('productModal');
	
	// Check if the modal exists on this page
	if (productModal) {
		// Listen for Bootstrap's 'hidden.bs.modal' event
		// This event fires when the modal has finished being hidden
		productModal.addEventListener('hidden.bs.modal', ensureModalCleanup);
	}
});
