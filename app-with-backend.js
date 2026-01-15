// Configuration
const API_URL = 'http://localhost:3000/api';
const USE_BACKEND = true; // Set to false to use localStorage only

// Product Data
const products = [
    {
        id: '1',
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        category: 'Electronics',
        emoji: '🎧',
        stock: 50
    },
    {
        id: '2',
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with fitness tracking',
        price: 199.99,
        category: 'Electronics',
        emoji: '⌚',
        stock: 30
    },
    {
        id: '3',
        name: 'USB-C Cable',
        description: 'Durable 3-meter USB-C charging cable',
        price: 19.99,
        category: 'Accessories',
        emoji: '🔌',
        stock: 100
    },
    {
        id: '4',
        name: 'Phone Case',
        description: 'Protective phone case with premium design',
        price: 29.99,
        category: 'Accessories',
        emoji: '📱',
        stock: 75
    },
    {
        id: '5',
        name: 'Portable Charger',
        description: '20000mAh portable power bank with fast charging',
        price: 49.99,
        category: 'Electronics',
        emoji: '🔋',
        stock: 45
    },
    {
        id: '6',
        name: 'Screen Protector',
        description: 'Tempered glass screen protector for smartphones',
        price: 9.99,
        category: 'Accessories',
        emoji: '🛡️',
        stock: 150
    }
];

// Cart Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = null;
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderHome();
    updateCartBadge();
    checkBackendConnection();
});

// Check Backend Connection
async function checkBackendConnection() {
    if (!USE_BACKEND) return;
    
    try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
            console.log('✅ Connected to backend server');
        }
    } catch (error) {
        console.warn('⚠️ Backend server not available. Using localStorage only.');
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
}

function showHome() {
    showPage('home-page');
    document.getElementById('nav-home').classList.add('active');
    renderHome();
}

function showProducts() {
    showPage('products-page');
    document.getElementById('nav-products').classList.add('active');
    renderProducts();
}

function showCart() {
    showPage('cart-page');
    renderCart();
}

function showCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    showPage('checkout-page');
    renderCheckout();
}

// Home Page Rendering
function renderHome() {
    renderCategories();
    renderFeaturedProducts();
}

function renderCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    const container = document.getElementById('categories-grid');
    const filterContainer = document.getElementById('categories-filter');
    
    container.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="filterByCategory('${cat}')">
            <div style="font-size: 40px;">📁</div>
            <h3>${cat}</h3>
        </div>
    `).join('');

    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn" onclick="filterByCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function renderFeaturedProducts() {
    const featured = products.slice(0, 6);
    const container = document.getElementById('featured-products');
    
    container.innerHTML = featured.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-content">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock > 0 ? product.stock + ' in stock' : 'Out of stock'}
                    </div>
                </div>
                ${product.stock > 0 ? `
                    <div class="quantity-selector">
                        <input type="number" id="qty-${product.id}" min="1" max="${product.stock}" value="1">
                        <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Products Page
function renderProducts() {
    const filtered = filterProducts();
    const container = document.getElementById('products-grid');
    const noProducts = document.getElementById('no-products');

    if (filtered.length === 0) {
        container.innerHTML = '';
        noProducts.style.display = 'block';
        return;
    }

    noProducts.style.display = 'none';
    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-content">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock > 0 ? product.stock + ' in stock' : 'Out of stock'}
                    </div>
                </div>
                ${product.stock > 0 ? `
                    <div class="quantity-selector">
                        <input type="number" id="qty-${product.id}" min="1" max="${product.stock}" value="1">
                        <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function filterByCategory(category) {
    currentFilter = category;
    updateFilterButtons();
    renderProducts();
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const allBtn = document.querySelector('.filter-btn');
    if (currentFilter === null) {
        allBtn.classList.add('active');
    } else {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            if (btn.textContent === currentFilter) {
                btn.classList.add('active');
            }
        });
    }
}

function filterProducts() {
    return products.filter(product => {
        const matchesCategory = currentFilter === null || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

function searchProducts() {
    searchQuery = document.getElementById('search-input').value;
    renderProducts();
}

function clearFilters() {
    currentFilter = null;
    searchQuery = '';
    document.getElementById('search-input').value = '';
    updateFilterButtons();
    renderProducts();
}

// Cart Operations
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(quantityInput.value) || 1;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: quantity
        });
    }

    saveCart();
    updateCartBadge();
    
    // Show confirmation
    quantityInput.value = '1';
    const button = quantityInput.nextElementSibling;
    const originalText = button.textContent;
    button.textContent = '✓ Added';
    button.style.backgroundColor = 'var(--success-color)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCart();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCart();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = itemCount;
    badge.style.display = itemCount > 0 ? 'flex' : 'none';
}

// Cart Page Rendering
function renderCart() {
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'grid';

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateCartQuantity('${item.id}', parseInt(this.value))">
                    <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button class="btn btn-danger cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Checkout Page
function renderCheckout() {
    renderCheckoutItems();
    updateCheckoutSummary();
}

function renderCheckoutItems() {
    const container = document.getElementById('checkout-items');
    container.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('checkout-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('checkout-tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('checkout-total').textContent = '$' + total.toFixed(2);
}

// Form Validation
function validateCheckoutForm() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
    let isValid = true;

    // Clear previous errors
    fields.forEach(field => {
        const input = document.getElementById(field);
        input.classList.remove('error');
        document.getElementById(`error-${field}`).classList.remove('show');
    });

    // Validate each field
    fields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(`error-${field}`);
        const value = input.value.trim();

        if (!value) {
            isValid = false;
            input.classList.add('error');
            error.textContent = capitalizeField(field) + ' is required';
            error.classList.add('show');
        }
    });

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('error-email');
    if (email.value && !isValidEmail(email.value)) {
        isValid = false;
        email.classList.add('error');
        emailError.textContent = 'Invalid email format';
        emailError.classList.add('show');
    }

    return isValid;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function capitalizeField(field) {
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
}

// Submit Checkout
async function submitCheckout(event) {
    event.preventDefault();

    if (!validateCheckoutForm()) {
        alert('Please fill in all required fields correctly');
        return;
    }

    // Get form data
    const personalInfo = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        country: document.getElementById('country').value
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = subtotal * 1.1;

    const orderData = {
        personalInfo: personalInfo,
        items: cart,
        totalAmount: totalAmount
    };

    // Try to save to backend first
    if (USE_BACKEND) {
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Order saved to MongoDB:', result.orderId);
                showConfirmation(result.order);
                cart = [];
                saveCart();
                updateCartBadge();
                return;
            }
        } catch (error) {
            console.warn('⚠️ Backend unavailable, saving to localStorage:', error.message);
        }
    }

    // Fallback to localStorage
    const orderId = 'ORD-' + Date.now();
    const order = {
        id: orderId,
        personalInfo: personalInfo,
        items: cart,
        total: totalAmount,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem('lastOrder', JSON.stringify(order));
    showConfirmation(order);

    cart = [];
    saveCart();
    updateCartBadge();
}

function showConfirmation(order) {
    const info = order.personalInfo;
    document.getElementById('order-id').textContent = order._id || order.id;
    document.getElementById('order-name').textContent = info.firstName + ' ' + info.lastName;
    document.getElementById('order-email').textContent = info.email;
    document.getElementById('order-address').textContent = `${info.address}, ${info.city}, ${info.state} ${info.zipCode}, ${info.country}`;
    document.getElementById('order-total').textContent = '$' + (order.totalAmount || order.total).toFixed(2);

    showPage('confirmation-page');
}
