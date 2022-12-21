<?php

include("conx.php");

$email = $_GET['email'];
$resultado = $_GET['resultado'];
$puntuacion = $_GET['puntuacion'];

$query = "INSERT INTO puntuacion (email, resultado, puntuacion) VALUES ('$email', '$resultado', $puntuacion);";

$result = $mysqli->query($query);
