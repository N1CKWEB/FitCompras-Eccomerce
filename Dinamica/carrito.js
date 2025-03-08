let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    console.log("Carrito cargado al iniciar:", cart); // Ver si el carrito se carga correctamente

    renderCart(); // Asegura que el carrito siempre se muestra
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCart();
    renderCart();
}

function removeFromCart(productIndex) {
    const product = cart[productIndex];

    const confirmDelete = confirm(
        product.quantity > 1
            ? `¿Quieres eliminar una unidad de "${product.name}"?`
            : `¿Quieres eliminar "${product.name}" del carrito?`
    );

    if (!confirmDelete) return;

    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart.splice(productIndex, 1);
    }

    saveCart();
    renderCart();
}

function removeAllFromCart(productIndex) {
    const product = cart[productIndex];

    const confirmDeleteAll = confirm(
        `¿Seguro que quieres eliminar todas las unidades de "${product.name}"?`
    );

    if (!confirmDeleteAll) return;

    cart.splice(productIndex, 1);
    saveCart();
    renderCart();
}

function renderCart() {
    const cartItemsElement = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    if (!cartItemsElement || !cartTotalElement) {
        console.warn("⚠️ No se encontraron elementos del carrito en esta página.");
        return;
    }

    cartItemsElement.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
        total += product.price * product.quantity;

        const li = document.createElement("li");
        li.classList.add("flex", "justify-between", "items-center", "mb-2");

        li.innerHTML = `
            <div>
                ${product.name} x${product.quantity} - $${(product.price * product.quantity).toFixed(2)}
            </div>
            <div>
                <button onclick="removeFromCart(${index})" class="text-red-500 mr-2">Eliminar 1</button>
                <button onclick="removeAllFromCart(${index})" class="text-red-700">Eliminar todo</button>
            </div>
        `;
        cartItemsElement.appendChild(li);
    });

    cartTotalElement.textContent = total.toFixed(2);
    console.log("Carrito renderizado:", cart); // Confirmar que se está renderizando correctamente
}

// Agregar productos al carrito
document.querySelectorAll('.producto-agregar').forEach(button => {
    button.addEventListener('click', function () {
        const productElement = this.closest('.producto');
        const productName = productElement.getAttribute('data-nombre');
        const productPrice = parseFloat(productElement.getAttribute('data-precio'));

        const product = {
            name: productName,
            price: productPrice
        };

        addToCart(product);
    });
});

// Botón comprar
document.getElementById("btn-comprar").addEventListener("click", function () {
    saveCart();
    window.location.href = "../resumen-compra.html";
});

// Cargar carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});
