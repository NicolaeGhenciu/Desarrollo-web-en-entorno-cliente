<?php

include("conx.php");

$query = "SELECT * FROM usuarios";
$result = $mysqli->query($query);

// crear un array para almacenar las categorías
$categorias = array();

// obtener cada fila del resultado y agregarla al array
while ($row = $result->fetch_assoc()) {
    $categorias[] = $row;
}

// devolver el array de categorías como una respuesta JSON
echo json_encode($categorias);
