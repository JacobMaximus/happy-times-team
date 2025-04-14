
const products = [
    {
        id: 1,
        name: "Classic Chocolate Cake",
        description: "Rich, moist chocolate cake layered with chocolate ganache and decorated with chocolate shavings.",
        price: 35.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80"
    },
    {
        id: 2,
        name: "Strawberry Dream",
        description: "Light vanilla sponge filled with fresh strawberries and cream, topped with strawberry buttercream.",
        price: 38.99,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80"
    },
    {
        id: 3,
        name: "Red Velvet Delight",
        description: "Classic red velvet cake with cream cheese frosting and elegant decorations.",
        price: 40.99,
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80"
    },
    {
        id: 4,
        name: "Vanilla Bean Special",
        description: "Premium vanilla bean cake with vanilla buttercream and edible flowers.",
        price: 36.99,
        image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=500&q=80"
    },
    {
        id: 5,
        name: "Fruit Paradise",
        description: "Light sponge cake topped with an assortment of fresh seasonal fruits.",
        price: 42.99,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80"
    },
    {
        id: 6,
        name: "Butterscotch Bliss",
        description: "Butterscotch flavored cake with caramel drizzle and toffee bits.",
        price: 37.99,
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=80"
    }
];

// Populate menu grid
function populateMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = products.map(product => `
        <div class="menu-item" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="menu-item-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">$${product.price}</span>
            </div>
        </div>
    `).join('');
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const productDetails = document.getElementById('productDetails');

    productDetails.innerHTML = `
        <div>
            <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-info">
            <h2>${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price}</p>
            <div class="product-options">
                <div class="option-group">
                    <label>Type:</label>
                    <div class="radio-group">
                        <input type="radio" id="withEgg" name="eggOption" value="withEgg" checked>
                        <label for="withEgg">With Egg</label>
                        <input type="radio" id="eggless" name="eggOption" value="eggless">
                        <label for="eggless">Eggless</label>
                    </div>
                </div>
                
                <div class="option-group">
                    <label for="weight">Weight (kg):</label>
                    <input type="number" id="weight" min="0.5" max="10" step="0.5" value="1">
                </div>

                <div class="option-group">
                    <label for="phone">Your Phone Number:</label>
                    <input type="tel" id="phone" placeholder="Enter your phone number">
                </div>

                <div class="option-group">
                    <label for="notes">Special Instructions:</label>
                    <textarea id="notes" placeholder="Enter any special requirements or customization details"></textarea>
                </div>

                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

// Close product modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const weight = parseFloat(document.getElementById('weight').value);
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;
    const eggless = document.getElementById('eggless').checked;

    // Calculate price based on weight
    const totalPrice = product.price * weight;

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        weight: weight,
        totalPrice: totalPrice,
        phone: phone,
        notes: notes,
        eggless: eggless,
        image: product.image,
        quantity: 1
    };

    // Get existing cart or initialize new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists
    const existingItemIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        item.weight === cartItem.weight && 
        item.eggless === cartItem.eggless &&
        item.notes === cartItem.notes
    );

    if (existingItemIndex !== -1) {
        // Update existing item
        cart[existingItemIndex].quantity += 1;
        cart[existingItemIndex].totalPrice = cart[existingItemIndex].price * cart[existingItemIndex].weight * cart[existingItemIndex].quantity;
    } else {
        // Add new item
        cart.push(cartItem);
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Added to cart successfully!');
    closeModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize menu
populateMenu();