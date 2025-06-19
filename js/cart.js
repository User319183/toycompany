/**
 * Cart System for Little Bird Toys
 * Handles adding items to cart, updating quantities, displaying cart items,
 * and managing the cart state across pages.
 */

// Cart state
let cart = [];

// Initialize the cart from localStorage on page load
function initCart() {
    const savedCart = localStorage.getItem('lbtoysCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCounter();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('lbtoysCart', JSON.stringify(cart));
    updateCartCounter();
}

// Update the cart item count in the navigation
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (!cartCounter) return;
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (itemCount > 0) {
        cartCounter.textContent = itemCount;
        cartCounter.classList.remove('d-none');
    } else {
        cartCounter.classList.add('d-none');
    }
}

// Add an item to the cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return false;
    }
    
    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    showToast('Added to Cart', `${product.name} has been added to your cart.`);
    return true;
}

// Remove an item from the cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    
    if (index !== -1) {
        const product = cart[index];
        cart.splice(index, 1);
        saveCart();
        showToast('Removed from Cart', `${product.name} has been removed from your cart.`);
        
        // If we're on the cart page, update the display
        if (document.getElementById('cart-items-container')) {
            displayCartItems();
        }
        
        return true;
    }
    
    return false;
}

// Update quantity of an item in the cart
function updateCartItemQuantity(productId, quantity) {
    if (quantity < 1) {
        return removeFromCart(productId);
    }
    
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        saveCart();
        
        // If we're on the cart page, update the display
        if (document.getElementById('cart-items-container')) {
            displayCartItems();
        }
        
        return true;
    }
    
    return false;
}

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0; // Free shipping over $50 could be implemented here
    const tax = subtotal * 0.06; // Assuming 6% tax rate
    const total = subtotal + shipping + tax;
    
    return {
        subtotal,
        shipping,
        tax,
        total
    };
}

// Display cart items in the cart page
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h3 class="fs-4">Your cart is empty</h3>
                <p class="mb-4">Looks like you haven't added any products to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        document.getElementById('cart-summary-container').classList.add('d-none');
        return;
    }
    
    document.getElementById('cart-summary-container').classList.remove('d-none');
    
    let cartHTML = '';
    
    cart.forEach(item => {
        cartHTML += `
            <div class="card mb-3 cart-item" data-product-id="${item.id}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-2 col-md-3 mb-2 mb-md-0">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                        </div>
                        <div class="col-lg-4 col-md-3 mb-2 mb-md-0">
                            <h5 class="mb-0">${item.name}</h5>
                        </div>
                        <div class="col-lg-2 col-md-2 mb-2 mb-md-0">
                            <span class="price">$${item.price.toFixed(2)}</span>
                        </div>
                        <div class="col-lg-2 col-md-2 mb-2 mb-md-0">
                            <div class="quantity-selector d-flex align-items-center">
                                <div class="input-group" style="width: 120px">
                                    <button class="btn btn-outline-secondary quantity-decrease" type="button">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" 
                                        aria-label="Quantity" data-product-id="${item.id}">
                                    <button class="btn btn-outline-secondary quantity-increase" type="button">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 text-end mb-2 mb-md-0">
                            <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div class="col-lg-1 col-md-1 text-end">
                            <button class="btn btn-link text-danger remove-item" aria-label="Remove item" data-product-id="${item.id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    // Add event listeners for quantity controls and remove buttons
    addCartItemEventListeners();
    
    // Update the order summary
    updateOrderSummary();
}

// Add event listeners for cart item controls
function addCartItemEventListeners() {
    // Quantity decrease buttons
    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const productId = parseInt(input.getAttribute('data-product-id'));
            let value = parseInt(input.value) - 1;
            if (value < 1) value = 1;
            input.value = value;
            updateCartItemQuantity(productId, value);
        });
    });
    
    // Quantity increase buttons
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const productId = parseInt(input.getAttribute('data-product-id'));
            let value = parseInt(input.value) + 1;
            input.value = value;
            updateCartItemQuantity(productId, value);
        });
    });
    
    // Quantity input fields
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) value = 1;
            this.value = value;
            updateCartItemQuantity(productId, value);
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            removeFromCart(productId);
        });
    });
}

// Update the order summary in the cart page
function updateOrderSummary() {
    const summaryContainer = document.getElementById('order-summary');
    if (!summaryContainer) return;
    
    const { subtotal, shipping, tax, total } = calculateCartTotals();
    
    summaryContainer.innerHTML = `
        <div class="card">
            <div class="card-header bg-white">
                <h5 class="mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>$${shipping.toFixed(2)}</span>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <span>Estimated Tax</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3 fw-bold fs-5">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary btn-lg w-100" id="checkout-button">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;
    
    // Add checkout button event listener
    document.getElementById('checkout-button').addEventListener('click', function() {
        // This would normally proceed to a checkout page
        showToast('Checkout', 'This would take you to a checkout page in a real e-commerce site.');
    });
}

// Initialize product quantity selector in the product modal
function initProductQuantitySelector() {
    // Quantity decrease button in the product detail modal
    document.querySelectorAll('.product-quantity-decrease').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.product-quantity-input');
            let value = parseInt(input.value) - 1;
            if (value < 1) value = 1;
            input.value = value;
        });
    });
    
    // Quantity increase button in the product detail modal
    document.querySelectorAll('.product-quantity-increase').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.product-quantity-input');
            let value = parseInt(input.value) + 1;
            input.value = value;
        });
    });
}

