document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const productos = document.querySelectorAll('.producto');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        productos.forEach(producto => {
            const titulo = producto.querySelector('.producto-titulo').textContent.toLowerCase();
            if (titulo.includes(searchTerm)) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none'
            }
        })
    })
})