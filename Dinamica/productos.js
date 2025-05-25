// app.js - Main JavaScript file for the FitCompras store front

// API endpoints
const API_URL = {
    PRODUCTOS: 'http://localhost:8080/api/productos',
    CATEGORIAS: 'http://localhost:8080/api/categorias',
    SUBCATEGORIAS: 'http://localhost:8080/api/subcategorias',
    STORAGE: 'http://localhost:8080/api/storage',
};

// Global variables
let allProducts = [];
let categories = [];
let subcategories = [];
let currentCategory = null;
let currentSubcategory = null;
let currentFilter = null; // Inicializa como null
// DOM elements
const productContainer = document.querySelector('.contenedor-productos');
const mainTitle = document.querySelector('.titulo-principal');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load all data
    initializeStore();

    // Set up event listeners
    setupEventListeners();

    // Initialize cart counter
    updateCartCounter();
});

// Initialize the store with data
async function initializeStore() {
    try {
        // Show loading state
        showLoading();

        // Fetch all data in parallel
        const [productsResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
            fetch(API_URL.PRODUCTOS),
            fetch(API_URL.CATEGORIAS),
            fetch(API_URL.SUBCATEGORIAS),
        ]);

        // Check if all responses are OK
        if (!productsResponse.ok || !categoriesResponse.ok || !subcategoriesResponse.ok) {
            throw new Error('Error fetching data from API');
        }

        // Parse JSON responses
        allProducts = await productsResponse.json();
        categories = await categoriesResponse.json();
        subcategories = await subcategoriesResponse.json();

        // Get current category and subcategory from URL if any
        parseUrlParams();

        // Display products based on current filters
        displayFilteredProducts();

        // Update navigation menu with dynamic categories
        updateNavigationMenu();
    } catch (error) {
        console.error('Error initializing store:', error);
        showError('No pudimos cargar los productos. Por favor, intenta nuevamente más tarde.');
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchIcon.addEventListener('click', handleSearch);

    // Evento para el enlace de "Ofertas"
    const offersLink = document.getElementById('offersLink');
    if (offersLink) {
        offersLink.addEventListener('click', (event) => {
            event.preventDefault();
            currentFilter = 'offers'; // Cambia el filtro actual a 'offers'
            currentCategory = null; // Resetea la categoría seleccionada
            currentSubcategory = null; // Resetea la subcategoría seleccionada
            updateUrl();
            displayFilteredProducts();
        });
    }

    // Evento para las categorías (dinámico)
    const categoryLinks = document.querySelectorAll('.category-link'); // Asegúrate de usar la clase correcta
    categoryLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentFilter = null; // Restablece el filtro de ofertas
            currentCategory = categories.find(
                (category) => category.id == link.dataset.categoryId
            );
            currentSubcategory = null; // Resetea la subcategoría seleccionada
            updateUrl();
            displayFilteredProducts();
        });
    });

    // Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Add to cart buttons (delegation)
    productContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('producto-agregar')) {
            const productElement = e.target.closest('.producto');
            const productId = productElement.dataset.id;
            addToCart(productId);
        }
    });
}

// Parse URL parameters to get current category and subcategory
function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoria');
    const subcategoryId = urlParams.get('subcategoria');

    if (categoryId) {
        currentCategory = categories.find((cat) => cat.id == categoryId) || null;
    }

    if (subcategoryId) {
        currentSubcategory = subcategories.find((subcat) => subcat.id == subcategoryId) || null;
    }
}

// Update URL with current filters
function updateUrl() {
    const urlParams = new URLSearchParams();

    if (currentCategory) {
        urlParams.set('categoria', currentCategory.id);
    }

    if (currentSubcategory) {
        urlParams.set('subcategoria', currentSubcategory.id);
    }

    const newUrl =
        window.location.pathname + (urlParams.toString() ? `?${urlParams.toString()}` : '');
    window.history.pushState({}, '', newUrl);
}

