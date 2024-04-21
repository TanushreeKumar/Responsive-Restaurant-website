// JavaScript for cart page
const cartItems = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.checkout-btn');
const cartIcon = document.querySelector('#cart-icon');
const cartContainer = document.querySelector('.cart-container');
let cart = [];

// Function to load cart items from localStorage
function loadCartFromStorage() {
  const cartItemsFromStorage = localStorage.getItem('cartItems');
  if (cartItemsFromStorage) {
    cart = JSON.parse(cartItemsFromStorage);
    updateCart();
  }
}

// Function to save cart items to localStorage
function saveCartToStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Add event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('#cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Function to add an item to the cart
function addToCart(event) {
  const itemMenu = event.target.parentElement.parentElement;
  const itemName = itemMenu.querySelector('h3').textContent;
  const itemPrice = parseFloat(itemMenu.querySelector('.price').textContent.replace('₹', ''));

  // Check if the item is already in the cart
  const existingItem = cart.find(item => item.name === itemName);

  if (existingItem) {
    // If the item is already in the cart, update the quantity
    existingItem.quantity++;
  } else {
    // If the item is not in the cart, add a new item
    const newItem = {
      name: itemName,
      price: itemPrice,
      quantity: 1
    };
    cart.push(newItem);
  }

  // Update cart and save to localStorage
  updateCart();
  saveCartToStorage();
}

// Function to update the cart display
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
      <span class="cart-item cart-header cart-column">${item.name}</span>
      <span class="cart-price cart-header cart-column">₹${item.price}</span>
      <div class="cart-quantity cart-header cart-column">
        <button class="quantity-btn decrease-btn">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn increase-btn">+</button>
      </div>
      <span class="cart-total cart-header cart-column">₹${item.price * item.quantity}</span>
    `;
    cartItems.appendChild(cartRow);
    total += item.price * item.quantity;
  });

  totalPrice.textContent = total.toFixed(2);

  // Add event listeners to quantity buttons after updating the cart
  const decreaseButtons = document.querySelectorAll('.decrease-btn');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', decreaseQuantity);
  });

  const increaseButtons = document.querySelectorAll('.increase-btn');
  increaseButtons.forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });
}

// Function to decrease item quantity
function decreaseQuantity(event) {
  const itemName = event.target.parentElement.parentElement.querySelector('.cart-item').textContent;
  const item = cart.find(item => item.name === itemName);
  if (item.quantity > 1) {
    item.quantity--;
    updateCart();
    saveCartToStorage();
  } else {
    // Remove the item from the cart if quantity is 1
    const itemIndex = cart.indexOf(item);
    cart.splice(itemIndex, 1);
    updateCart();
    saveCartToStorage();
  }
}

// Function to increase item quantity
function increaseQuantity(event) {
  const itemName = event.target.parentElement.parentElement.querySelector('.cart-item').textContent;
  const item = cart.find(item => item.name === itemName);
  item.quantity++;
  updateCart();
  saveCartToStorage();
}

// Function to clear cart and localStorage
function clearCart() {
  cart = [];
  updateCart();
  localStorage.removeItem('cartItems');
}

// Add event listener to the checkout button
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add some items before checking out.');
    return;
  }

  // Redirect to the checkout page
  window.location.href = `checkout.html?totalPrice=${totalPrice.textContent}`;
});

// Additional code for cart icon functionality
cartIcon.addEventListener('click', () => {
  cartContainer.classList.toggle('show');
});

// Load cart items from localStorage when the page loads
window.addEventListener('load', () => {
  loadCartFromStorage();
});
