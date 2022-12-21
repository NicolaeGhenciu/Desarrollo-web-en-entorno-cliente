<?php

include("conx.php");

$nuevapalabra = $_GET['nuevapalabra'];
$nuevacategoria = $_GET['nuevacategoria'];

$query = "INSERT INTO diccionario (palabra, categoria) VALUES ('$nuevapalabra', '$nuevacategoria');";

$result = $mysqli->query($query);