// Filter products based on current category, subcategory, and search term
function filterProducts(searchTerm = '') {
    let filtered = [...allProducts];

    // Filter by category
    if (currentCategory) {
        const subcategoryIds = subcategories
            .filter((subcat) => subcat.categoriaId == currentCategory.id)
            .map((subcat) => subcat.id);

        filtered = filtered.filter(
            (product) => product.subCategoria && subcategoryIds.includes(product.subCategoria.id)
        );
    }

    // Filter by subcategory
    if (currentSubcategory) {
        filtered = filtered.filter(
            (product) =>
                product.subCategoria && product.subCategoria.id == currentSubcategory.id
        );
    }

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter((product) =>
            product.nombre.toLowerCase().includes(term)
        );
    }

    // Filter by offers
    if (currentFilter === 'offers') {
        console.log('Aplicando filtro de ofertas...');
        filtered = filtered.filter(
            (product) =>
                product.precioConDescuento != null &&
                product.precio != null &&
                product.precioConDescuento !== product.precio
        );
        console.log('Productos después del filtro de ofertas:', filtered);
    }

    return filtered;
}
// Handle search functionality
function handleSearch() {
    currentFilter = null; // Restablece el filtro de ofertas
    const searchTerm = searchInput.value.trim();
    displayFilteredProducts(searchTerm);
}
// Display products based on current filters
function displayFilteredProducts(searchTerm = '') {
    // Clear the container
    productContainer.innerHTML = '';

    // Get filtered products
    const filteredProducts = filterProducts(searchTerm);

    // Update page title based on filters
    updatePageTitle(searchTerm, filteredProducts.length);

    // Show message if no products found
    if (filteredProducts.length === 0) {
        productContainer.innerHTML = `
            <div class="no-products">
                <p>No se encontraron productos${searchTerm ? ' para tu búsqueda' : ''}.</p>
                <button class="btn btn-primary" onclick="resetFilters()">Ver todos los productos</button>
            </div>
        `;
        return;
    }

    // Display each product
    filteredProducts.forEach((product) => {
        const productElement = createProductElement(product);
        productContainer.appendChild(productElement);
    });
}

// Create a product element
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'producto';
    productDiv.dataset.id = product.id;
    productDiv.dataset.nombre = product.nombre;
    productDiv.dataset.precio = product.precioConDescuento;
    productDiv.dataset.precioReal = product.precio;

    // Format price
    const formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(product.precioConDescuento);

    // Get image URL
    let imageUrl = '/placeholder.svg?height=200&width=200';
    if (product.imagenBase64) {
        imageUrl = `${API_URL.STORAGE}/view/${encodeURIComponent(product.imagenBase64)}`;
    }
    if (product.precio === product.precioConDescuento) {

    productDiv.innerHTML = `
    <img src="${imageUrl}" alt="${product.nombre}" class="producto-imagen">
    <div class="producto-detalles">
        <h3 class="producto-titulo">${product.nombre}</h3>
        <p class="producto-precio">${formattedPrice}</p>
        <button class="producto-agregar">Agregar</button>
    </div>
`;
    }else{
        productDiv.innerHTML = `
        <img src="${imageUrl}" alt="${product.nombre}" class="producto-imagen">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${product.nombre}</h3>
            <s class="producto-precio" style="text-decoration:line-through;">$${product.precio}</s>
            <p class="producto-precio">${formattedPrice}</p>
            <button class="producto-agregar">Agregar</button>
        </div>
    `;
    }
 

    return productDiv;
}

// Update the page title based on current filters
function updatePageTitle(searchTerm, resultCount) {
    let title = '';

    if (searchTerm) {
        title = `Resultados para "${searchTerm}" (${resultCount})`;
    } else if (currentSubcategory) {
        title = currentSubcategory.nombre;
    } else if (currentCategory) {
        title = currentCategory.nombre;
    } else {
        title = 'Todos los productos';
    }

    mainTitle.textContent = title;
}

// Reset all filters and show all products
function resetFilters() {
    currentCategory = null;
    currentSubcategory = null;
    searchInput.value = '';
    updateUrl();
    displayFilteredProducts();
}

