const products = [
	{
		id: 1,
		name: "Wooden Train Set",
		price: 34.99,
		image: "images/train2.jpg",
		description:
			"Handcrafted birch wood train set with engine and three cars. Perfect for imaginative play.",
		featured: true,
	},
	{
		id: 2,
		name: "Building Blocks",
		price: 29.99,
		image: "images/block1.jpg",
		description:
			"Set of 24 colorful wooden building blocks in various shapes. Helps develop fine motor skills.",
		featured: true,
	},
	{
		id: 3,
		name: "Wooden Boat",
		price: 24.99,
		image: "images/boat1.jpg",
		description:
			"Handcrafted wooden sailboat made from premium maple. Great for bath time or display.",
		featured: true,
	},
	{
		id: 4,
		name: "Classic Toy Car",
		price: 19.99,
		image: "images/car2.jpg",
		description:
			"Vintage-inspired wooden toy car with rolling wheels. Crafted with smooth edges for safe play.",
		featured: true,
	},
	{
		id: 5,
		name: "Wooden Airplane",
		price: 22.99,
		image: "images/plane1.jpg",
		description:
			"Handcrafted wooden airplane with spinning propeller. Encourages imaginative play and storytelling.",
		featured: false,
	},
	{
		id: 6,
		name: "Deluxe Train Engine",
		price: 27.99,
		image: "images/train7.jpg",
		description:
			"Premium wooden train engine with detailed craftsmanship. Compatible with most wooden track systems.",
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

function showProductDetails(productId) {
	const product = products.find((p) => p.id === productId);

	if (!product) {
		console.error(`Product with ID ${productId} not found!`);
		return;
	}

	let productModal = document.getElementById("productModal");

	if (!productModal) {
		const modalHTML = `
        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img id="modalProductImage" class="img-fluid rounded" alt="Product Image">
                            </div>
                            <div class="col-md-6">
                                <p id="modalProductDescription"></p>
                                <h4 id="modalProductPrice" class="price mt-3"></h4>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        `;
		const modalContainer = document.createElement("div");
		modalContainer.innerHTML = modalHTML;
		document.body.appendChild(modalContainer);

		productModal = document.getElementById("productModal");
	}
	document.getElementById("productModalLabel").textContent = product.name;
	document.getElementById("modalProductImage").src = product.image;
	document.getElementById("modalProductImage").alt = product.name;
	document.getElementById("modalProductDescription").textContent =
		product.description;
	document.getElementById(
		"modalProductPrice"
	).textContent = `$${product.price.toFixed(2)}`;
	const modal = new bootstrap.Modal(productModal);
	modal.show();
}

document.addEventListener("DOMContentLoaded", function () {
	displayFeaturedProducts();
});
