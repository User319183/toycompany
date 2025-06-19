/**
 * Contact Form Handling Script
 * This script manages the contact form submission, validation, and feedback.
 */

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the contact form element
    const contactForm = document.getElementById('contactForm');

    // Check if the contact form exists on the current page
    if (contactForm) {
        // Add submit event listener to the contact form
        contactForm.addEventListener('submit', function (event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Get form field values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate required fields
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'danger');
                return;
            }

            // Validate email format
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'danger');
                return;
            }

            // Show sending message to user
            showMessage('Sending your message...', 'info');

            // Simulate form submission with a timeout (would be replaced with actual AJAX in production)
            setTimeout(function () {
                // Reset the form fields
                contactForm.reset();

                // Show success message to the user
                showMessage('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
            }, 1500);
        });
    }

    // Displays a message to the user
    function showMessage(text, type) {
        // Remove any existing alert messages
        const existingMessage = document.querySelector('.alert');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create a new alert message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type} mt-3`;
        messageDiv.role = 'alert';
        messageDiv.textContent = text;

        // Add the message before the form
        contactForm.parentNode.insertBefore(messageDiv, contactForm);

        // Auto-remove success and info messages after 5 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(function () {
                messageDiv.remove();
            }, 5000);
        }
    }

    // Validates an email address format
    function isValidEmail(email) {
        // Simple regex pattern for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
