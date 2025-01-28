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