<?php
 include 'db_head.php';

 $newPartName = test_input($_GET['newPartName']);
$newPartNo = test_input($_GET['newPartNo']);
$newPartDes = test_input($_GET['newPartDes']);


 
 
function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$data = "'".$data."'";
return $data;
}



$sql = "INSERT INTO parts_tbl (part_name, part_no, des) VALUES ($newPartName, $newPartNo, $newPartDes)";


  if ($conn->query($sql) === TRUE) {
   echo "ok";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
$conn->close();

 ?>

