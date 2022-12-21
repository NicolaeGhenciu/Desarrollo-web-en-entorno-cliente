//Iniciamos las variables globales.
var victoria = true;
var selectSeleccionado = "";
var palabra = "";
var oculta = [];
var vidas = 0;
var puntuacion = 0;
var email = "";
var id = "";
var resultado = "";
var esAdmin = 0;
var pass = "";
//var victorias = 0;
//var derrotas = 0;


//Pistas de audio.
const musicplop = new Audio("mp3/plop.mp3");
const musicwin = new Audio("mp3/win.mp3");
const musiclose = new Audio("mp3/perder.mp3");
const musicuh = new Audio("mp3/uh.mp3");
const music = new Audio("mp3/music.mp3");


//______Datos inicio de Sesion

//Obtener los datos de inicio de sesion

const queryString = window.location.search;

// Convierte la cadena de consulta en un objeto con clave-valor
const urlParams = new URLSearchParams(queryString);

id = urlParams.get("id");

//_________ Datos inicio de sesion

getUser(); // cogemos los datos del usuario

creaSelect(); // Creamos el select

//funcion jugar, inicia la partida cuando pulsas en el boton jugar o volver a jugar

function jugar($valor) {

    music.play();

    puntuacion = 0;

    vidas = 7;

    if ($valor) {

        if (esAdmin == 1) {
            $(".modoAdmin").show('slow');
        }

        $("#asideI").show('slow');
        $("#barranavegacion").show('slow');
        $("#caja1").show('slow');
        $(".resolver").show('slow');

        $("#elmain").hide('slow');
        $("#categorias").hide('slow');
        $("#botonjugar").hide('slow');
        $("#diccionario").hide('slow');

        renderizarTeclado();

    } else {

        $("#restart").hide();
        $("#diccionario").hide();

        document.getElementById("vidas").innerHTML = "Vidas : " + vidas;
        oculta = [];
        cambiarfondo();
        reiniciarTeclado(false);
        imagen();
    }

    selectSeleccionado = eleccionCategoria();

    eleccionPalabra();

    palabraOculta();

    convertirPalabraOculta();

    $(".resolver").show('slow');
    $(".cerrarSesion").show('slow');

    $("#selectCateg").html("<b>Categoria : </b>" + selectSeleccionado);

    $("#puntuacion").html("<b>Puntuación : </b>" + puntuacion);

}

//funcion que me elije la palabra 
function eleccionPalabra() {
    $.ajax({
        url: "getPalabra.php",
        type: "GET",
        async: false, // <-- Establecemos la propiedad async en false
        data: { selectSeleccionado: selectSeleccionado },
        success: function (response) {

            var palabraAjax = response;

            palabra = palabraAjax;

            console.log(palabra);

        }
    });
}


//funcion que elige la palabra aleatoriamente.
function eleccionCategoria() {
    var dic = document.getElementById("diccionario");
    dicSeleccionado = dic.options[dic.selectedIndex].value;
    selectSeleccionado = dicSeleccionado;
    return dicSeleccionado;
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
    victoria = true;
    var fallo = true;
    var imag = document.getElementById("imagenAhorcado");
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
        --puntuacion;
        $("#puntuacion").html("<b>Puntuación : </b>" + puntuacion);
        vidas--;
        musicuh.play();
        document.getElementById(let).style.background = '#951F1F';
        $("#vidas").html("<b>Vidas : </b>" + vidas);
    } else {
        puntuacion += 2;
        musicplop.play();
        $("#puntuacion").html("<b>Puntuación : </b>" + puntuacion);
        document.getElementById(let).style.background = '#2E943B';
    }
    document.getElementById(let).disabled = true; //aqui desactivamos los botones usados
    if (vidas == 0 || victoria) {
        reiniciarTeclado(true);

        $("#restart").show('slow');
        $("#elmain").show('slow');
        $("#diccionario").show('slow');

        if (vidas == 0) {

            $(".resolver").hide('slow');
            $(".palabraResolver").hide('slow');
            $(".botonEnviar").hide('slow');

            resultado = "Derrota";
            puntuacion -= 5;
            insertPuntuaciones();
            creaTablaPuntuaciones();
            musiclose.play();
            $("#puntuacion").html("<b>Puntuación : </b>" + puntuacion);
            document.getElementById("palabraOculta").innerHTML = "<b style='color:red'>¡Has Perdido! </b> &nbsp La palabra era " + palabra;

            //derrotas++;
            //document.getElementById("lose").innerHTML = 'Derrotas: ' + derrotas;
        }
    }
    if (victoria) {

        $(".resolver").hide('slow');
        $(".palabraResolver").hide('slow');
        $(".botonEnviar").hide('slow');

        resultado = "Victoria";
        puntuacion += 10;
        insertPuntuaciones();
        creaTablaPuntuaciones();
        musicwin.play();
        $("#puntuacion").html("<b>Puntuación : </b>" + puntuacion);
        imag.src = "img/victoria.gif";

        //victorias++;
        //document.getElementById("victory").innerHTML = 'Victorias: ' + victorias;

    }
    else
        imagen();
}

