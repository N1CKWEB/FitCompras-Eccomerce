// carrito.js - Shopping cart functionality

// Get cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    console.log("Carrito cargado:", cart);
    
    // Update cart counter in header
    updateCartCounter();
}

// Add product to cart
function addToCart(productId) {
    // If called from product page with a product object
    if (typeof productId === 'object') {
        const product = productId;
        const existingProduct = cart.find(item => item.id == product.id);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartCounter();
        showAddToCartConfirmation(product.name);
        return;
    }
    
    // If called from app.js with a product ID
    const allProducts = window.allProducts || [];
    const product = allProducts.find(p => p.id == productId);
    
    if (!product) return;
    
    const existingProduct = cart.find(item => item.id == productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.nombre,
            price: product.precio,
            image: product.imagenBase64,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCounter();
    showAddToCartConfirmation(product.nombre);
}

// Remove one item from cart
function removeFromCart(productIndex) {
    const product = cart[productIndex];
    
    if (!product) return;
    
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart.splice(productIndex, 1);
    }
    
    saveCart();
    
    // If we're on the cart page, update the display
    if (document.getElementById('cart-items')) {
        renderCart();
    } else if (document.getElementById('productos-tabla')) {
        // If we're on the checkout page, reload it
        loadCartForPurchase();
    }
    
    updateCartCounter();
}

// Remove all of a product from cart
function removeAllFromCart(productIndex) {
    const product = cart[productIndex];
    
    if (!product) return;
    
    cart.splice(productIndex, 1);
    saveCart();
    
    // If we're on the cart page, update the display
    if (document.getElementById('cart-items')) {
        renderCart();
    } else if (document.getElementById('productos-tabla')) {
        // If we're on the checkout page, reload it
        loadCartForPurchase();
    }
    
    updateCartCounter();
}

// Render cart contents on cart page
function renderCart() {
    const cartItemsElement = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    
    if (!cartItemsElement || !cartTotalElement) {
        console.warn("No se encontraron elementos del carrito en esta página.");
        return;
    }
    
    cartItemsElement.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = `
            <li class="empty-cart">
                <p>Tu carrito está vacío</p>
                <a href="/index.html" class="btn-continue-shopping">Continuar comprando</a>
            </li>
        `;
        cartTotalElement.textContent = "0.00";
        return;
    }
    
    let total = 0;
    
    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        
        // Get image URL
        let imageUrl = '/placeholder.svg?height=50&width=50';
        if (product.image) {
            const API_URL = {
                STORAGE: 'http://localhost:8080/api/storage'
            };
            imageUrl = `${API_URL.STORAGE}/view/${encodeURIComponent(product.image)}`;
        }
        
        const li = document.createElement("li");
        li.className = "cart-item";
        
        li.innerHTML = `
            <div class="cart-item-image">
                <img src="${imageUrl}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h4>${product.name}</h4>
                <div class="cart-item-price">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <span class="quantity">x ${product.quantity}</span>
                </div>
                <div class="cart-item-subtotal">
                    Subtotal: $${(product.price * product.quantity).toFixed(2)}
                </div>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeFromCart(${index})" class="btn-remove">-</button>
                <button onclick="addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image || ''}'})" class="btn-add">+</button>
                <button onclick="removeAllFromCart(${index})" class="btn-remove-all">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsElement.appendChild(li);
    });
    
    cartTotalElement.textContent = total.toFixed(2);
}

// Show confirmation when product is added to cart
function showAddToCartConfirmation(productName) {
    // Create or get existing notification element
    let notification = document.querySelector('.cart-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'cart-notification';
        document.body.appendChild(notification);
    }
    
    // Update notification content
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${productName} agregado al carrito</p>
    `;
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Update cart counter in UI
function updateCartCounter() {
    // Find cart counter element
    let cartCounter = document.querySelector('.cart-counter');
    
    if (!cartCounter) {
        // If we're not on a page with the cart counter, return
        return;
    }
    
    // Update counter with current cart quantity
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCounter.textContent = itemCount;
    cartCounter.style.display = itemCount > 0 ? 'block' : 'none';
}

// Clear cart after purchase
function clearCart() {
    cart = [];
    saveCart();
    updateCartCounter();
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    
    // If we're on a page with product buttons, add event listeners
    const addToCartButtons = document.querySelectorAll('.producto-agregar');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productElement = this.closest('.producto');
                const productId = productElement.dataset.id;
                
                // If we have the global products array, use it
                if (window.allProducts) {
                    const product = window.allProducts.find(p => p.id == productId);
                    if (product) {
                        addToCart(productId);
                    }
                } else {
                    // Otherwise, create a product object from the dataset
                    const product = {
                        id: productId,
                        name: productElement.dataset.nombre,
                        price: parseFloat(productElement.dataset.precio)
                    };
                    addToCart(product);
                }
            });
        });
    }
    
    // If we're on the cart page, render it
    if (document.getElementById('cart-items')) {
        renderCart();
    }
    
    // If we're on the checkout page, load cart for purchase
    if (document.getElementById('productos-tabla')) {
        loadCartForPurchase();
    }
});