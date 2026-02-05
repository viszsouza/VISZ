let numero = 0;
const max = 30;

const intervalo = setInterval(() => {
    document.getElementById("contador").innerText = numero;
    numero++;

    if (numero > max) {
        clearInterval(intervalo);
    }
}, 50);