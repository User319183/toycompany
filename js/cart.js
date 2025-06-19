/**
 * Cart System for Little Bird Toys
 * Handles adding items to cart, updating quantities, displaying cart items,
 * and managing the cart state across pages.
 */

// Cart state - This creates an empty array that will store all our cart items
let cart = []; // We start with an empty shopping cart (an empty array)

// Initialize the cart from localStorage on page load
function initCart() {
    // Look for a saved cart in the browser's localStorage (like the browser's memory)
    const savedCart = localStorage.getItem('lbtoysCart'); // Try to get previously saved cart using the key 'lbtoysCart'
    if (savedCart) { // If we found a saved cart (not null or undefined)
        cart = JSON.parse(savedCart); // Convert the saved string back to a JavaScript array of objects
        updateCartCounter(); // Update the number shown on the cart icon
    }
}

// Save cart to localStorage
function saveCart() {
    // Save the cart array to the browser's localStorage so it persists between page loads
    localStorage.setItem('lbtoysCart', JSON.stringify(cart)); // Convert cart array to a string and store it
    updateCartCounter(); // Update the number badge on cart icon after saving
}

// Update the cart item count in the navigation
function updateCartCounter() {
    // Find the HTML element that shows the count (the small number badge on cart icon)
    const cartCounter = document.getElementById('cart-counter'); // Get element by its ID
    if (!cartCounter) return; // If the element doesn't exist on this page, exit the function

    // Calculate the total number of items by adding up all quantities
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0); // Sum up quantities using reduce method

    // If we have items in cart, show the counter with the correct number
    if (itemCount > 0) {
        cartCounter.textContent = itemCount; // Set the text inside the counter to show the number
        cartCounter.classList.remove('d-none'); // Make the counter visible by removing the 'd-none' class
    } else {
        cartCounter.classList.add('d-none'); // Hide the counter if cart is empty by adding 'd-none' class
    }
}

// Add an item to the cart
function addToCart(productId, quantity = 1) {
    // Find the product details from our product list using the productId
    const product = products.find(p => p.id === productId); // Search the products array for matching id

    // If product doesn't exist, show error and exit function
    if (!product) {
        console.error(`Product with ID ${productId} not found`); // Log error in browser console
        return false; // Return false to indicate failure
    }

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === productId); // Look for item with same id in cart

    if (existingItem) {
        // If product is already in cart, just increase its quantity
        existingItem.quantity += quantity; // Add the new quantity to existing quantity
    } else {
        // If product is not in cart, add it as a new item
        cart.push({ // Add a new object to the cart array
            id: product.id, // Store the product id
            name: product.name, // Store the product name
            price: product.price, // Store the product price
            image: product.image, // Store the product image path
            quantity: quantity // Store how many of this item
        });
    }

    saveCart(); // Save updated cart to localStorage
    showToast('Added to Cart', `${product.name} has been added to your cart.`); // Show a popup notification
    return true; // Return true to indicate success
}

// Remove an item from the cart
function removeFromCart(productId) {
    // Find the position (index) of the item in the cart array
    const index = cart.findIndex(item => item.id === productId); // Returns -1 if not found

    if (index !== -1) { // If the item was found in the cart (index is not -1)
        const product = cart[index]; // Save the product before removing (to use name in notification)
        cart.splice(index, 1); // Remove 1 item at the found index (removes the product from cart)
        saveCart(); // Save the updated cart to localStorage
        showToast('Removed from Cart', `${product.name} has been removed from your cart.`); // Show notification

        // If we're on the cart page, update the display
        if (document.getElementById('cart-items-container')) { // Check if cart container exists on this page
            displayCartItems(); // Refresh the cart display
        }

        return true; // Return true to indicate success
    }

    return false; // Return false if item wasn't in cart
}

// Update quantity of an item in the cart
function updateCartItemQuantity(productId, quantity) {
    // If quantity is less than 1, remove the item completely instead of updating
    if (quantity < 1) {
        return removeFromCart(productId); // Call removeFromCart function and return its result
    }

    // Find the item in the cart that matches the productId
    const item = cart.find(item => item.id === productId); // Returns the item or undefined

    if (item) { // If the item exists in the cart
        item.quantity = quantity; // Update its quantity with the new value
        saveCart(); // Save the updated cart to localStorage

        // If we're on the cart page, update the display
        if (document.getElementById('cart-items-container')) { // Check if we're on the cart page
            displayCartItems(); // Refresh the cart display
        }

        return true; // Return true to indicate success
    }

    return false; // Return false if item wasn't found in cart
}

