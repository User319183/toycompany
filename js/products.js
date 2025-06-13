const products = [
	{
		id: 1,
		name: "Wooden Airplane",
		price: 24.99,
		image: "images/plane1.jpg",
		images: ["images/plane1.jpg", "images/plane2.jpg", "images/plane3.jpg"],
		description: "Soar through imaginative skies with this classic wooden airplane.",
		detailedDescription: "Handcrafted from sustainable Baltic birch wood with a safe, natural harvest finish and a spinning propeller. Measures 3.5\"H x 7\"L x 7\"W.",
		age: "Toddlers",
		category: "airplanes",
		featured: true,
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

function displayFeaturedProducts() {
	const featuredProductsContainer = document.getElementById(
		"featured-products-container"
	);

	if (!featuredProductsContainer) {
		console.error("Featured products container not found!");
		return;
	}

	const featuredProducts = products.filter((product) => product.featured);
	featuredProducts.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.className = "col-md-6 col-lg-3";

		productCard.innerHTML = `
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top" alt="${
			product.name
		}" onerror="this.src='images/placeholder.jpg'">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-outline-primary btn-sm view-details" data-product-id="${
							product.id
						}">View Details</button>
                    </div>
                </div>
            </div>
        `;

		featuredProductsContainer.appendChild(productCard);
	});

	document.querySelectorAll(".view-details").forEach((button) => {
		button.addEventListener("click", function () {
			const productId = parseInt(this.getAttribute("data-product-id"));
			showProductDetails(productId);
		});
	});
}

function displayAllProducts() {
	const productsContainer = document.getElementById("products-container");

	if (!productsContainer) {
		console.error("Products container not found!");
		return;
	}

	// Clear existing content
	productsContainer.innerHTML = "";

	products.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.className = "col-sm-6 col-lg-4";
		productCard.setAttribute("data-category", product.category);

		productCard.innerHTML = `
            <div class="card product-card h-100">
                <div class="product-image-container">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                    <div class="age-badge">Age: ${product.age}</div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="product-card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="price">$${product.price.toFixed(2)}</span>
                            <button class="btn btn-primary learn-more" data-product-id="${product.id}">
                                Learn More <i class="fas fa-arrow-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

		productsContainer.appendChild(productCard);
	});

	// Add event listeners to all "Learn More" buttons
	document.querySelectorAll(".learn-more").forEach((button) => {
		button.addEventListener("click", function () {
			const productId = parseInt(this.getAttribute("data-product-id"));
			showProductDetails(productId);
		});
	});
}

function setupFilterButtons() {
	const filterButtons = document.querySelectorAll(".filter-btn");
	const productCards = document.querySelectorAll("[data-category]");

	filterButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const filter = this.getAttribute("data-filter");

			// Update active state on buttons
			filterButtons.forEach((btn) => btn.classList.remove("active"));
			this.classList.add("active");

			// Show all products if filter is "all", otherwise filter by category
			if (filter === "all") {
				productCards.forEach((card) => {
					card.style.display = "block";
				});
			} else {
				productCards.forEach((card) => {
					if (card.getAttribute("data-category") === filter) {
						card.style.display = "block";
					} else {
						card.style.display = "none";
					}
				});
			}
		});
	});
}

function showProductDetails(productId) {
	const product = products.find((p) => p.id === productId);
	
	if (!product) {
		console.error("Product not found!");
		return;
	}
	
	const modalContent = document.getElementById("productModalContent");
	
	if (!modalContent) {
		console.error("Modal content container not found!");
		return;
	}

	// Update modal title
	document.getElementById("productModalLabel").textContent = product.name;

	let imageCarousel = '';
	
	if (product.images && product.images.length > 1) {
		const carouselIndicators = product.images.map((img, index) => 
			`<button type="button" data-bs-target="#productImageCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-label="Slide ${index + 1}"></button>`
		).join('');
		
		const carouselItems = product.images.map((img, index) => 
			`<div class="carousel-item ${index === 0 ? 'active' : ''}">
				<img src="${img}" class="d-block w-100 rounded-3" alt="${product.name} - View ${index + 1}">
			</div>`
		).join('');
		
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
		imageCarousel = `<img src="${product.image}" class="img-fluid rounded-3 shadow" alt="${product.name}">`;
	}
	
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
							<button class="btn btn-outline-secondary" type="button"><i class="fas fa-minus"></i></button>
							<input type="text" class="form-control text-center" value="1" aria-label="Quantity">
							<button class="btn btn-outline-secondary" type="button"><i class="fas fa-plus"></i></button>
						</div>
					</div>
					<button class="btn btn-primary btn-lg w-100">
						<i class="fas fa-shopping-cart me-2"></i> Add to Cart
					</button>
				</div>
			</div>
		</div>
	`;
	
	const productModal = new bootstrap.Modal(document.getElementById('productModal'));
	productModal.show();
}

function setupProductDetails() {
	// This ensures that product modals can be triggered from anywhere
	document.querySelectorAll('[data-product-id]').forEach(element => {
		element.addEventListener('click', function() {
			const productId = parseInt(this.getAttribute('data-product-id'));
			showProductDetails(productId);
		});
	});
}

document.addEventListener("DOMContentLoaded", function () {
	if (document.getElementById("featured-products-container")) {
		displayFeaturedProducts();
	}
});
