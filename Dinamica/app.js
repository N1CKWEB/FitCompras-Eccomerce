// Añadir clase active al enlace clickeado en la navegación
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remover clase active de todos los enlaces
        document.querySelectorAll('.main-nav a').forEach(l => {
            l.classList.remove('active');
        });
        // Añadir clase active al enlace clickeado
        this.classList.add('active');
    });
});

// Funcionalidad de búsqueda
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // Aquí puedes agregar la lógica de búsqueda
        console.log('Búsqueda:', this.value);
    }
});

// Hacer el menú de navegación scrolleable horizontalmente
const nav = document.querySelector('.main-nav');
let isDown = false;
let startX;
let scrollLeft;

nav.addEventListener('mousedown', (e) => {
    isDown = true;
    nav.classList.add('active');
    startX = e.pageX - nav.offsetLeft;
    scrollLeft = nav.scrollLeft;
});

nav.addEventListener('mouseleave', () => {
    isDown = false;
    nav.classList.remove('active');
});

nav.addEventListener('mouseup', () => {
    isDown = false;
    nav.classList.remove('active');
});

nav.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - nav.offsetLeft;
    const walk = (x - startX) * 2;
    nav.scrollLeft = scrollLeft - walk;
});

document.addEventListener("DOMContentLoaded", function () {
    cargarCategorias();
});

// Función para cargar dinámicamente las categorías en el menú
function cargarCategorias() {
    const categorias = [
        { nombre: "Almacén", subcategorias: ["Conservas", "Cereales", "Aceites"] },
        { nombre: "Bebidas", subcategorias: ["Jugos", "Aguas", "Alcohol"] },
        { nombre: "Frescos", subcategorias: ["Frutas", "Verduras", "Carnes"] },
        { nombre: "Congelados", subcategorias: ["Helados", "Pescados", "Comidas Congeladas"] },
        { nombre: "Limpieza", subcategorias: ["Insecticidas", "Papeles", "Desodorantes"] }
    ];

    const menu = document.querySelector(".menu-horizontal");
    categorias.forEach(categoria => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${categoria.nombre}</a>`;

        if (categoria.subcategorias.length > 0) {
            const ulSub = document.createElement("ul");
            ulSub.classList.add("menu-vertical");
            categoria.subcategorias.forEach(sub => {
                const liSub = document.createElement("li");
                liSub.innerHTML = `<a href="#">${sub}</a>`;
                ulSub.appendChild(liSub);
            });
            li.appendChild(ulSub);
        }
        menu.appendChild(li);
    });
}

// Función para obtener productos desde una API simulada
function obtenerProductos(categoria) {
    const url = `/api/productos?categoria=${encodeURIComponent(categoria)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error("Error al obtener productos:", error));
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
    const contenedor = document.querySelector(".contenedor-productos");
    contenedor.innerHTML = "";
    
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar">Agregar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}
