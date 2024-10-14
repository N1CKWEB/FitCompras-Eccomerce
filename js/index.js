const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1;
    }
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

function updateCarousel() {
    const width = carousel.clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * width}px)`;
}


// barra

const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});
