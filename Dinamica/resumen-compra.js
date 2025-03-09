// Función para cargar los productos del carrito desde localStorage y mostrar en tabla
function loadCartForPurchase() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        const cart = JSON.parse(storedCart);
        const cartTableBody = document.getElementById("productos-tabla");

        let total = 0;

        cart.forEach((product) => {
            const subtotal = product.price * product.quantity;
            total += subtotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border px-4 py-2">${product.name}</td>
                <td class="border px-4 py-2">$${product.price.toFixed(2)}</td>
                <td class="border px-4 py-2">${product.quantity}</td>
                <td class="border px-4 py-2">$${subtotal.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });

        // Agregar fila para el total
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `
            <td colspan="3" class="border px-4 py-2 text-right font-semibold">Total</td>
            <td class="border px-4 py-2 font-semibold">$${total.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(totalRow);
    }
}

// Llamar la función para cargar los productos cuando la página se carga
window.onload = loadCartForPurchase;