//Setup the cart button in the header
function setupCartButton() {
    const navbar = document.querySelector('.navbar-nav');
    if (!navbar) return;
    
    // Add the cart button to the navigation if it doesn't exist
    if (!document.getElementById('cart-nav-item')) {
        const cartItem = document.createElement('li');
        cartItem.className = 'nav-item ms-lg-2';
        cartItem.id = 'cart-nav-item';
        cartItem.innerHTML = `
            <a class="nav-link position-relative" href="cart.html">
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-counter" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary d-none">
                    0
                </span>
            </a>
        `;
        navbar.appendChild(cartItem);
    }
    
    updateCartCounter();
}

// Listen for product modal related events
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cart
    initCart();
    
    // Set up the cart button in the navigation
    setupCartButton();
    
    // If the product detail modal exists, set up the add to cart functionality
    const productModal = document.getElementById('productModal');
    if (productModal) {
        // Handle modal hidden event to ensure proper cleanup of backdrop
        productModal.addEventListener('hidden.bs.modal', function() {
            // Check if backdrop still exists and remove it if it does
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            // Restore body classes
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        });
        
        productModal.addEventListener('show.bs.modal', function() {
            setTimeout(() => {
                const addToCartBtn = document.querySelector('.modal-body .btn-primary');
                const quantityInput = document.querySelector('.modal-body .form-control');
                
                if (addToCartBtn && !addToCartBtn._hasClickEvent) {
                    addToCartBtn.addEventListener('click', function() {
                        const productId = parseInt(this.getAttribute('data-product-id'));
                        const quantity = parseInt(quantityInput ? quantityInput.value : 1);
                        
                        if (addToCart(productId, quantity)) {
                            // Optionally close the modal after adding to cart
                            // bootstrap.Modal.getInstance(productModal).hide();
                        }
                    });
                    
                    // Mark the button to avoid adding multiple event listeners
                    addToCartBtn._hasClickEvent = true;
                }
                
                // Initialize quantity selector in the modal
                const decreaseBtn = document.querySelector('.modal-body .btn:first-child');
                const increaseBtn = document.querySelector('.modal-body .btn:last-child');
                
                if (decreaseBtn && !decreaseBtn._hasClickEvent) {
                    decreaseBtn.addEventListener('click', function() {
                        const input = document.querySelector('.modal-body .form-control');
                        let value = parseInt(input.value) - 1;
                        if (value < 1) value = 1;
                        input.value = value;
                    });
                    decreaseBtn._hasClickEvent = true;
                }
                
                if (increaseBtn && !increaseBtn._hasClickEvent) {
                    increaseBtn.addEventListener('click', function() {
                        const input = document.querySelector('.modal-body .form-control');
                        let value = parseInt(input.value) + 1;
                        input.value = value;
                    });
                    increaseBtn._hasClickEvent = true;
                }
            }, 100); // Small delay to ensure DOM is ready
        });
    }
    
    // If we're on the cart page, display the cart items
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }
});
