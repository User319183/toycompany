document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'danger');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'danger');
                return;
            }

            showMessage('Sending your message...', 'info');

            setTimeout(function () {
                contactForm.reset();

                showMessage('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
            }, 1500);
        });
    }

    function showMessage(text, type) {
        const existingMessage = document.querySelector('.alert');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type} mt-3`;
        messageDiv.role = 'alert';
        messageDiv.textContent = text;

        contactForm.parentNode.insertBefore(messageDiv, contactForm);

        if (type === 'success' || type === 'info') {
            setTimeout(function () {
                messageDiv.remove();
            }, 5000);
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
