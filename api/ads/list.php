<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

include '../core/db.php';
$response = array('result' => true, 'error' => '', 'data' => []);
global $pdo;
    $sql = "select * from ads order by id desc";

  $query = $pdo->query($sql);
  $counter=1;
  while ($fetch = $query->fetch()) {
    $response['data'][] = array(
      'counter' => $counter,
      'type' => $fetch['type'],
      'name' => $fetch['name'],
      'startTime' => $fetch['startTime'],
      'passengerCount' => $fetch['passengerCount'],
      'source' => $fetch['source'],
      'destination' => $fetch['destination'],
      'mobile' => $fetch['mobile']
    );
    $counter++;
}

echo json_encode($response);
?>
