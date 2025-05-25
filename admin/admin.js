// Constantes para los endpoints de la API
const API_URL = {
    PRODUCTOS: 'http://localhost:8080/api/productos',
    CATEGORIAS: 'http://localhost:8080/api/categorias',
    SUBCATEGORIAS: 'http://localhost:8080/api/subcategorias',
    STORAGE: 'http://localhost:8080/api/storage',
    FAQS: 'http://localhost:8080/api/faqs' // Added FAQS endpoint
};

// Variables globales
let categorias = [];
let subcategorias = [];
let productos = [];
let faqs = [];
let currentItemToDelete = null;

// Elementos DOM
const pageTitle = document.getElementById('page-title');
const mainContent = document.getElementById('main-content');
const alertMessage = document.getElementById('alert-message');
const alertContent = document.getElementById('alert-content');

// Importación de Bootstrap
const bootstrap = window.bootstrap;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar modales
    const categoriaModal = new bootstrap.Modal(document.getElementById('categoria-modal'));
    const subcategoriaModal = new bootstrap.Modal(document.getElementById('subcategoria-modal'));
    const productoModal = new bootstrap.Modal(document.getElementById('producto-modal'));
    const confirmarEliminarModal = new bootstrap.Modal(document.getElementById('confirmar-eliminar-modal'));
    
    // Inicializar navegación
    initNavigation();
    
    // Cargar datos iniciales
    cargarDashboard();
    
    // Inicializar eventos de formularios
    initFormEvents();
});

// Inicializar navegación
function initNavigation() {
    // Enlaces del sidebar
    document.getElementById('dashboard-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('dashboard');
        cargarDashboard();
    });
    
    document.getElementById('categorias-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('categorias');
        cargarCategorias();
    });
    
    document.getElementById('subcategorias-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('subcategorias');
        cargarSubcategorias();
    });
    
    document.getElementById('productos-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('productos');
        cargarProductos();
    });
    
    // Enlaces del dashboard
    document.getElementById('dashboard-categorias-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('categorias');
        cargarCategorias();
    });
    
    document.getElementById('dashboard-subcategorias-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('subcategorias');
        cargarSubcategorias();
    });
    
    document.getElementById('dashboard-productos-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('productos');
        cargarProductos();
    });
    
    // Botón toggle sidebar en móvil
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('show');
        
        // Crear overlay si no existe
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                document.getElementById('sidebar').classList.remove('show');
                overlay.classList.remove('show');
            });
        }
        
        overlay.classList.toggle('show');
    });
}

// Mostrar sección
function showSection(section) {
    // Actualizar título
    switch(section) {
        case 'dashboard':
            pageTitle.textContent = 'Dashboard';
            break;
        case 'categorias':
            pageTitle.textContent = 'Gestión de Categorías';
            break;
        case 'subcategorias':
            pageTitle.textContent = 'Gestión de Subcategorías';
            break;
        case 'productos':
            pageTitle.textContent = 'Gestión de Productos';
            break;
    }
    
    // Actualizar enlaces activos
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(`${section}-link`).classList.add('active');
    
    // Mostrar contenido correspondiente
    document.querySelectorAll('.content-section').forEach(content => {
        content.classList.add('d-none');
    });
    document.getElementById(`${section}-content`).classList.remove('d-none');
}

