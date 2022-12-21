<?php

include("conx.php");

$email = $_GET['email'];
$pass = $_GET['pass'];

$query = "SELECT * FROM usuarios WHERE pass='$pass' AND email='$email'";

if ($result = $mysqli->query($query)) {

    $row = $result->fetch_assoc();
    echo $json_datos_usuario = json_encode($row);
}
