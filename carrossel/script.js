const prev = document.querySelector(".control-prev");
const next = document.querySelector(".control-next");
const slider = document.querySelector(".slider-width");
const totalSlides = document.querySelectorAll(".slider-item").length;
let count = 0;

// Atualiza a margin do meu container
function updateSlider() {
    slider.style.marginLeft = `-${count * 100}vw`;
}

next.addEventListener('click', () => {
    // Divisão de resto
    count = (count + 1) % totalSlides;
    console.log(count);
    updateSlider();
});

prev.addEventListener('click', () => {
    // Divisão de resto
    count = (count - 1 + totalSlides) % totalSlides;
    updateSlider();
});