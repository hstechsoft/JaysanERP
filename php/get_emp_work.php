<?php
 include 'db_head.php';

 
 $emp_id = test_input($_GET['emp_id']);
 $start_time = test_input($_GET['start_time']);
 $end_time = test_input($_GET['end_time']);
 

function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$data = "'".$data."'";
return $data;
}

$sql = "SELECT work_date,work_type,work_description,work_location  FROM work where emp_id = $emp_id and  work_date between $start_time and $end_time";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    print json_encode($rows);
} else {
  echo "0 result";
}
$conn->close();

 ?>