function resolver() {
    $(".resolver").hide('slow');

    $(".botonEnviar").show('slow');
    $(".palabraResolver").show('slow');
}

function enviar() {
    $(".resolver").show('slow');

    $(".botonEnviar").hide('slow');
    $(".palabraResolver").hide('slow');

    var valorInput = $('.palabraResolver').val();

    if (palabra == valorInput.toUpperCase()) {
        var imag = document.getElementById("imagenAhorcado");

        $(".resolver").hide('slow');

        $("#restart").show('slow');
        $("#elmain").show('slow');
        $("#diccionario").show('slow');

        reiniciarTeclado(true);

        puntuacion += 10;
        resultado = "Victoria";
        insertPuntuaciones()
        musicwin.play();
        $("#puntuacion").html("<b>Puntuación : </b>" + puntuacion);
        document.getElementById("palabraOculta").innerHTML = palabra;
        imag.src = "img/victoria.gif";

    } else {
        $('.palabraResolver').val('');
        puntuacion -= 5;
        musicuh.play();
        vidas--;
        $("#vidas").html("<b>Vidas : </b>" + vidas);
        $("#puntuacion").html("<b>Puntuación : </b>" + puntuacion);
        imagen();
    }
    $('.palabraResolver').val('');
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

function miCuenta() {
    creaTablaPuntuaciones();

    $('#contraseniaActual').text(pass);

    $(".botonEnviar").hide('slow');
    $(".palabraResolver").hide('slow');
    $("#usuariosDiv").hide('slow');
    $("#inicio").hide('slow');
    $("#listaPalabras").hide('slow');
    $(".resolver").hide('slow');
    $("#imagenAhorcado").hide('slow');
    $("#caja1").hide('slow');
    $("#zonateclado").hide('slow');
    $("#cajaspan").hide('slow');
    $("#datosPalabra").hide('slow');
    $("#modificarDiv").hide('slow');
    $("#listaUsuarios").hide('slow');


    $("#datosUsuario").show('slow');
    $(".botonEnviarPass").show('slow');
    $("#partidasJugadas").show('slow');

}

function cambiarPass() {
    var nuevapass = $('#inputContrasenia').val();
    if (nuevapass != "") {
        $.ajax({
            type: "GET",
            async: false,
            url: "cambiarPass.php",
            data: { email: email, nuevapass: nuevapass },
            success: function (response) {
                console.log("Todo Correcto");
            }
        });
    } else {
        alert("Campo nueva contraseña no puede estar vacio!")
    }
    $('#inputContrasenia').val('');

    getUser();

    $('#contraseniaActual').text(pass);
}

function volverAlaPartida() {
    $(".botonEnviar").hide('slow');
    $(".palabraResolver").hide('slow');
    $("#modificarDiv").hide('slow');
    $("#datosUsuario").hide('slow');
    $("#partidasJugadas").hide('slow');
    $("#listaPalabras").hide('slow');
    $("#datosPalabra").hide('slow');
    $("#listaUsuarios").hide('slow');
    $("#usuariosDiv").hide('slow');

    $("#inicio").show('slow');
    $("#imagenAhorcado").show('slow');
    $("#caja1").show('slow');
    $("#zonateclado").show('slow');
    $("#cajaspan").show('slow');


    if (victoria && vidas == 7 && puntuacion == 0 || vidas > 0) {
        $(".resolver").show('slow');
    }

    if ((victoria && vidas != 7 ) || vidas == 0) {
        $(".resolver").hide('slow');
    }


}



function listaJugadores() {
    creaTablaUsuarios();

    $(".botonEnviar").hide('slow');
    $(".palabraResolver").hide('slow');
    $("#datosUsuario").hide('slow');
    $("#partidasJugadas").hide('slow');
    $("#inicio").hide('slow');
    $(".resolver").hide('slow');
    $("#imagenAhorcado").hide('slow');
    $("#caja1").hide('slow');
    $("#zonateclado").hide('slow');
    $("#cajaspan").hide('slow');
    $("#listaPalabras").hide('slow');
    $("#modificarDiv").hide('slow');

    $("#usuariosDiv").show('slow');
    $("#listaUsuarios").show('slow');

}


function listaPlabras() {
    creaTablaPalabras();

    $(".botonEnviar").hide('slow');
    $(".palabraResolver").hide('slow');
    $("#datosUsuario").hide('slow');
    $("#partidasJugadas").hide('slow');
    $("#inicio").hide('slow');
    $(".resolver").hide('slow');
    $("#imagenAhorcado").hide('slow');
    $("#caja1").hide('slow');
    $("#zonateclado").hide('slow');
    $("#cajaspan").hide('slow');
    $("#listaUsuarios").hide('slow');
    $("#usuariosDiv").hide('slow');

    $("#listaPalabras").show('slow');
    $("#modificarDiv").show('slow');
}

function getUser() {
    $.ajax({
        type: "GET",
        async: false,
        url: "getUser.php",
        data: { id: id },
        dataType: "json",
        success: function (response) {

            var datosUsuario = response;
            email = datosUsuario['email'];
            esAdmin = datosUsuario['esadmin'];
            pass = datosUsuario['pass'];

        }
    });
}

function buscarUsuario() {
    $("#emailBuscar").show('slow');
    $(".botonBuscarUsuario").show('slow');

    $("#datosUsuarioMOD").hide('slow');
}

function botonInsertar() {
    $("#nuevapalabra").show('slow');
    $("#nuevacategoria").show('slow');
    $(".botonInsertarPalabra").show('slow');
}

function botonInsertarUsuario() {
    $("#newemail").show('slow');
    $("#newpass").show('slow');
    $("#newadmin").show('slow');
    $(".botonInsertarUsuario").show('slow');
}

function insertarPalabra() {
    $("#nuevapalabra").hide('slow');
    $("#nuevacategoria").hide('slow');
    $(".botonInsertarPalabra").hide('slow');

    $.ajax({
        type: "GET",
        async: false,
        url: "insertarPalabra.php",
        data: { nuevapalabra: $("#nuevapalabra").val(), nuevacategoria: $("#nuevacategoria").val() },
        success: function (response) {
            console.log("Todo Correcto");
        }
    });
    $("#nuevapalabra").val('');
    $("#nuevacategoria").val('');

    creaTablaPalabras();
}

function insertarUsuario() {
    $("#newemail").hide('slow');
    $("#newpass").hide('slow');
    $("#newadmin").hide('slow');
    $(".botonInsertarUsuario").hide('slow');

    $.ajax({
        type: "GET",
        async: false,
        url: "insertarUsuario.php",
        data: { newemail: $("#newemail").val(), newpass: $("#newpass").val(), newadmin: $("#newadmin").val() },
        success: function (response) {
            console.log("Todo Correcto");
        }
    });

    $("#newemail").val('');
    $("#newpass").val('');
    $("#newadmin").val('');

    creaTablaUsuarios();
}

function insertPuntuaciones() {
    $.ajax({
        type: "GET",
        async: false,
        url: "insertPuntuacion.php",
        data: { email: email, puntuacion: puntuacion, resultado: resultado },
        success: function (response) {
            console.log("Todo Correcto");
        }
    });
}

function borrarPlabra(idPalabra) {
    $.ajax({
        type: "GET",
        async: false,
        url: "borrarPalabra.php",
        data: { idPalabra: idPalabra },
        success: function (response) {
            console.log("Todo Correcto");
        }
    });
    creaTablaPalabras();
}

function borrarUsuario(idUsuario) {
    $.ajax({
        type: "GET",
        async: false,
        url: "borrarUsuario.php",
        data: { idUsuario: idUsuario },
        success: function (response) {
            console.log("Todo Correcto");
        }
    });
    creaTablaUsuarios();
}

var idPalabraModificar = "";

function modificarPlabra(idPalabra, palabraMod, categoriaMod) {
    $("#datosPalabra").show('slow');

    $('#inputMODpalabra').val(palabraMod);
    $('#inputMODcategoria').val(categoriaMod);

    idPalabraModificar = idPalabra;
}

function ajaxModificarPalabra() {
    var palabraMod = $('#inputMODpalabra').val();
    var categoriaMod = $('#inputMODcategoria').val();

    $.ajax({
        type: "GET",
        async: false,
        url: "actualizarPalabra.php",
        data: { idPalabra: idPalabraModificar, palabraMod: palabraMod, categoriaMod: categoriaMod },
        success: function (response) {
            console.log("Todo Correcto");
        }
    });

    creaTablaPalabras();

    $("#datosPalabra").hide('slow');
}

var idUsuarioModificar = "";

function modificarUsuario(idUsuario, emailUsuario, passUsuario) {
    $("#emailBuscar").hide('slow');
    $(".botonBuscarUsuario").hide('slow');
    $("#datosUsuarioMOD").show('slow');

    $('#inputMODemail').val(emailUsuario);
    $('#inputMODpass').val(passUsuario);

    idUsuarioModificar = idUsuario;
}

function ajaxModificarUsuario() {
    var inputMODemail = $('#inputMODemail').val();
    var inputMODpass = $('#inputMODpass').val();

    $.ajax({
        type: "GET",
        async: false,
        url: "actualizarUsuario.php",
        data: { idUsuarioModificar: idUsuarioModificar, inputMODemail: inputMODemail, inputMODpass: inputMODpass },
        success: function (response) {
            console.log("Todo Correcto");
        }
    });

    creaTablaUsuarios();

    $("#datosUsuarioMOD").hide('slow');
}

function creaTablaPuntuaciones() {

    $.ajax({
        type: "GET",
        async: false,
        url: 'mipuntuacion.php',
        data: { email: email },

        success: function (data) {

            data = JSON.parse(data);
            console.log(data);

            var selectHTML = '<table id="tablaPuntuacion"><th>ID</th><th>EMAIL</th><th>RESULTADO</th><th>PUNTUACIÓN</th>';

            for (var i = 0; i < data.length; i++) {

                selectHTML += '<tr>' + '<td>' + data[i]["id"] + '</td>' + '<td>' + data[i]["email"] + '</td>' + '<td>' + data[i]["resultado"] + '</td>' + '<td>' + data[i]["puntuacion"] + '</td>' + '</tr>';

            }

            selectHTML += '</table>';

            $('#partidasJugadas').html(selectHTML);

        }
    });
}

function creaTablaUsuarios() {

    $.ajax({
        type: "GET",
        async: false,
        url: 'usuarios.php',

        success: function (data) {

            data = JSON.parse(data);
            console.log(data);

            var selectHTML = '<table id="tablaUsuarios"><th>ID</th><th>EMAIL</th><th>CONTRASEÑA</th><th>ESADMIN</th><th>BORRAR</th><th>MODIFICAR</th>';

            for (var i = 0; i < data.length; i++) {

                selectHTML += '<tr>' + '<td>' + data[i]["id"] + '</td>' + '<td>' + data[i]["email"] + '</td>' +
                    '<td>' + data[i]["pass"] + '</td>' + '<td>' + data[i]["esadmin"] + '</td>' + '<td><input type="button" class="botonRojo" value="Borrar" onclick="borrarUsuario(' +
                    data[i]["id"] + ')"> ' + '</td>' + '<td>' + '<input type="button" class="botonAmarillo" value="Modificar" onclick="modificarUsuario(' +
                    data[i]["id"] + ",'" + data[i]["email"] + "','" + data[i]["pass"] + "'" + ')"> ' + '</td>' + '</tr>';
            }

            selectHTML += '</table>';

            $('#listaUsuarios').html(selectHTML);

        }
    });
}

function creaTablaUsuariosBuscar() {
    $("#emailBuscar").hide('slow');
    $(".botonBuscarUsuario").hide('slow');

    $.ajax({
        type: "GET",
        async: false,
        url: 'buscarUsuarios.php',
        data: { emailBuscar: $("#emailBuscar").val() },
        success: function (data) {

            data = JSON.parse(data);
            console.log(data);

            var selectHTML = '<table id="tablaUsuarios"><th>ID</th><th>EMAIL</th><th>CONTRASEÑA</th><th>ESADMIN</th><th>BORRAR</th><th>MODIFICAR</th>';

            for (var i = 0; i < data.length; i++) {

                selectHTML += '<tr>' + '<td>' + data[i]["id"] + '</td>' + '<td>' + data[i]["email"] + '</td>' +
                    '<td>' + data[i]["pass"] + '</td>' + '<td>' + data[i]["esadmin"] + '</td>' + '<td><input type="button" class="botonRojo" value="Borrar" onclick="borrarUsuario(' +
                    data[i]["id"] + ')"> ' + '</td>' + '<td>' + '<input type="button" class="botonAmarillo" value="Modificar" onclick="modificarUsuario(' +
                    data[i]["id"] + ",'" + data[i]["email"] + "','" + data[i]["pass"] + "'" + ')"> ' + '</td>' + '</tr>';
            }

            selectHTML += '</table>';

            $('#listaUsuarios').html(selectHTML);

        }
    });
}

function creaTablaPalabras() {

    $.ajax({
        type: "GET",
        async: false,
        url: 'palabras.php',

        success: function (data) {

            data = JSON.parse(data);
            console.log(data);

            var selectHTML = '<table id="tablaPalabras"><th>ID</th><th>PALABRAS</th><th>CATEGORIAS</th><th>BORRAR</th><th>MODIFICAR</th>';

            for (var i = 0; i < data.length; i++) {

                selectHTML += '<tr id=' + data[i]["id"] + ' >' + '<td>' + data[i]["id"] + '</td>' + '<td>' + data[i]["palabra"] + '</td>' +
                    '<td>' + data[i]["categoria"] + '</td>' + '<td>' + '<input type="button" class="botonRojo" value="Borrar" onclick="borrarPlabra(' +
                    data[i]["id"] + ')"> ' + '</td>' + '<td>' + '<input type="button" class="botonAmarillo" value="Modificar" onclick="modificarPlabra(' +
                    data[i]["id"] + ",'" + data[i]["palabra"] + "','" + data[i]["categoria"] + "'" + ')"> ' + '</td>' + '</tr>';

            }

            selectHTML += '</table>';

            $('#listaPalabras').html(selectHTML);

        }
    });
}

function creaSelect() {
    $.ajax({
        url: 'categorias.php',

        type: 'GET',

        success: function (data) {

            data = JSON.parse(data);

            var selectHTML = '<select id="diccionario">';

            for (var i = 0; i < data.length; i++) {

                selectHTML += '<option value="' + data[i]["categoria"] + '">' + data[i]["categoria"] + '</option>';
            }

            selectHTML += '</select>';

            $('#caja2').html(selectHTML);
        }
    });

}