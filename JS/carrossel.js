const carousel = document.getElementById("carousel");
const cards = document.querySelectorAll(".card");
const indicator = document.getElementById("indicator");
const fade = document.getElementById("carouselFade");

// --------------------
// CRIAR INDICADORES
// --------------------
cards.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    indicator.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-indicator span");

let index = 0;
let isAutoScrolling = false;

// --------------------
// CENTRALIZAR CARD
// --------------------
function centerCard(i) {
    const card = cards[i];
    const offset =
        card.offsetLeft -
        carousel.offsetWidth / 2 +
        card.offsetWidth / 2;

    carousel.scrollTo({
        left: offset,
        behavior: "smooth"
    });
}

// --------------------
// ATUALIZAR ACTIVE
// --------------------
function updateActive() {
    cards.forEach(c => c.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    cards[index].classList.add("active");
    dots[index].classList.add("active");
}

// --------------------
// AUTOPLAY
// --------------------
function nextSlide() {
    isAutoScrolling = true;

    index++;
    if (index >= cards.length) index = 0;

    centerCard(index);
    updateActive();

    // libera observer depois da animação
    setTimeout(() => {
        isAutoScrolling = false;
    }, 700);
}

let autoplay = setInterval(nextSlide, 3000);

// --------------------
// OBSERVER PARA DRAG MANUAL
// --------------------
const observer = new IntersectionObserver(entries => {
    if (isAutoScrolling) return;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const i = [...cards].indexOf(entry.target);
            index = i;
            updateActive();
        }
    });
}, {
    root: carousel,
    threshold: 0.9 // evita 2 cards ativos
});

cards.forEach(card => observer.observe(card));

// --------------------
// DEGRADE SUMIR NAS BORDAS
// --------------------
function checkEdges() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const scroll = carousel.scrollLeft;

    // esquerda
    if (scroll <= 5) fade.classList.add("hide-left");
    else fade.classList.remove("hide-left");

    // direita
    if (scroll >= maxScroll - 5) fade.classList.add("hide-right");
    else fade.classList.remove("hide-right");
}

carousel.addEventListener("scroll", checkEdges);
window.addEventListener("load", checkEdges);
