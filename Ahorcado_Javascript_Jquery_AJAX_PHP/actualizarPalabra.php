<?php

include("conx.php");

$idPalabra = $_GET['idPalabra'];
$categoriaMod = $_GET['categoriaMod'];
$palabraMod = $_GET['palabraMod'];

$query = "UPDATE diccionario SET palabra = '$palabraMod', categoria='$categoriaMod' WHERE id = '$idPalabra'";

$result = $mysqli->query($query);
