<?php

include("conx.php");

$idUsuario = $_GET['idUsuario'];

$query = "DELETE FROM usuarios WHERE id = $idUsuario";

$result = $mysqli->query($query);
