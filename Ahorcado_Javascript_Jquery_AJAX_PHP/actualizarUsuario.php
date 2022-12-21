<?php

include("conx.php");

$idUsuarioModificar = $_GET['idUsuarioModificar'];
$inputMODemail = $_GET['inputMODemail'];
$inputMODpass = $_GET['inputMODpass'];

$query = "UPDATE usuarios SET email = '$inputMODemail', pass='$inputMODpass' WHERE id = '$idUsuarioModificar'";

$result = $mysqli->query($query);
