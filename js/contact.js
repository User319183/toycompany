/**
 * Contact Form Handling Script
 * This script manages the contact form submission, validation, and feedback.
 */

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function () {
    // This line adds an event listener that waits for the whole page to load
    // 'DOMContentLoaded' means "wait until all HTML elements are loaded"
    // The function() {...} is what will run once the page is loaded

    // Get reference to the contact form element
    const contactForm = document.getElementById('contactForm');
    // This line finds the HTML form with id="contactForm" and stores it in a variable
    // We use const to declare a variable that won't be reassigned
    // getElementById is a method that searches the page for an element with a specific ID

    // Check if the contact form exists on the current page
    if (contactForm) {
        // This if statement checks if the contactForm was found
        // If contactForm is null (not found), the code inside won't run
        // This prevents errors if this script runs on pages without the contact form

        // Add submit event listener to the contact form
        contactForm.addEventListener('submit', function (event) {
            // This adds another event listener, but this one listens for form submissions
            // When someone submits the form, the function(event) {...} will run

            // Prevent the default form submission behavior
            event.preventDefault();
            // This stops the form from actually submitting to a server and refreshing the page
            // preventDefault() is a method that cancels the default action of an event

            // Get form field values
            const name = document.getElementById('name').value;
            // This finds the input with id="name" and gets what the user typed in it
            // .value retrieves the text from an input field

            const email = document.getElementById('email').value;
            // This gets the email the user entered in the email input field

            const subject = document.getElementById('subject').value;
            // This gets the subject the user entered in the subject input field

            const message = document.getElementById('message').value;
            // This gets the message the user entered in the message input field

            // Validate required fields
            if (!name || !email || !message) {
                // This if statement checks if any required fields are empty
                // The ! symbol means "not" - so !name means "if name is empty"
                // The || symbol means "or" - so this checks if ANY of the fields are empty

                showMessage('Please fill in all required fields.', 'danger');
                // If any required field is empty, call the showMessage function
                // 'danger' makes the message red (Bootstrap's danger color)

                return;
                // This stops the function from continuing - the form won't submit
            }

            // Validate email format
            if (!isValidEmail(email)) {
                // This checks if the email is not valid by calling our isValidEmail function
                // isValidEmail() returns true if the email looks correct, or false if it doesn't
                // The ! inverts this - so this condition is true when the email is invalid

                showMessage('Please enter a valid email address.', 'danger');
                // Show an error message if the email format is wrong

                return;
                // Stop the function from continuing - the form won't submit
            }

            // Show sending message to user
            showMessage('Sending your message...', 'info');
            // This shows a blue info message saying the message is being sent
            // 'info' makes the message blue (Bootstrap's info color)

            // Form submission with a timeout
            setTimeout(function () {
                // setTimeout runs the function inside it after a delay (1500 milliseconds)

                // Reset the form fields
                contactForm.reset();
                // This clears all the inputs in the form so the user can submit another message
                // .reset() is a method that resets all form fields to their default values

                // Show success message to the user
                showMessage('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
                // Show a green success message to let the user know their message was "sent"
                // 'success' makes the message green (Bootstrap's success color)
            }, 1500);
            // 1500 is the number of milliseconds to wait (1.5 seconds)
        });
        // This closing bracket and parenthesis ends the submit event listener function
    }
    // This closing curly brace ends the if(contactForm) block

    // Displays a message to the user
    function showMessage(text, type) {
        // This creates a new function called showMessage that takes two parameters:
        // 1. text - the message to display
        // 2. type - what kind of message (success, danger, info, etc.)
        // This function is defined inside the DOMContentLoaded event, making it local to this script

        // Remove any existing alert messages
        const existingMessage = document.querySelector('.alert');
        // This finds the first element with class="alert" (any previous message)
        // querySelector searches the page using CSS selectors (like in CSS stylesheets)

        if (existingMessage) {
            // This checks if an existing message was found
            existingMessage.remove();
            // If a previous message exists, this removes it from the page
            // .remove() is a method that deletes an element from the HTML
        }

        // Create a new alert message element
        const messageDiv = document.createElement('div');
        // This creates a new <div> element to hold our message
        // createElement makes a new HTML element in memory (not yet on the page)

        messageDiv.className = `alert alert-${type} mt-3`;
        // This sets the CSS classes for our message div
        // alert and alert-${type} are Bootstrap classes for styled alerts
        // ${type} inserts the value of the type parameter (danger, success, info)
        // mt-3 adds margin-top (spacing) from Bootstrap

        messageDiv.role = 'alert';
        // This sets the ARIA role attribute for accessibility
        // It helps screen readers identify this as an alert message

        messageDiv.textContent = text;
        // This sets the text inside the div to be our message
        // Using textContent is safer than innerHTML as it prevents code injection

        // Add the message before the form
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        // This adds our new message div to the page, just before the form
        // parentNode gets the parent element that contains the form
        // insertBefore puts our message before the form element

        // Auto-remove success and info messages after 5 seconds
        if (type === 'success' || type === 'info') {
            // This checks if the message is a success or info message
            // === means "exactly equals" (same value and same type)
            // || means "or" - so this runs if type is EITHER "success" OR "info"

            setTimeout(function () {
                // setTimeout runs the code inside after a delay
                messageDiv.remove();
                // This removes the message element from the page after the delay
            }, 5000);
            // 5000 is the number of milliseconds to wait (5 seconds)
        }
    }
    // This closing curly brace ends the showMessage function

    // Validates an email address format
    function isValidEmail(email) {
        // This creates a function to check if an email address looks valid
        // It takes one parameter: the email address to validate

        // Simple regex pattern for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // This creates a regular expression (regex) pattern that describes what a valid email looks like
        // Regular expressions are patterns used to match character combinations in strings
        // This pattern checks for: something + @ + something + . + something (with no spaces)

        return emailRegex.test(email);
        // .test() is a method that checks if the email matches our pattern
        // This returns true if the email matches the pattern, false if it doesn't
    }
    // This closing curly brace ends the isValidEmail function
});
// This final closing bracket and parenthesis ends the entire DOMContentLoaded event listener
