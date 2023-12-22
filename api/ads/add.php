<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

include '../core/db.php';
$response = array('result' => true, 'token' => '', 'error' => '');
global $pdo;
$currentDateTime = date('Y-m-d H:i:s');

$destination=$_POST['destination'];
$minute=$_POST['minute'];
$mobile=$_POST['mobile'];
$name=$_POST['name'];
$passengerCount=$_POST['passengerCount'];
$source=$_POST['source'];
$startTime=$_POST['startTime'];
$type=$_POST['type'];
      $insert = $pdo->prepare("insert into ads(name,type,startTime,passengerCount,source,destination,mobile,created)values(:name,:type,:startTime,:passengerCount,:source,:destination,:mobile,:created)");
      $insert->execute(array(
        ':name' => $name,
        ':type' => $type,
        ':startTime' => $startTime,
        ':passengerCount' => $passengerCount,
        ':source' => $source,
        ':destination' => $destination,
        ':mobile' => $mobile,
        ':created' => $currentDateTime
      ));

echo json_encode($response);
?>
