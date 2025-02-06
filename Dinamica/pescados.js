// Array de productos con diferentes imágenes para cada página
const productos = [
    // Página 1
    ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        nombre: `Producto ${i + 1}`,
        precio: (Math.random() * 1000 + 500).toFixed(2),
        imagen: `https://www.bing.com/images/search?q=imagenes%20de%20autos&FORM=IQFRBA&id=D7B20491AA613142FBD6614A3CAD878DC8AA3478${i + 1}`
    })),
    // Página 2
    ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 21,
        nombre: `Producto ${i + 21}`,
        precio: (Math.random() * 1000 + 500).toFixed(2),
        imagen: `https://via.placeholder.com/150/ff9999/000000?text=Producto${i + 21}`
    })),
    // Página 3
    ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 41,
        nombre: `Producto ${i + 41}`,
        precio: (Math.random() * 1000 + 500).toFixed(2),
        imagen: `https://via.placeholder.com/150/99ff99/000000?text=Producto${i + 41}`
    })),
];

const productosPerPage = 20;
let paginaActual = 1;

function mostrarProductos(pagina) {
    const productosContainer = document.getElementById('productos');
    const inicio = (pagina - 1) * productosPerPage;
    const fin = inicio + productosPerPage;
    const productosActuales = productos.slice(inicio, fin);

    productosContainer.innerHTML = '';
    productosActuales.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar</button>
        `;
        productosContainer.appendChild(productoElement);
    });
}

function crearPaginacion() {
    const paginacionContainer = document.getElementById('pescados-paginacion');
    const totalPaginas = Math.ceil(productos.length / productosPerPage);

    paginacionContainer.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement('button');
        boton.innerText = i;
        boton.addEventListener('click', () => cambiarPagina(i));
        if (i === paginaActual) {
            boton.classList.add('activo');
        }
        paginacionContainer.appendChild(boton);
    }

    if (paginaActual < totalPaginas) {
        const botonSiguiente = document.createElement('button');
        botonSiguiente.innerText = 'Siguiente';
        botonSiguiente.classList.add('siguiente');
        botonSiguiente.addEventListener('click', () => cambiarPagina(paginaActual + 1));
        paginacionContainer.appendChild(botonSiguiente);
    }
}

function cambiarPagina(pagina) {
    paginaActual = pagina;
    mostrarProductos(paginaActual);
    crearPaginacion();
}

// Inicializar la página
mostrarProductos(paginaActual);
crearPaginacion();