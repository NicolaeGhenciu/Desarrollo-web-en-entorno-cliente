//Iniciamos las variables globales.
var palabra = "";
var oculta = [];
var vidas = 0;
var victorias = 0;
var derrotas = 0;

//Pistas de audio.
const musicplop = new Audio("mp3/plop.mp3");
const musicwin = new Audio("mp3/win.mp3");
const musiclose = new Audio("mp3/perder.mp3");

//funcion jugar, inicia la partida cuando pulsas en el boton jugar o volver a jugar
function jugar($valor) {

    vidas = 7;

    if ($valor) {
        document.getElementById("victory").style.display = 'block';
        document.getElementById("lose").style.display = 'block';
        document.getElementById("botonjugar").style.display = 'none';
        document.getElementById("diccionario").style.display = 'none';
        document.getElementById("imagenAhorcado").style.display = 'block';
        document.getElementById("vidas").style.display = 'block';
        renderizarTeclado();
    } else {
        document.getElementById("restart").style.display = 'none';
        document.getElementById("diccionario").style.display = 'none';
        document.getElementById("vidas").innerHTML = "Vidas : " + vidas;
        oculta = [];
        cambiarfondo();
        reiniciarTeclado(false);
        imagen();
    }
    palabra = eleccionPalabra();
    palabraOculta();
    convertirPalabraOculta();
    console.log(palabra);
}

//funcion que elige el diccionario dependiendo de lo que hayas seleccionado en el select
function diccionario(num) {

    var animales = ['caballo', 'oveja', 'cerdo', 'chimpance', 'vaca', 'camaleon', 'perro', 'gato', 'toro', 'jirafa', 'iguana', 'gallina', 'hipopotamo', 'raton', 'hipopotamo', 'leon', 'tigre'];
    var futbol = ['pelota', 'gol', 'porteria', 'estadio', 'escuadra', 'tarjeta', 'falta', 'lesion', 'sustitucion', 'arbitro', 'entrenador', 'jugador', 'portero'];
    var paises = ['españa', 'alemania', 'rumania', 'japon', 'catar', 'portugal', 'italia', 'bulgaria', 'moldovia', 'macedonia', 'albania', 'croacia', 'palestia', 'montenegro', 'suiza', 'suecia'];
    switch (num) {
        case "1": return animales;
        case "2": return futbol;
        case "3": return paises;
    }
}

//funcion que elige la palabra aleatoriamente.
function eleccionPalabra() {
    var dic = document.getElementById("diccionario");
    dicSeleccionado = dic.options[dic.selectedIndex].value;
    console.log(dicSeleccionado);
    var dicArr = diccionario(dicSeleccionado);
    var pal = dicArr[parseInt(Math.random() * ((dicArr.length) - 0))];
    while (pal == palabra) {
        var pal = dicArr[parseInt(Math.random() * (4 - 0))];
    }
    return pal;
}

//funcion que genera un array con "_".
function palabraOculta() {
    for (var i = 0; i < palabra.length; i++) {
        oculta[i] = "_";
    }
    return oculta;
}

//funcion que convierte el array en un string.
function convertirPalabraOculta() {
    document.getElementById("palabraOculta").innerHTML = oculta.join(" ");
}

//funcion que crea e imprime un teclado al inicio de la partida.
function renderizarTeclado() {
    tecladoA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var div = document.getElementById("zonateclado");
    var boton = "";
    for (var i = 0; i < tecladoA.length; i++) {
        boton = ("<input type='button' class='tecla' id=" + tecladoA[i] + " value='" + tecladoA[i] + "' onclick=comprobar('" + tecladoA[i] + "')>");
        div.innerHTML += boton;
    }
}

//funcion para reiniciar el teclado
function reiniciarTeclado(valor) {

    var teclado = document.getElementsByClassName("tecla");

    for (var i = 0; i < teclado.length; i++) {
        teclado[i].disabled = valor;
        teclado[i].style.background = "#56412a";
    }
}

//funcion que comprueba la letra y partir de eso realiza varias acciones como el cambio de imagen, la reproduccion de los sonidos...
function comprobar(let) {
    var victoria = true;
    var fallo = true;
    var imag = document.getElementById("imagenAhorcado");
    musicplop.play();
    for (var i = 0; i < palabra.length; i++) {
        if (let == palabra[i].toUpperCase()) {
            oculta[i] = let;
            convertirPalabraOculta();
            fallo = false;
        }
        if (palabra[i].toUpperCase() != oculta[i])
            victoria = false;
    }
    if (fallo) {
        vidas--;
        document.getElementById(let).style.background = '#951F1F';
        document.getElementById("vidas").innerHTML = "<b>Vidas : </b>" + vidas;
    } else {
        document.getElementById(let).style.background = '#2E943B';
    }
    document.getElementById(let).disabled = true; //aqui desactivamos los botones usados
    if (vidas == 0 || victoria) {
        reiniciarTeclado(true);
        document.getElementById("restart").style.display = 'block';
        document.getElementById("diccionario").style.display = 'block';
        if (vidas == 0) {
            musiclose.play();
            derrotas++;
            document.getElementById("lose").innerHTML = 'Derrotas: ' + derrotas;
            document.getElementById("palabraOculta").innerHTML = "<b style='color:red'>¡Has Perdido! </b> &nbsp La palabra era " + palabra;
        }
    }
    if (victoria) {
        musicwin.play();
        victorias++;
        document.getElementById("victory").innerHTML = 'Victorias: ' + victorias;
        imag.src = "img/victoria.gif";
    }
    else
        imagen();
}

//funcion que cambia la imagen del ahorcado dependiendo de las vidas.
function imagen() {
    var imag = document.getElementById("imagenAhorcado");
    switch (vidas) {
        case 0: imag.src = "img/con0vidas.png"; break;
        case 1: imag.src = "img/con1vida.png"; break;
        case 2: imag.src = "img/con2vidas.png"; break;
        case 3: imag.src = "img/con3vidas.png"; break;
        case 4: imag.src = "img/con4vidas.png"; break;
        case 5: imag.src = "img/con5vidas.png"; break;
        case 6: imag.src = "img/con6vidas.png"; break;
        case 7: imag.src = "img/con7vidas.png"; break;
    }
}

//funcion para cambiar la imagen de fondo
function cambiarfondo() {
    var n = parseInt((Math.random() * (3 - 1)));
    var imagen = document.getElementById("cuerpo");
    switch (n) {
        case 1: imagen.style.backgroundImage = "url('img/background.jpg')"; break;
        case 2: imagen.style.backgroundImage = "url('img/background2.jpg')"; break;
        case 0: imagen.style.backgroundImage = "url('img/background3.jpg')"; break;
    }
}