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
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderHome();
    updateCartBadge();
    updateUserMenu();
});

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
            error.textContent = this.capitalizeField(field) + ' is required';
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
function submitCheckout(event) {
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

    // Create order
    const orderId = 'ORD-' + Date.now();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.1;

    const order = {
        id: orderId,
        personalInfo: personalInfo,
        items: cart,
        total: total,
        email: personalInfo.email,
        createdAt: new Date().toISOString()
    };

    // Save order
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Add to orders list for user profile
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Show confirmation
    showConfirmation(order);

    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();
}

function showConfirmation(order) {
    const info = order.personalInfo;
    document.getElementById('order-id').textContent = order.id;
    document.getElementById('order-name').textContent = info.firstName + ' ' + info.lastName;
    document.getElementById('order-email').textContent = info.email;
    document.getElementById('order-address').textContent = `${info.address}, ${info.city}, ${info.state} ${info.zipCode}, ${info.country}`;
    document.getElementById('order-total').textContent = '$' + order.total.toFixed(2);

    showPage('confirmation-page');
}

// ========== AUTHENTICATION ==========

function showLogin() {
    showPage('login-page');
    document.getElementById('login-form').reset();
    document.getElementById('login-error-message').style.display = 'none';
}

function showSignup() {
    showPage('signup-page');
    document.getElementById('signup-form').reset();
    document.getElementById('signup-error-message').style.display = 'none';
}

function showProfile() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    showPage('profile-page');
    updateProfileDisplay();
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error-message');
    
    const API_URL = 'http://localhost:3000/api';
    
    // Try to login with MongoDB
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
            return;
        }
        
        // Login successful - ensure username is properly set
        if (!data.userId || !data.username) {
            errorDiv.textContent = 'Invalid login response from server';
            errorDiv.style.display = 'block';
            return;
        }
        
        currentUser = {
            id: data.userId,
            username: data.username,
            email: data.username,  // Use username as email for MongoDB users
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserMenu();
        showHome();
    })
    .catch(error => {
        console.error('Login Error:', error);
        // Fallback to localStorage if backend not available
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        
        if (!user || user.password !== password) {
            errorDiv.textContent = 'Invalid email or password';
            errorDiv.style.display = 'block';
            return;
        }
        
        currentUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserMenu();
        showHome();
    });
}

function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('signup-firstname').value.trim();
    const lastName = document.getElementById('signup-lastname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const errorDiv = document.getElementById('signup-error-message');
    
    errorDiv.style.display = 'none';
    
    // Validation
    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Try to register with MongoDB
    const API_URL = 'http://localhost:3000/api';
    
    fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
            return;
        }
        
        // User created successfully
        currentUser = {
            id: data.userId,
            firstName: firstName,
            lastName: lastName,
            username: email,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserMenu();
        showHome();
    })
    .catch(error => {
        console.error('Signup Error:', error);
        // Fallback to localStorage if backend not available
        const newUser = {
            id: 'USER-' + Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        currentUser = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            createdAt: newUser.createdAt
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserMenu();
        showHome();
    });
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserMenu();
    showHome();
}

function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function updateUserMenu() {
    const userButton = document.getElementById('user-button');
    const userDropdown = document.getElementById('user-dropdown');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const userOptions = document.getElementById('user-options');
    const userEmail = document.getElementById('user-email-display');
    
    userDropdown.style.display = 'none';
    
    console.log('updateUserMenu called, currentUser:', currentUser);
    
    if (currentUser) {
        // User is logged in - get display name from available fields
        let displayName = currentUser.firstName || currentUser.username;
        
        console.log('displayName before processing:', displayName);
        
        // If username is email, extract part before @
        if (displayName && displayName.includes('@')) {
            displayName = displayName.split('@')[0];
        }
        
        // Capitalize first letter
        if (displayName) {
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        }
        
        console.log('displayName after processing:', displayName);
        
        userButton.innerHTML = `👤 <span>${displayName}</span>`;
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        userOptions.style.display = 'block';
        
        // Show username or email
        const email = currentUser.email || currentUser.username;
        userEmail.textContent = email;
    } else {
        // User is not logged in
        console.log('No currentUser, showing login/signup');
        userButton.innerHTML = '👤';
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        userOptions.style.display = 'none';
    }
}

function updateProfileDisplay() {
    if (!currentUser) return;
    
    // Get user display info with fallback values
    const firstName = currentUser.firstName || (currentUser.username ? currentUser.username.split('@')[0] : 'User');
    const lastName = currentUser.lastName || '';
    const email = currentUser.email || currentUser.username || 'No email';
    
    // Capitalize names
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const capitalizedLastName = lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : '';
    
    document.getElementById('profile-name').textContent = capitalizedFirstName + (capitalizedLastName ? ' ' + capitalizedLastName : '');
    document.getElementById('profile-email').textContent = email;
    
    const createdDate = currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : new Date().toLocaleDateString();
    document.getElementById('profile-created').textContent = createdDate;
    
    // Get user's orders
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.email === email);
    
    const orderHistoryDiv = document.getElementById('order-history');
    
    if (userOrders.length === 0) {
        orderHistoryDiv.innerHTML = '<p>No orders yet. Start shopping!</p>';
    } else {
        orderHistoryDiv.innerHTML = userOrders.map(order => `
            <div class="order-item">
                <div class="order-item-header">
                    <span class="order-item-id">${order.id}</span>
                    <span class="order-item-date">${new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="order-item-amount">${'$' + order.total.toFixed(2)}</div>
            </div>
        `).join('');
    }
}