// Update navigation menu with dynamic categories and subcategories
function updateNavigationMenu() {
    const menuHorizontal = document.querySelector('.menu-horizontal');

    // Skip if menu not found or categories not loaded
    if (!menuHorizontal || categories.length === 0) return;

    // Clear existing menu items (except "Ofertas")
    const ofertasItem = menuHorizontal.querySelector('li:first-child');
    const faqsItem = menuHorizontal.querySelector('li:last-child');
    menuHorizontal.innerHTML = '';
    menuHorizontal.appendChild(ofertasItem);
    menuHorizontal.appendChild(faqsItem);

    // Add each category with its subcategories
    categories.forEach((category) => {
        const categorySubcategories = subcategories.filter(
            (subcat) => subcat.categoriaId == category.id
        );

        const li = document.createElement('li');
        li.innerHTML = `
            <a href="?categoria=${category.id}">${category.nombre}</a>
            <ul class="menu-vertical"></ul>
        `;

        const submenu = li.querySelector('.menu-vertical');

        // Add subcategories to submenu
        categorySubcategories.forEach((subcategory) => {
            const subLi = document.createElement('li');
            subLi.innerHTML = `<a href="?categoria=${category.id}&subcategoria=${subcategory.id}">${subcategory.nombre}</a>`;
            submenu.appendChild(subLi);
        });

        menuHorizontal.appendChild(li);
    });

    // Add event listeners for category and subcategory links
    menuHorizontal.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', function (e) {
            // Only prevent default if it's a category or subcategory link
            if (this.getAttribute('href').includes('?')) {
                e.preventDefault();

                const url = new URL(this.href);
                const params = new URLSearchParams(url.search);

                const categoryId = params.get('categoria');
                const subcategoryId = params.get('subcategoria');

                currentFilter = null;
                
                if (categoryId) {
                    currentCategory = categories.find((cat) => cat.id == categoryId) || null;
                } else {
                    currentCategory = null;
                }

                if (subcategoryId) {
                    currentSubcategory = subcategories.find(
                        (subcat) => subcat.id == subcategoryId
                    ) || null;
                } else {
                    currentSubcategory = null;
                }

                updateUrl();
                displayFilteredProducts();
            }
        });
    });
}

// Show loading state
function showLoading() {
    productContainer.innerHTML = `
        <div class="loading">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando productos...</p>
        </div>
    `;
}

// Show error message
function showError(message) {
    productContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="initializeStore()">Reintentar</button>
        </div>
    `;
}

// Add product to cart
function addToCart(productId) {
    const product = allProducts.find((p) => p.id == productId);
    if (!product) return;

    // Get cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if product already in cart
    const existingProductIndex = cart.findIndex((item) => item.id == productId);

    if (existingProductIndex >= 0) {
        // Increase quantity if already in cart
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            id: product.id,
            name: product.nombre,
            price: product.precioConDescuento,
            image: product.imagenBase64,
            quantity: 1,
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show confirmation message
    showAddToCartConfirmation(product.nombre);

    // Update cart counter
    updateCartCounter();
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
    // Find or create cart counter element
    let cartCounter = document.querySelector('.cart-counter');

    if (!cartCounter) {
        // Create cart icon and counter if they don't exist
        const loginBtn = document.querySelector('.login-btn');

        if (loginBtn) {
            const cartBtn = document.createElement('div');
            cartBtn.className = 'cart-btn';
            cartBtn.innerHTML = `
                <a href="/html/cart.html" class="cart-link">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-counter">0</span>
                </a>
            `;

            loginBtn.parentNode.insertBefore(cartBtn, loginBtn);
            cartCounter = cartBtn.querySelector('.cart-counter');
        }
    }

    if (!cartCounter) return;

    // Update counter with current cart quantity
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    cartCounter.textContent = itemCount;
    cartCounter.style.display = itemCount > 0 ? 'block' : 'none';
}