// Inicializar eventos de formularios
function initFormEvents() {
    // Botones para abrir modales
    document.getElementById('nueva-categoria-btn').addEventListener('click', () => {
        document.getElementById('categoria-form').reset();
        document.getElementById('categoria-id').value = '';
        document.getElementById('categoria-modal-label').textContent = 'Nueva Categoría';
        
        // Mostrar modal
        const categoriaModal = new bootstrap.Modal(document.getElementById('categoria-modal'));
        categoriaModal.show();
    });
    
    document.getElementById('nueva-subcategoria-btn').addEventListener('click', () => {
        document.getElementById('subcategoria-form').reset();
        document.getElementById('subcategoria-id').value = '';
        document.getElementById('subcategoria-modal-label').textContent = 'Nueva Subcategoría';
        cargarCategoriasEnSelect();
        
        // Mostrar modal
        const subcategoriaModal = new bootstrap.Modal(document.getElementById('subcategoria-modal'));
        subcategoriaModal.show();
    });
    
    document.getElementById('nuevo-producto-btn').addEventListener('click', () => {
        document.getElementById('producto-form').reset();
        document.getElementById('producto-id').value = '';
        document.getElementById('producto-modal-label').textContent = 'Nuevo Producto';
        document.getElementById('imagen-preview-container').classList.add('d-none');
        cargarSubcategoriasEnSelect();
        
        // Mostrar modal
        const productoModal = new bootstrap.Modal(document.getElementById('producto-modal'));
        productoModal.show();
    });
    
    // Guardar categoría
    document.getElementById('guardar-categoria-btn').addEventListener('click', guardarCategoria);
    
    // Guardar subcategoría
    document.getElementById('guardar-subcategoria-btn').addEventListener('click', guardarSubcategoria);
    
    // Guardar producto
    document.getElementById('guardar-producto-btn').addEventListener('click', guardarProducto);
    
    // Confirmar eliminación
    document.getElementById('confirmar-eliminar-btn').addEventListener('click', confirmarEliminar);
    
    // Vista previa de imagen
    document.getElementById('producto-imagen').addEventListener('change', mostrarVistaPrevia);
    
    // Eliminar imagen
    document.getElementById('eliminar-imagen-btn').addEventListener('click', () => {
        document.getElementById('producto-imagen').value = '';
        document.getElementById('imagen-preview-container').classList.add('d-none');
    });
    
    // Filtro de productos
    document.getElementById('filtro-subcategoria').addEventListener('change', filtrarProductos);
    document.getElementById('buscar-producto').addEventListener('input', filtrarProductos);
}

// Cargar dashboard
async function cargarDashboard() {
    try {
        // Cargar contadores
        const [categoriasResponse, subcategoriasResponse, productosResponse] = await Promise.all([
            fetch(API_URL.CATEGORIAS),
            fetch(API_URL.SUBCATEGORIAS),
            fetch(API_URL.PRODUCTOS)
        ]);
        
        if (!categoriasResponse.ok || !subcategoriasResponse.ok || !productosResponse.ok) {
            throw new Error('Error al cargar datos del dashboard');
        }
        
        categorias = await categoriasResponse.json();
        subcategorias = await subcategoriasResponse.json();
        productos = await productosResponse.json();
        
        // Actualizar contadores
        document.getElementById('categorias-count').textContent = categorias.length;
        document.getElementById('subcategorias-count').textContent = subcategorias.length;
        document.getElementById('productos-count').textContent = productos.length;
        
        // Crear gráfico
        crearGraficoProductos();
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al cargar el dashboard', 'danger');
    }
}

// Crear gráfico de productos por categoría
function crearGraficoProductos() {
    // Preparar datos para el gráfico
    const datosPorCategoria = {};
    
    // Agrupar productos por categoría
    productos.forEach(producto => {
        if (producto.subCategoria && producto.subCategoria.categoria) {
            const nombreCategoria = producto.subCategoria.categoria.nombre;
            if (!datosPorCategoria[nombreCategoria]) {
                datosPorCategoria[nombreCategoria] = 0;
            }
            datosPorCategoria[nombreCategoria]++;
        }
    });
    
    // Convertir a arrays para Chart.js
    const labels = Object.keys(datosPorCategoria);
    const data = Object.values(datosPorCategoria);
    
    // Colores para el gráfico
    const backgroundColors = [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)'
    ];
    
    const borderColors = [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)'
    ];
    
    // Crear gráfico
    const ctx = document.getElementById('productosChart');
    
    // Destruir gráfico existente si hay uno
    if (window.productosChart) {
        window.productosChart.destroy();
    }
    
    window.productosChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de Productos',
                data: data,
                backgroundColor: backgroundColors.slice(0, labels.length),
                borderColor: borderColors.slice(0, labels.length),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Cargar categorías
