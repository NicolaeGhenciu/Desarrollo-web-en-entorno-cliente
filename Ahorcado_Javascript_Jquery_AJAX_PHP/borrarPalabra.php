<?php

include("conx.php");

$idPalabra = $_GET['idPalabra'];

$query = "DELETE FROM diccionario WHERE id = $idPalabra";

$result = $mysqli->query($query);