// Calculate cart totals
function calculateCartTotals() {
    // Calculate subtotal by multiplying each item's price by its quantity and adding them all up
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0); // Using reduce to sum up all items

    // Set shipping cost ($5.99 if cart has items, $0 if empty)
    const shipping = subtotal > 0 ? 5.99 : 0; // Using ternary operator: condition ? valueIfTrue : valueIfFalse

    // Calculate tax at 6% of subtotal
    const tax = subtotal * 0.06; // Assuming 6% tax rate

    // Calculate the final total by adding subtotal, shipping, and tax
    const total = subtotal + shipping + tax;

    // Return an object containing all calculated values
    return {
        subtotal, // Same as writing "subtotal: subtotal"
        shipping, // Same as writing "shipping: shipping"
        tax,      // Same as writing "tax: tax"
        total     // Same as writing "total: total"
    };
}

// Display cart items in the cart page
function displayCartItems() {
    // Find the container element where cart items should be displayed
    const cartContainer = document.getElementById('cart-items-container'); // Get element by its ID
    if (!cartContainer) return; // If container doesn't exist on this page, exit function

    // If the cart is empty, show an "empty cart" message
    if (cart.length === 0) {
        // Set innerHTML to show empty cart message with HTML and a button to continue shopping
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h3 class="fs-4">Your cart is empty</h3>
                <p class="mb-4">Looks like you haven't added any products to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        // Hide the order summary section since cart is empty
        document.getElementById('cart-summary-container').classList.add('d-none'); // Add d-none class to hide element
        return; // Exit function early
    }

    // If cart has items, make sure the summary is visible
    document.getElementById('cart-summary-container').classList.remove('d-none'); // Remove d-none class to show element

    // Create an empty string to build our HTML
    let cartHTML = ''; // Start with empty string to build HTML content

    // Loop through each item in the cart and create HTML for it
    cart.forEach(item => { // For each item in the cart array
        // Add HTML for this cart item to our string, using template literals (backticks)
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
                            <span class="price">$${item.price.toFixed(2)}</span> <!-- Format price to 2 decimal places -->
                        </div>
                        <div class="col-lg-2 col-md-2 mb-2 mb-md-0">
                            <div class="quantity-selector">
                                <div class="input-group quantity-input-group">
                                    <button class="btn btn-outline-secondary quantity-decrease" type="button">
                                        <i class="fas fa-minus"></i> <!-- Minus icon -->
                                    </button>
                                    <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" 
                                        aria-label="Quantity" data-product-id="${item.id}"> <!-- Store product ID in data attribute -->
                                    <button class="btn btn-outline-secondary quantity-increase" type="button">
                                        <i class="fas fa-plus"></i> <!-- Plus icon -->
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 text-end mb-2 mb-md-0">
                            <span class="item-total-price">$${(item.price * item.quantity).toFixed(2)}</span> <!-- Calculate and display line total -->
                        </div>
                        <div class="col-lg-1 col-md-1 text-end">
                            <button class="btn btn-link text-danger remove-item" aria-label="Remove item" data-product-id="${item.id}">
                                <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Insert all the generated HTML into the cart container
    cartContainer.innerHTML = cartHTML; // Replace container's content with our generated HTML

    // Add event listeners for quantity controls and remove buttons
    addCartItemEventListeners(); // Set up the interactive buttons in the cart

    // Update the order summary section with latest totals
    updateOrderSummary(); // Calculate and display subtotal, shipping, tax, etc.
}

// Add event listeners for cart item controls
function addCartItemEventListeners() {
    // Quantity decrease buttons (minus buttons)
    document.querySelectorAll('.quantity-decrease').forEach(button => { // Find all decrease buttons
        button.addEventListener('click', function () { // Add a click event listener to each button
            const input = this.parentElement.querySelector('.quantity-input'); // Find the quantity input next to this button
            const productId = parseInt(input.getAttribute('data-product-id')); // Get the product ID from the input's data attribute
            let value = parseInt(input.value) - 1; // Decrease the current value by 1
            if (value < 1) value = 1; // Don't allow quantities less than 1
            input.value = value; // Update the input field with the new value
            updateCartItemQuantity(productId, value); // Update the cart data with the new quantity
        });
    });

    // Quantity increase buttons (plus buttons)
    document.querySelectorAll('.quantity-increase').forEach(button => { // Find all increase buttons
        button.addEventListener('click', function () { // Add a click event listener to each button
            const input = this.parentElement.querySelector('.quantity-input'); // Find the quantity input next to this button
            const productId = parseInt(input.getAttribute('data-product-id')); // Get the product ID from the input's data attribute
            let value = parseInt(input.value) + 1; // Increase the current value by 1
            input.value = value; // Update the input field with the new value
            updateCartItemQuantity(productId, value); // Update the cart data with the new quantity
        });
    });

    // Quantity input fields (when user types a number directly)
    document.querySelectorAll('.quantity-input').forEach(input => { // Find all quantity input fields
        input.addEventListener('change', function () { // Add change event listener to each input
            const productId = parseInt(this.getAttribute('data-product-id')); // Get the product ID from the input's data attribute
            let value = parseInt(this.value); // Get the typed value and convert to number
            if (isNaN(value) || value < 1) value = 1; // If invalid or less than 1, reset to 1
            this.value = value; // Update the input field with the validated value
            updateCartItemQuantity(productId, value); // Update the cart data with the new quantity
        });
    });

    // Remove buttons (trash icons)
    document.querySelectorAll('.remove-item').forEach(button => { // Find all remove buttons
        button.addEventListener('click', function () { // Add click event listener to each button
            const productId = parseInt(this.getAttribute('data-product-id')); // Get the product ID from the button's data attribute
            removeFromCart(productId); // Call the function to remove this item from cart
        });
    });
}

// Update the order summary in the cart page
function updateOrderSummary() {
    // Find the container element where the order summary should be displayed
    const summaryContainer = document.getElementById('order-summary'); // Get element by its ID
    if (!summaryContainer) return; // If container doesn't exist on this page, exit function

    // Calculate all the order totals (subtotal, shipping, tax, total)
    const { subtotal, shipping, tax, total } = calculateCartTotals(); // Use object destructuring to get all values

    // Generate HTML for the order summary card
    summaryContainer.innerHTML = `
        <div class="card">
            <div class="card-header bg-white">
                <h5 class="mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span> <!-- Format to 2 decimal places -->
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>$${shipping.toFixed(2)}</span> <!-- Format to 2 decimal places -->
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <span>Estimated Tax</span>
                    <span>$${tax.toFixed(2)}</span> <!-- Format to 2 decimal places -->
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3 fw-bold fs-5">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span> <!-- Format to 2 decimal places -->
                </div>
                <button class="btn btn-primary btn-lg w-100" id="checkout-button">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;

    // Add click event listener to the checkout button
    document.getElementById('checkout-button').addEventListener('click', function () {
        showToast('Checkout', 'This isn\'t real.'); // Show a message when button is clicked
    });
}

// Initialize product quantity selector in the product modal
function initProductQuantitySelector() {
    // Quantity decrease button in the product detail modal (minus button)
    document.querySelectorAll('.product-quantity-decrease').forEach(button => { // Find all decrease buttons
        button.addEventListener('click', function () { // Add click event listener to each button
            const input = this.parentElement.querySelector('.product-quantity-input'); // Find the quantity input next to this button
            let value = parseInt(input.value) - 1; // Decrease the current value by 1
            if (value < 1) value = 1; // Don't allow quantities less than 1
            input.value = value; // Update the input field with the new value
        });
    });

    // Quantity increase button in the product detail modal (plus button)
    document.querySelectorAll('.product-quantity-increase').forEach(button => { // Find all increase buttons
        button.addEventListener('click', function () { // Add click event listener to each button
            const input = this.parentElement.querySelector('.product-quantity-input'); // Find the quantity input next to this button
            let value = parseInt(input.value) + 1; // Increase the current value by 1
            input.value = value; // Update the input field with the new value
        });
    });
}

// Setup the cart button in the header
function setupCartButton() {
    // Find the navigation menu in the page
    const navbar = document.querySelector('.navbar-nav'); // Get the navbar element
    if (!navbar) return; // If navbar doesn't exist on this page, exit function

    // Add the cart button to the navigation if it doesn't exist already
    if (!document.getElementById('cart-nav-item')) { // Check if cart button exists
        // Create a new list item element for the cart button
        const cartItem = document.createElement('li'); // Create a new list item
        cartItem.className = 'nav-item ms-lg-2'; // Add CSS classes for styling
        cartItem.id = 'cart-nav-item'; // Set an ID so we can find it later

        // Fill the list item with HTML for the cart icon and counter badge
        cartItem.innerHTML = `
            <a class="nav-link position-relative" href="cart.html">
                <i class="fas fa-shopping-cart"></i> <!-- Shopping cart icon -->
                <span id="cart-counter" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary d-none">
                    0
                </span> <!-- Counter badge, initially hidden -->
            </a>
        `;

        // Add the new cart button to the navbar
        navbar.appendChild(cartItem); // Add the element to the end of the navbar
    }

    // Update the cart counter to show the current number of items
    updateCartCounter(); // Call the function to update the counter display
}

// Listen for product modal related events - This runs when the page finishes loading
document.addEventListener('DOMContentLoaded', function () { // When the DOM (page content) is fully loaded
    // Initialize the cart from localStorage
    initCart(); // Load cart data from browser storage

    // Set up the cart button in the navigation
    setupCartButton(); // Add the cart icon to the navbar

    // If the product detail modal exists, set up the add to cart functionality
    const productModal = document.getElementById('productModal'); // Look for product modal on page
    if (productModal) { // If product modal exists on this page
        // Handle modal hidden event to ensure proper cleanup of backdrop
        productModal.addEventListener('hidden.bs.modal', function () { // When modal is hidden
            // Check if backdrop still exists and remove it if it does
            const backdrop = document.querySelector('.modal-backdrop'); // Look for modal backdrop
            if (backdrop) {
                backdrop.remove(); // Remove backdrop if found
            }
            // Restore body classes to fix scrolling issues
            document.body.classList.remove('modal-open'); // Remove modal-open class from body
            document.body.style.overflow = ''; // Reset overflow style
            document.body.style.paddingRight = ''; // Reset padding-right style
        });

        // When modal is about to be shown
        productModal.addEventListener('show.bs.modal', function () { // When modal is about to be shown
            setTimeout(() => { // Small timeout to make sure modal is ready
                // Find the "Add to Cart" button and quantity input in the modal
                const addToCartBtn = document.querySelector('.modal-body .btn-primary'); // Find add to cart button
                const quantityInput = document.querySelector('.modal-body .form-control'); // Find quantity input field

                // Set up the "Add to Cart" button if it exists and doesn't already have event listener
                if (addToCartBtn && !addToCartBtn._hasClickEvent) {
                    // Add click event listener to the button
                    addToCartBtn.addEventListener('click', function () {
                        // Get product ID from button's data attribute
                        const productId = parseInt(this.getAttribute('data-product-id')); // Get product ID as number
                        // Get quantity from input (default to 1 if input doesn't exist)
                        const quantity = parseInt(quantityInput ? quantityInput.value : 1); // Get quantity as number

                        // Try to add the item to cart
                        if (addToCart(productId, quantity)) {
                            // Successfully added to cart
                            // Optionally close the modal after adding to cart
                            // bootstrap.Modal.getInstance(productModal).hide();
                        }
                    });

                    // Mark the button to avoid adding multiple event listeners
                    addToCartBtn._hasClickEvent = true; // Set custom property to track if listener is added
                }

                // Initialize quantity selector buttons in the modal
                const decreaseBtn = document.querySelector('.modal-body .btn:first-child'); // Find decrease button
                const increaseBtn = document.querySelector('.modal-body .btn:last-child'); // Find increase button

                // Set up the decrease (minus) button
                if (decreaseBtn && !decreaseBtn._hasClickEvent) {
                    decreaseBtn.addEventListener('click', function () {
                        const input = document.querySelector('.modal-body .form-control'); // Find quantity input
                        let value = parseInt(input.value) - 1; // Subtract 1 from current value
                        if (value < 1) value = 1; // Don't go below 1
                        input.value = value; // Update the input value
                    });
                    decreaseBtn._hasClickEvent = true; // Mark as having event listener
                }

                // Set up the increase (plus) button
                if (increaseBtn && !increaseBtn._hasClickEvent) {
                    increaseBtn.addEventListener('click', function () {
                        const input = document.querySelector('.modal-body .form-control'); // Find quantity input
                        let value = parseInt(input.value) + 1; // Add 1 to current value
                        input.value = value; // Update the input value
                    });
                    increaseBtn._hasClickEvent = true; // Mark as having event listener
                }
            }, 100); // Small delay of 100ms to ensure DOM is ready
        });
    }

    // If we're on the cart page, display the cart items
    if (document.getElementById('cart-items-container')) { // Check if we're on cart page
        displayCartItems(); // Show cart items on page
    }
});