async function cargarCategorias() {
    const tablaCategorias = document.getElementById('categorias-table-body');
    const loadingElement = document.getElementById('categorias-loading');
    const emptyElement = document.getElementById('categorias-empty');
    
    try {
        // Mostrar loading
        tablaCategorias.innerHTML = '';
        loadingElement.classList.remove('d-none');
        emptyElement.classList.add('d-none');
        
        // Cargar categorías
        const response = await fetch(API_URL.CATEGORIAS);
        if (!response.ok) {
            throw new Error('Error al cargar categorías');
        }
        
        categorias = await response.json();
        
        // Cargar subcategorías para contar cuántas hay por categoría
        const subcategoriasResponse = await fetch(API_URL.SUBCATEGORIAS);
        if (!subcategoriasResponse.ok) {
            throw new Error('Error al cargar subcategorías');
        }
        
        subcategorias = await subcategoriasResponse.json();
        
        // Ocultar loading
        loadingElement.classList.add('d-none');
        
        // Mostrar mensaje si no hay categorías
        if (categorias.length === 0) {
            emptyElement.classList.remove('d-none');
            return;
        }
        
        // Mostrar categorías en la tabla
        categorias.forEach(categoria => {
            const row = document.createElement('tr');
            
            // Contar subcategorías que pertenecen a esta categoría
            const subcategoriasCount = subcategorias.filter(
                subcategoria => subcategoria.categoriaId == categoria.id
            ).length;
            
            row.innerHTML = `
                <td>${categoria.id}</td>
                <td>${categoria.nombre}</td>
                <td>${subcategoriasCount}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-primary editar-categoria" data-id="${categoria.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger eliminar-categoria" data-id="${categoria.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tablaCategorias.appendChild(row);
        });
        
        // Agregar eventos a los botones
        document.querySelectorAll('.editar-categoria').forEach(btn => {
            btn.addEventListener('click', () => editarCategoria(btn.getAttribute('data-id')));
        });
        
        document.querySelectorAll('.eliminar-categoria').forEach(btn => {
            btn.addEventListener('click', () => prepararEliminarCategoria(btn.getAttribute('data-id')));
        });
    } catch (error) {
        console.error('Error:', error);
        loadingElement.classList.add('d-none');
        mostrarAlerta('Error al cargar categorías', 'danger');
    }
}

// Cargar subcategorías
async function cargarSubcategorias() {
    const tablaSubcategorias = document.getElementById('subcategorias-table-body');
    const loadingElement = document.getElementById('subcategorias-loading');
    const emptyElement = document.getElementById('subcategorias-empty');
    
    try {
        // Mostrar loading
        tablaSubcategorias.innerHTML = '';
        loadingElement.classList.remove('d-none');
        emptyElement.classList.add('d-none');
        
        // Asegurarnos de que tenemos las categorías cargadas
        if (categorias.length === 0) {
            const categoriasResponse = await fetch(API_URL.CATEGORIAS);
            if (!categoriasResponse.ok) {
                throw new Error('Error al cargar categorías');
            }
            categorias = await categoriasResponse.json();
        }
        
        // Cargar subcategorías
        const response = await fetch(API_URL.SUBCATEGORIAS);
        if (!response.ok) {
            throw new Error('Error al cargar subcategorías');
        }
        
        subcategorias = await response.json();
        
        // Ocultar loading
        loadingElement.classList.add('d-none');
        
        // Mostrar mensaje si no hay subcategorías
        if (subcategorias.length === 0) {
            emptyElement.classList.remove('d-none');
            return;
        }
        
        // Mostrar subcategorías en la tabla
        subcategorias.forEach(subcategoria => {
            const row = document.createElement('tr');
            
            // Buscar el nombre de la categoría usando el categoriaId
            let categoriaNombre = 'Sin categoría';
            if (subcategoria.categoriaId) {
                const categoriaEncontrada = categorias.find(cat => cat.id == subcategoria.categoriaId);
                if (categoriaEncontrada) {
                    categoriaNombre = categoriaEncontrada.nombre;
                }
            }
            
            row.innerHTML = `
                <td>${subcategoria.id}</td>
                <td>${subcategoria.nombre}</td>
                <td>${categoriaNombre}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-primary editar-subcategoria" data-id="${subcategoria.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger eliminar-subcategoria" data-id="${subcategoria.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tablaSubcategorias.appendChild(row);
        });
        
        // Agregar eventos a los botones
        document.querySelectorAll('.editar-subcategoria').forEach(btn => {
            btn.addEventListener('click', () => editarSubcategoria(btn.getAttribute('data-id')));
        });
        
        document.querySelectorAll('.eliminar-subcategoria').forEach(btn => {
            btn.addEventListener('click', () => prepararEliminarSubcategoria(btn.getAttribute('data-id')));
        });
    } catch (error) {
        console.error('Error:', error);
        loadingElement.classList.add('d-none');
        mostrarAlerta('Error al cargar subcategorías', 'danger');
    }
}

// Cargar productos
async function cargarProductos() {
    const tablaProductos = document.getElementById('productos-table-body');
    const loadingElement = document.getElementById('productos-loading');
    const emptyElement = document.getElementById('productos-empty');
    const filtroSubcategoria = document.getElementById('filtro-subcategoria');
    
    try {
        // Mostrar loading
        tablaProductos.innerHTML = '';
        loadingElement.classList.remove('d-none');
        emptyElement.classList.add('d-none');
        
        // Cargar productos
        const response = await fetch(API_URL.PRODUCTOS);
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        
        productos = await response.json();
        
        // Cargar subcategorías para el filtro
        await cargarSubcategoriasEnFiltro();
        
        // Ocultar loading
        loadingElement.classList.add('d-none');
        
        // Mostrar mensaje si no hay productos
        if (productos.length === 0) {
            emptyElement.classList.remove('d-none');
            return;
        }
        
        // Mostrar productos en la tabla
        mostrarProductosEnTabla(productos);
    } catch (error) {
        console.error('Error:', error);
        loadingElement.classList.add('d-none');
        mostrarAlerta('Error al cargar productos', 'danger');
    }
}

// Mostrar productos en la tabla
function mostrarProductosEnTabla(productosAMostrar) {
    const tablaProductos = document.getElementById('productos-table-body');
    tablaProductos.innerHTML = '';
    
    productosAMostrar.forEach(producto => {
        const row = document.createElement('tr');
        
        // Formatear precio
        const precioFormateado = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(producto.precioConDescuento);
        
        // Construir URL de la imagen usando el servicio de almacenamiento
        let imagenUrl = '/placeholder.svg?height=50&width=50';
        if (producto.imagenBase64) {
            // Usar el endpoint correcto para visualizar la imagen
            imagenUrl = `${API_URL.STORAGE}/view/${encodeURIComponent(producto.imagenBase64)}`;
        }
        
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>
                <img src="${imagenUrl}" alt="${producto.nombre}" class="img-thumbnail">
            </td>
            <td>${producto.nombre}</td>
            <td>${precioFormateado}</td>
            <td>${producto.subCategoria ? producto.subCategoria.nombre : 'Sin subcategoría'}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary editar-producto" data-id="${producto.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger eliminar-producto" data-id="${producto.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tablaProductos.appendChild(row);
    });
    
    // Agregar eventos a los botones
    document.querySelectorAll('.editar-producto').forEach(btn => {
        btn.addEventListener('click', () => editarProducto(btn.getAttribute('data-id')));
    });
    
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
        btn.addEventListener('click', () => prepararEliminarProducto(btn.getAttribute('data-id')));
    });
}

// Filtrar productos
function filtrarProductos() {
    const filtroSubcategoria = document.getElementById('filtro-subcategoria').value;
    const busqueda = document.getElementById('buscar-producto').value.toLowerCase();
    
    let productosFiltrados = [...productos];
    
    // Filtrar por subcategoría
    if (filtroSubcategoria) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.subCategoria && producto.subCategoria.id == filtroSubcategoria
        );
    }
    
    // Filtrar por búsqueda
    if (busqueda) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.nombre.toLowerCase().includes(busqueda)
        );
    }
    
    // Mostrar productos filtrados
    mostrarProductosEnTabla(productosFiltrados);
    
    // Mostrar mensaje si no hay resultados
    const emptyElement = document.getElementById('productos-empty');
    if (productosFiltrados.length === 0) {
        emptyElement.classList.remove('d-none');
        emptyElement.querySelector('p').textContent = 'No se encontraron productos con los filtros aplicados';
    } else {
        emptyElement.classList.add('d-none');
    }
}

