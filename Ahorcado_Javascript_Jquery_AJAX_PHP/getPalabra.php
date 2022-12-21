<?php

include("conx.php");

$selectSeleccionado = $_GET['selectSeleccionado'];

$query = "SELECT palabra FROM diccionario WHERE categoria='$selectSeleccionado' ORDER BY RAND() LIMIT 1 ";

if ($result = $mysqli->query($query)) {

    // Obtener la palabra del resultado de la consulta
    $row = $result->fetch_assoc();
    $palabra = $row['palabra'];

    // Imprimir la palabra en la respuesta de la solicitud
    echo $palabra;
}

