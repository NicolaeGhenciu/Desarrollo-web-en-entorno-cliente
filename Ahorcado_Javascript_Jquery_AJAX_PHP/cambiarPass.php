<?php

include("conx.php");

$email = $_GET['email'];
$pass = $_GET['nuevapass'];

$query = "UPDATE usuarios SET pass = '$pass' WHERE email = '$email'";

$result = $mysqli->query($query);
