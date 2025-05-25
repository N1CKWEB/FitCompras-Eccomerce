// resumen-compra.js - Functionality for the purchase summary page

// Function to load cart items from localStorage and display in table
function loadCartForPurchase() {
    const storedCart = localStorage.getItem("cart");
    const cartTableBody = document.getElementById("productos-tabla");
    const btnFinalizar = document.getElementById("btn-finalizar");
    
    if (!cartTableBody) {
        console.warn("No se encontró la tabla de productos en esta página.");
        return;
    }
    
    // Clear the table
    cartTableBody.innerHTML = "";
    
    if (!storedCart || JSON.parse(storedCart).length === 0) {
        // Show empty cart message
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="4" class="border px-4 py-8 text-center">
                    <p class="mb-4">Tu carrito está vacío</p>
                    <a href="/index.html" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Continuar comprando
                    </a>
                </td>
            </tr>
        `;
        
        // Disable checkout button
        if (btnFinalizar) {
            btnFinalizar.disabled = true;
            btnFinalizar.classList.add('opacity-50', 'cursor-not-allowed');
        }
        
        return;
    }
    
    const cart = JSON.parse(storedCart);
    let total = 0;
    
    // Add each product to the table
    cart.forEach((product, index) => {
        const subtotal = product.price * product.quantity;
        total += subtotal;
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="border px-4 py-2">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 mr-2">
                        <img class="h-10 w-10 object-cover rounded" 
                             src="${getProductImageUrl(product.image)}" 
                             alt="${product.name}">
                    </div>
                    <div>
                        ${product.name}
                        <div class="text-sm text-gray-500">
                            <button onclick="removeFromCart(${index})" class="text-red-500 mr-1">-</button>
                            <button onclick="addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image || ''}'})" class="text-green-500 mr-1">+</button>
                            <button onclick="removeAllFromCart(${index})" class="text-red-700">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </td>
            <td class="border px-4 py-2">$${product.price.toFixed(2)}</td>
            <td class="border px-4 py-2">${product.quantity}</td>
            <td class="border px-4 py-2">$${subtotal.toFixed(2)}</td>
        `;
        
        cartTableBody.appendChild(row);
    });
    
    // Add total row
    const totalRow = document.createElement("tr");
    totalRow.className = "bg-gray-100";
    totalRow.innerHTML = `
        <td colspan="3" class="border px-4 py-2 text-right font-bold">Total</td>
        <td class="border px-4 py-2 font-bold">$${total.toFixed(2)}</td>
    `;
    cartTableBody.appendChild(totalRow);
    
    // Enable checkout button
    if (btnFinalizar) {
        btnFinalizar.disabled = false;
        btnFinalizar.classList.remove('opacity-50', 'cursor-not-allowed');
        
        // Add event listener for checkout button
        btnFinalizar.addEventListener('click', finalizarCompra);
    }
}

// Helper function to get product image URL
function getProductImageUrl(imageId) {
    if (!imageId) {
        return '/placeholder.svg?height=50&width=50';
    }
    
    const API_URL = {
        STORAGE: 'http://localhost:8080/api/storage'
    };
    
    return `${API_URL.STORAGE}/view/${encodeURIComponent(imageId)}`;
}

// Function to handle checkout
function finalizarCompra() {
    // Here you would typically send the order to your backend
    // For now, we'll just show a success message and clear the cart
    
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.');
    
    // Clear the cart
    localStorage.removeItem('cart');
    
    // Redirect to home page
    window.location.href = '/index.html';
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCartForPurchase();
    
    // Add event listener for checkout button
    const btnFinalizar = document.getElementById("btn-finalizar");
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarCompra);
    }
});