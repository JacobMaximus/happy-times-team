function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const cartCount = document.getElementById('cartCount');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `🛒 Cart (${totalItems})`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
        cartSummary.innerHTML = '';
        return;
    }

    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3 class="item-title">${item.name}</h3>
                <p class="item-price">$${item.totalPrice.toFixed(2)}</p>
                <p>Weight: ${item.weight}kg</p>
                <p>Type: ${item.eggless ? 'Eggless' : 'With Egg'}</p>
                ${item.notes ? `<p>Special Instructions: ${item.notes}</p>` : ''}
                ${item.phone ? `<p>Contact: ${item.phone}</p>` : ''}
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.weight}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.weight}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeItem(${item.id}, ${item.weight})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = subtotal > 0 ? 12.99 : 0;
    const tax = subtotal * 0.09; // 9% tax
    const total = subtotal + shipping + tax;

    // Render summary
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal (${totalItems} items):</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>$${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax:</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total-row">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
}

function updateQuantity(productId, weight, newQuantity) {
    if (newQuantity < 1) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId && item.weight === weight);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        cart[itemIndex].totalPrice = cart[itemIndex].price * cart[itemIndex].weight * newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function removeItem(productId, weight) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === productId && item.weight === weight));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', updateCart);