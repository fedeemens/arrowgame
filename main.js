// Variables globales
const gameContainer = document.querySelector(".game-container");
const scoreElement = document.querySelector("#score");
const scoreFinal = document.querySelector("#scoreFinal");
const derrota = document.querySelector("#derrota");

const direcciones = ["up","right","down","left"];

let participante;

let direccion;
let esDireccionContraria;
let score = 0;
scoreFinal.textContent = 0;

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

let flechaSeleccionada;



// Crear flecha
function siguienteFlecha() { //Crea una nueva flecha
    direccion = direcciones[getRandomInt(4)];
    esDireccionContraria = getRandomInt(2);

    const newElement = document.createElement("i");
    newElement.classList.add("fas", 'fa-arrow-circle-'+direccion, "arrow", "animacion");
    if (esDireccionContraria) {
        newElement.style.color= "#ff6384";
    }
    else {
        newElement.style.color= "#36a2eb";
    }
    gameContainer.appendChild(newElement);
}

function getRandomInt(max) { //Devuelve un numero random entre 0 y max-1
    return Math.floor(Math.random()*max);
}

// Verificar tecla oprimida
window.addEventListener("keydown",jugada);
gameContainer.addEventListener("touchstart",look);
gameContainer.addEventListener("touchend",release);

function look() {
    if(!event.target.classList.contains("arrow")) return;
    startX = event.changedTouches[0].screenX;
    startY = event.changedTouches[0].screenY;
}
function release() {
    if(!startX) return;
    endX = event.changedTouches[0].screenX;
    endY = event.changedTouches[0].screenY;
    manejadorResultadoMovil();
}

function jugada(event) { 
    flechaSeleccionada = event.key;
    manejadorResultado();
}

function correctDirection() { //Devuelve la direccion que deberia ser la correcta
    if(!esDireccionContraria) return direccion;
    if(direccion==="up") return "down";
    if(direccion==="right") return "left";
    if(direccion==="down") return "up";
    if(direccion==="left") return "right";
}

function validarResultado() { //Valida si la tecla oprimida fue correcta
    let result = "";
    if(correctDirection()==="up") {
        if(flechaSeleccionada === "ArrowUp") result="correcto";
        else result="error";
    }
    else if(correctDirection()==="right") {
        if(flechaSeleccionada === "ArrowRight") result="correcto";
        else result="error";
    }
    else if(correctDirection()==="left") {
        if(flechaSeleccionada === "ArrowLeft") result="correcto";
        else result="error";
    }
    else if(correctDirection()==="down") {
        if(flechaSeleccionada === "ArrowDown") result="correcto";
        else result="error";
    }
    return result;
}

function manejadorResultado(){ //Maneja las acciones si el resultado fue correcto o no
    const result = validarResultado();
    if (result==="correcto"){
        score+=10;
        scoreElement.textContent = score;
        document.querySelector(".arrow").remove();
        siguienteFlecha();
        scoreFinal.textContent = score;
        timeMax = 8 - Math.log(score);
        time = timeMax;
    }
    else if (result==="error"){
        derrota.classList.add("visible");
        window.removeEventListener("keydown",jugada);
        return false;
    }
    
}

// Validacion para movil
function validarResultadoMovil() { //Valida si la tecla oprimida fue correcta
    let result = "";
    if(correctDirection()==="up") {
        if(endY < startY) result="correcto";
        else if(endY > startY) result="error";
    }
    else if(correctDirection()==="right") {
        if(endX > startX) result="correcto";
        else if(endX < startX) result="error";
    }
    else if(correctDirection()==="left") {
        if(endX < startX) result="correcto";
        else if(endX > startX) result="error";
    }
    else if(correctDirection()==="down") {
        if(endY > startY) result="correcto";
        else if(endY < startY) result="error";
    }
    return result;
}
function manejadorResultadoMovil(){ //Maneja las acciones si el resultado fue correcto o no
    const result = validarResultadoMovil();
    if (result==="correcto"){
        score+=10;
        scoreElement.textContent = score;
        document.querySelector(".arrow").remove();
        siguienteFlecha();
        scoreFinal.textContent = score;
        timeMax = 8 - Math.log(score);
        time = timeMax;
    }
    else if (result==="error"){
        derrota.classList.add("visible");
        window.removeEventListener("keydown",jugada);
        return false;
    }
    
}

// Time bar
const timeBarElement = document.querySelector("#time-bar");
setInterval(tiempo, 10);

var timeMax = 99999999999999999999999;
var time = timeMax;
function tiempo() {
    if (time > 0) { 
        time -= 0.01; 
        var tiempoBarra = (time * 100)/timeMax;
        timeBarElement.setAttribute("style", `width: ${tiempoBarra}%;`);
        if (tiempoBarra < 25) {
            timeBarElement.setAttribute("style", `width: ${tiempoBarra}%;background:#ff6384;`)
        };
    }
    else {
        timeBarElement.setAttribute("style", `width: 0%;`)
        derrota.classList.add("visible");
        window.removeEventListener("keydown",jugada);
    }
}

// Restart 
const buttonRestart = document.querySelector("#restart");
buttonRestart.addEventListener("click",function () {
    timeMax = 8;
    time = 8;
    score = 0;
    scoreElement.textContent= "0";
    derrota.classList.remove("visible");
    window.addEventListener("keydown",jugada);
    document.querySelector(".arrow").remove();
    siguienteFlecha();
    document.body.requestFullscreen();
})

// boton siguiente
const nextButton = document.querySelector("#btnSiguiente");
const instruc = document.querySelector("#instrucciones");
const nicknameSeccion = document.querySelector("#nicknameSeccion");
const foot = document.querySelector("#footer");
nextButton.addEventListener("click",function () {
    instruc.style.opacity = 0;
    instruc.style.visibility = "hidden";
    foot.style.opacity = 1;
    foot.style.visibility = "visible";
    // nicknameSeccion.style.opacity = 1;
    // nicknameSeccion.style.visibility = "visible";
    // Iniciar el juego
    siguienteFlecha();
    document.body.requestFullscreen();
    participante = nickname.value;
    if (participante == '') { participante = "no name" };
    
})
const nickname = document.querySelector("#nickname");    

// boton jugar
const playButton = document.querySelector("#jugar");
playButton.addEventListener("click",function () {
    nicknameSeccion.style.opacity = 0;
    nicknameSeccion.style.visibility = "hidden";
    // Iniciar el juego
    siguienteFlecha();
    document.body.requestFullscreen();
    participante = nickname.value;
    if (participante == '') { participante = "no name" };
})