// Cargar categorías en select
async function cargarCategoriasEnSelect() {
    const selectCategoria = document.getElementById('subcategoria-categoria');
    
    try {
        // Limpiar select
        selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';
        
        // Si ya tenemos las categorías cargadas, usarlas
        if (categorias.length === 0) {
            const response = await fetch(API_URL.CATEGORIAS);
            if (!response.ok) {
                throw new Error('Error al cargar categorías');
            }
            
            categorias = await response.json();
        }
        
        // Agregar opciones al select
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.nombre;
            selectCategoria.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al cargar categorías', 'danger');
    }
}

// Cargar subcategorías en select
async function cargarSubcategoriasEnSelect() {
    const selectSubcategoria = document.getElementById('producto-subcategoria');
    
    try {
        // Limpiar select
        selectSubcategoria.innerHTML = '<option value="">Seleccione una subcategoría</option>';
        
        // Asegurarnos de que tenemos las categorías cargadas
        if (categorias.length === 0) {
            const categoriasResponse = await fetch(API_URL.CATEGORIAS);
            if (!categoriasResponse.ok) {
                throw new Error('Error al cargar categorías');
            }
            categorias = await categoriasResponse.json();
        }
        
        // Si ya tenemos las subcategorías cargadas, usarlas
        if (subcategorias.length === 0) {
            const response = await fetch(API_URL.SUBCATEGORIAS);
            if (!response.ok) {
                throw new Error('Error al cargar subcategorías');
            }
            
            subcategorias = await response.json();
        }
        
        // Agregar opciones al select
        subcategorias.forEach(subcategoria => {
            const option = document.createElement('option');
            option.value = subcategoria.id;
            
            // Buscar el nombre de la categoría usando el categoriaId
            let categoriaNombre = 'Sin categoría';
            if (subcategoria.categoriaId) {
                const categoriaEncontrada = categorias.find(cat => cat.id == subcategoria.categoriaId);
                if (categoriaEncontrada) {
                    categoriaNombre = categoriaEncontrada.nombre;
                }
            }
            
            option.textContent = `${subcategoria.nombre} (${categoriaNombre})`;
            selectSubcategoria.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al cargar subcategorías', 'danger');
    }
}

// Cargar subcategorías en filtro
async function cargarSubcategoriasEnFiltro() {
    const filtroSubcategoria = document.getElementById('filtro-subcategoria');
    
    try {
        // Limpiar select
        filtroSubcategoria.innerHTML = '<option value="">Todas las subcategorías</option>';
        
        // Asegurarnos de que tenemos las categorías cargadas
        if (categorias.length === 0) {
            const categoriasResponse = await fetch(API_URL.CATEGORIAS);
            if (!categoriasResponse.ok) {
                throw new Error('Error al cargar categorías');
            }
            categorias = await categoriasResponse.json();
        }
        
        // Si ya tenemos las subcategorías cargadas, usarlas
        if (subcategorias.length === 0) {
            const response = await fetch(API_URL.SUBCATEGORIAS);
            if (!response.ok) {
                throw new Error('Error al cargar subcategorías');
            }
            
            subcategorias = await response.json();
        }
        
        // Agregar opciones al select
        subcategorias.forEach(subcategoria => {
            const option = document.createElement('option');
            option.value = subcategoria.id;
            
            // Buscar el nombre de la categoría usando el categoriaId
            let categoriaNombre = 'Sin categoría';
            if (subcategoria.categoriaId) {
                const categoriaEncontrada = categorias.find(cat => cat.id == subcategoria.categoriaId);
                if (categoriaEncontrada) {
                    categoriaNombre = categoriaEncontrada.nombre;
                }
            }
            
            option.textContent = `${subcategoria.nombre} (${categoriaNombre})`;
            filtroSubcategoria.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al cargar subcategorías para el filtro', 'danger');
    }
}

// Editar categoría
function editarCategoria(id) {
    const categoria = categorias.find(cat => cat.id == id);
    if (!categoria) return;
    
    document.getElementById('categoria-id').value = categoria.id;
    document.getElementById('categoria-nombre').value = categoria.nombre;
    document.getElementById('categoria-modal-label').textContent = 'Editar Categoría';
    
    // Mostrar modal
    const categoriaModal = new bootstrap.Modal(document.getElementById('categoria-modal'));
    categoriaModal.show();
}

// Editar subcategoría
function editarSubcategoria(id) {
    const subcategoria = subcategorias.find(subcat => subcat.id == id);
    if (!subcategoria) return;
    
    document.getElementById('subcategoria-id').value = subcategoria.id;
    document.getElementById('subcategoria-nombre').value = subcategoria.nombre;
    document.getElementById('subcategoria-modal-label').textContent = 'Editar Subcategoría';
    
    cargarCategoriasEnSelect().then(() => {
        if (subcategoria.categoriaId) {
            document.getElementById('subcategoria-categoria').value = subcategoria.categoriaId;
        }
        
        // Mostrar modal
        const subcategoriaModal = new bootstrap.Modal(document.getElementById('subcategoria-modal'));
        subcategoriaModal.show();
    });
}

// Editar producto
function editarProducto(id) {
    const producto = productos.find(prod => prod.id == id);
    if (!producto) return;
    
    document.getElementById('producto-id').value = producto.id;
    document.getElementById('producto-nombre').value = producto.nombre;
    document.getElementById('producto-precio').value = producto.precioConDescuento;
    document.getElementById('producto-modal-label').textContent = 'Editar Producto';
    
    // Mostrar imagen si existe
    if (producto.imagenBase64) {
        // Usar el endpoint correcto para visualizar la imagen
        const imagenUrl = `${API_URL.STORAGE}/view/${encodeURIComponent(producto.imagenBase64)}`;
        document.getElementById('imagen-preview').src = imagenUrl;
        document.getElementById('imagen-preview-container').classList.remove('d-none');
    } else {
        document.getElementById('imagen-preview-container').classList.add('d-none');
    }
    
    cargarSubcategoriasEnSelect().then(() => {
        if (producto.subCategoria) {
            document.getElementById('producto-subcategoria').value = producto.subCategoria.id;
        }
        
        // Mostrar modal
        const productoModal = new bootstrap.Modal(document.getElementById('producto-modal'));
        productoModal.show();
    });
}

// Preparar eliminar categoría
function prepararEliminarCategoria(id) {
    const categoria = categorias.find(cat => cat.id == id);
    if (!categoria) return;
    
    document.getElementById('confirmar-eliminar-mensaje').textContent = 
        `¿Está seguro que desea eliminar la categoría "${categoria.nombre}"? Esta acción no se puede deshacer.`;
    
    currentItemToDelete = {
        type: 'categoria',
        id: id
    };
    
    // Mostrar modal
    const confirmarEliminarModal = new bootstrap.Modal(document.getElementById('confirmar-eliminar-modal'));
    confirmarEliminarModal.show();
}

// Preparar eliminar subcategoría
function prepararEliminarSubcategoria(id) {
    const subcategoria = subcategorias.find(subcat => subcat.id == id);
    if (!subcategoria) return;
    
    document.getElementById('confirmar-eliminar-mensaje').textContent = 
        `¿Está seguro que desea eliminar la subcategoría "${subcategoria.nombre}"? Esta acción no se puede deshacer.`;
    
    currentItemToDelete = {
        type: 'subcategoria',
        id: id
    };
    
    // Mostrar modal
    const confirmarEliminarModal = new bootstrap.Modal(document.getElementById('confirmar-eliminar-modal'));
    confirmarEliminarModal.show();
}

// Preparar eliminar producto
function prepararEliminarProducto(id) {
    const producto = productos.find(prod => prod.id == id);
    if (!producto) return;
    
    document.getElementById('confirmar-eliminar-mensaje').textContent = 
        `¿Está seguro que desea eliminar el producto "${producto.nombre}"? Esta acción no se puede deshacer.`;
    
    currentItemToDelete = {
        type: 'producto',
        id: id
    };
    
    // Mostrar modal
    const confirmarEliminarModal = new bootstrap.Modal(document.getElementById('confirmar-eliminar-modal'));
    confirmarEliminarModal.show();
}

// Confirmar eliminar
async function confirmarEliminar() {
    if (!currentItemToDelete) return;
    
    const { type, id } = currentItemToDelete;
    let url = '';
    let successMessage = '';
    let errorMessage = '';
    let reloadFunction = null;
    
    switch (type) {
        case 'categoria':
            url = `${API_URL.CATEGORIAS}/${id}`;
            successMessage = 'Categoría eliminada correctamente';
            errorMessage = 'Error al eliminar la categoría';
            reloadFunction = cargarCategorias;
            break;
        case 'subcategoria':
            url = `${API_URL.SUBCATEGORIAS}/${id}`;
            successMessage = 'Subcategoría eliminada correctamente';
            errorMessage = 'Error al eliminar la subcategoría';
            reloadFunction = cargarSubcategorias;
            break;
        case 'producto':
            url = `${API_URL.PRODUCTOS}/${id}`;
            successMessage = 'Producto eliminado correctamente';
            errorMessage = 'Error al eliminar el producto';
            reloadFunction = cargarProductos;
            break;
    }
    
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(errorMessage);
        }
        
        mostrarAlerta(successMessage, 'success');
        
        // Cerrar modal
        const confirmarEliminarModal = bootstrap.Modal.getInstance(document.getElementById('confirmar-eliminar-modal'));
        confirmarEliminarModal.hide();
        
        // Recargar datos
        if (reloadFunction) {
            reloadFunction();
        }
        
        // Actualizar dashboard
        cargarDashboard();
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta(errorMessage, 'danger');
    }
}

// Guardar categoría
async function guardarCategoria() {
    const id = document.getElementById('categoria-id').value;
    const nombre = document.getElementById('categoria-nombre').value;
    
    if (!nombre) {
        mostrarAlerta('El nombre de la categoría es obligatorio', 'warning');
        return;
    }
    
    const categoria = {
        nombre: nombre
    };
    
    try {
        let url = API_URL.CATEGORIAS;
        let method = 'POST';
        let successMessage = 'Categoría creada correctamente';
        
        if (id) {
            url = `${API_URL.CATEGORIAS}/${id}`;
            method = 'PUT';
            successMessage = 'Categoría actualizada correctamente';
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        
        if (!response.ok) {
            throw new Error('Error al guardar la categoría');
        }
        
        mostrarAlerta(successMessage, 'success');
        
        // Cerrar modal
        const categoriaModal = bootstrap.Modal.getInstance(document.getElementById('categoria-modal'));
        categoriaModal.hide();
        
        // Recargar categorías
        cargarCategorias();
        
        // Actualizar dashboard
        cargarDashboard();
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al guardar la categoría', 'danger');
    }
}

// Guardar subcategoría
async function guardarSubcategoria() {
    const id = document.getElementById('subcategoria-id').value;
    const nombre = document.getElementById('subcategoria-nombre').value;
    const categoriaId = document.getElementById('subcategoria-categoria').value;
    
    if (!nombre) {
        mostrarAlerta('El nombre de la subcategoría es obligatorio', 'warning');
        return;
    }
    
    if (!categoriaId) {
        mostrarAlerta('Debe seleccionar una categoría', 'warning');
        return;
    }
    
    // Corregido: Formato correcto para el DTO de subcategoría
    const subcategoria = {
        nombre: nombre,
        categoriaId: categoriaId
    };
    
    try {
        // Corregido: URL para crear subcategoría
        let url = `${API_URL.SUBCATEGORIAS}/crearSubcategoria`;
        let method = 'POST';
        let successMessage = 'Subcategoría creada correctamente';
        
        if (id) {
            url = `${API_URL.SUBCATEGORIAS}/${id}`;
            method = 'PUT';
            successMessage = 'Subcategoría actualizada correctamente';
            subcategoria.id = id;
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subcategoria)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del servidor:', errorText);
            throw new Error('Error al guardar la subcategoría: ' + errorText);
        }
        
        mostrarAlerta(successMessage, 'success');
        
        // Cerrar modal
        const subcategoriaModal = bootstrap.Modal.getInstance(document.getElementById('subcategoria-modal'));
        subcategoriaModal.hide();
        
        // Recargar subcategorías
        cargarSubcategorias();
        
        // Actualizar dashboard
        cargarDashboard();
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al guardar la subcategoría: ' + error.message, 'danger');
    }
}

// Guardar producto
async function guardarProducto() {
    const id = document.getElementById('producto-id').value;
    const nombre = document.getElementById('producto-nombre').value;
    const precio = document.getElementById('producto-precio').value;
    const subcategoriaId = document.getElementById('producto-subcategoria').value;
    const imagenInput = document.getElementById('producto-imagen');
    
    if (!nombre) {
        mostrarAlerta('El nombre del producto es obligatorio', 'warning');
        return;
    }
    
    if (!precio || isNaN(precio) || parseFloat(precio) < 0) {
        mostrarAlerta('El precio debe ser un número válido mayor o igual a cero', 'warning');
        return;
    }
    
    if (!subcategoriaId) {
        mostrarAlerta('Debe seleccionar una subcategoría', 'warning');
        return;
    }
    
    try {
        let url = API_URL.PRODUCTOS;
        let method = 'POST';
        let successMessage = 'Producto creado correctamente';
        
        if (id) {
            url = `${API_URL.PRODUCTOS}/${id}`;
            method = 'PUT';
            successMessage = 'Producto actualizado correctamente';
        }
        
        // Crear FormData para enviar datos multipart
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('subCategoriaId', subcategoriaId);
        
        // Si hay una imagen nueva, agregarla al FormData
        if (imagenInput.files.length > 0) {
            formData.append('imagen', imagenInput.files[0]);
        }
        
        if (id) {
            formData.append('id', id);
        }
        
        // Mostrar datos que se están enviando (para depuración)
        console.log('Enviando producto:', {
            url,
            method,
            nombre,
            precio,
            subCategoriaId: subcategoriaId,
            tieneImagen: imagenInput.files.length > 0
        });
        
        const response = await fetch(url, {
            method: method,
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del servidor:', errorText);
            throw new Error('Error al guardar el producto: ' + errorText);
        }
        
        const productoData = await response.json();
        
        mostrarAlerta(successMessage, 'success');
        
        // Cerrar modal
        const productoModal = bootstrap.Modal.getInstance(document.getElementById('producto-modal'));
        productoModal.hide();
        
        // Recargar productos
        cargarProductos();
        
        // Actualizar dashboard
        cargarDashboard();
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al guardar el producto: ' + error.message, 'danger');
    }
}

// Mostrar vista previa de imagen
function mostrarVistaPrevia(event) {
    const input = event.target;
    const previewContainer = document.getElementById('imagen-preview-container');
    const preview = document.getElementById('imagen-preview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            previewContainer.classList.remove('d-none');
        }
        
        reader.readAsDataURL(input.files[0]);
    } else {
        previewContainer.classList.add('d-none');
    }
}

// Mostrar alerta
function mostrarAlerta(mensaje, tipo) {
    alertContent.textContent = mensaje;
    alertMessage.className = `alert alert-${tipo} alert-dismissible fade show`;
    
    // Ocultar alerta después de 5 segundos
    setTimeout(() => {
        alertMessage.classList.remove('show');
    }, 5000);
}

// -----
// Inicializar navegación
document.getElementById('faqs-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('faqs');
    cargarFaqs();
});

// Cargar FAQs
async function cargarFaqs() {
    const tablaFaqs = document.getElementById('faqs-table-body');
    const emptyElement = document.getElementById('faqs-empty');

    try {
        // Mostrar loading
        tablaFaqs.innerHTML = '';
        emptyElement.classList.add('d-none');

        // Cargar FAQs
        const response = await fetch(API_URL.FAQS);
        if (!response.ok) {
            throw new Error('Error al cargar FAQs');
        }

        faqs = await response.json();

        // Mostrar mensaje si no hay FAQs
        if (faqs.length === 0) {
            emptyElement.classList.remove('d-none');
            return;
        }
        
        // Mostrar FAQs en la tabla
        faqs.forEach(faq => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${faq.id}</td>
                <td>${faq.question}</td>
                <td>${faq.answer}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-primary editar-faq" data-id="${faq.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger eliminar-faq" data-id="${faq.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tablaFaqs.appendChild(row);
        });

        // Agregar eventos a los botones
        document.querySelectorAll('.editar-faq').forEach(btn => {
            btn.addEventListener('click', () => editarFaq(btn.getAttribute('data-id')));
        });

        document.querySelectorAll('.eliminar-faq').forEach(btn => {
            btn.addEventListener('click', () => eliminarFaq(btn.getAttribute('data-id')));
        });
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al cargar FAQs', 'danger');
    }
}

// Abrir modal para nueva FAQ
document.getElementById('nueva-faq-btn').addEventListener('click', () => {
    document.getElementById('faq-form').reset();
    document.getElementById('faq-id').value = '';
    document.getElementById('faq-modal-label').textContent = 'Nueva FAQ';

    const faqModal = new bootstrap.Modal(document.getElementById('faq-modal'));
    faqModal.show();
});

// Guardar FAQ
document.getElementById('guardar-faq-btn').addEventListener('click', async () => {
    const id = document.getElementById('faq-id').value;
    const question = document.getElementById('faq-pregunta').value;
    const answer = document.getElementById('faq-respuesta').value;

    if (!question || !answer) {
        mostrarAlerta('La pregunta y la respuesta son obligatorias', 'warning');
        return;
    }

    const faq = { question, answer };



    try {
        let url = API_URL.FAQS;
        let method = 'POST';
        let successMessage = 'FAQ creada correctamente';

        if (id) {
            url = `${API_URL.FAQS}/${id}`;
            method = 'PUT';
            successMessage = 'FAQ actualizada correctamente';
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(faq)
        });

        if (!response.ok) {
            throw new Error('Error al guardar la FAQ');
        }

        mostrarAlerta(successMessage, 'success');

        // Cerrar modal
        const faqModal = bootstrap.Modal.getInstance(document.getElementById('faq-modal'));
        faqModal.hide();

        // Recargar FAQs
        cargarFaqs();
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al guardar la FAQ', 'danger');
    }
});

// Editar FAQ
function editarFaq(id) {
    const faq = faqs.find(f => f.id == id);
    if (!faq) return;

    document.getElementById('faq-id').value = faq.id;
    document.getElementById('faq-pregunta').value = faq.question;
    document.getElementById('faq-respuesta').value = faq.answer;
    document.getElementById('faq-modal-label').textContent = 'Editar FAQ';

    const faqModal = new bootstrap.Modal(document.getElementById('faq-modal'));
    faqModal.show();
}

// Eliminar FAQ
async function eliminarFaq(id) {
    if (!confirm('¿Está seguro que desea eliminar esta FAQ?')) return;

    try {
        const response = await fetch(`${API_URL.FAQS}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la FAQ');
        }

        mostrarAlerta('FAQ eliminada correctamente', 'success');
        cargarFaqs();
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al eliminar la FAQ', 'danger');
    }
}