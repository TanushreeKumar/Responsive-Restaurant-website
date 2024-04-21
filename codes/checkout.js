// JavaScript for checkout page

window.addEventListener('load', function() {
    const totalPriceInput = document.getElementById('total-price');
    const checkoutForm = document.getElementById('checkout-form');

    // Get the total price from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const totalPriceValue = urlParams.get('total-Price');

    // Set the total price in the input field
    totalPriceInput.value = `₹${totalPriceValue}`;

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the form data
        const formData = new FormData(checkoutForm);
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const address = formData.get('address');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const totalPrice = formData.get('total-price');

        // Do something with the form data, e.g., send it to a server
        console.log('Order Details:');
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Address:', address);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Total Price:', totalPrice);

        // Show a thank you message
        alert('Thank you for your order!');

        // Reset the form
        checkoutForm.reset();
    });
});

// Get the total price from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const totalPriceValue = urlParams.get('totalPrice');

// Debugging: Log the total price value
console.log('Total Price in Checkout Page:', totalPriceValue);

// Set the total price in the input field
totalPriceInput.value = `₹${totalPriceValue}`;
