<?php

include("conx.php");

$id = $_GET['id'];

$query = "SELECT * FROM usuarios WHERE id='$id'";

if ($result = $mysqli->query($query)) {

    $row = $result->fetch_assoc();
    echo $json_datos_usuario = json_encode($row);
}
