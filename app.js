import { products } from './product.js';
import { addToCart, clearCart, getCart } from './cart.js';

const productListElement = document.getElementById('product-list');
const cartElement = document.getElementById('cart');
const clearCartButton = document.getElementById('clear-cart');

// Display products
function displayProducts() {
    productListElement.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
      <span>${product.name}</span>
      <span>$${product.price}</span>
      <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
        productListElement.appendChild(productItem);
    });
}

// Display cart items
function displayCart() {
    cartElement.innerHTML = '';
    const cartItems = getCart();
    cartItems.forEach(cartItem => {
        const { product, quantity } = cartItem;
        const cartItemElement = document.createElement('div');
        const total = product.price * quantity;
        cartItemElement.innerHTML = `
      <span>${product.name} (Quantity: ${quantity})</span>
      <span>$${product.price} each</span>
      <span>Total: $${total}</span>
    `;
        cartElement.appendChild(cartItemElement);
    });
    const totalAmount = cartItems.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
    }, 0);
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<strong>Total Amount: $${totalAmount}</strong>`;
    cartElement.appendChild(totalElement);
}

// Add to cart button click event
function handleAddToCart(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        const product = products.find(product => product.id === productId);
        const quantity = 1; // You can modify this to handle variable quantities
        addToCart(product, quantity);
        displayCart();
    }
}

// Clear cart button click event
function handleClearCart() {
    clearCart();
    displayCart();
}

// Event listeners
productListElement.addEventListener('click', handleAddToCart);
clearCartButton.addEventListener('click', handleClearCart);

// Initial display
displayProducts();
displayCart();
