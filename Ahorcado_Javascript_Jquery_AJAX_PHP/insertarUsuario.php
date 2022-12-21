<?php

include("conx.php");

$newemail = $_GET['newemail'];
$newpass = $_GET['newpass'];
$newadmin = $_GET['newadmin'];

$query = "INSERT INTO usuarios (email, pass, esadmin) VALUES ('$newemail', '$newpass', $newadmin);";

$result = $mysqli->query($query);
