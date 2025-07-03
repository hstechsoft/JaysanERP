<?php
 include 'db_head.php';

 $mrf_id = test_input($_GET['mrf_id']);
$tally_stock_array = ($_GET['tally_stock_array']);
$tally_stock_approved_by = test_input($_GET['tally_stock_approved_by']);

 
 
function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$data = "'".$data."'";
return $data;
}

 foreach ($tally_stock_array as $tally_stock)
{ 
   $godown_id = $physical_stock['godown_id']; 
  $qty = $physical_stock['qty']; 


 $sql = "INSERT INTO internal_godown_stock_tally ( mrf_id,godown_id,qty) VALUES ($mrf_id,'$godown_id','$qty')";

  if ($conn->query($sql) === TRUE) {

  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$sql_update = "UPDATE material_request_form SET status='tally_stock_updated' , 	tally_stock_approved_by = $tally_stock_approved_by  where mrf_id = $mrf_id";

if ( $conn->query($sql_update) === TRUE) {


} else {
  echo "Error: " . $sql_update . "<br>" .  $conn->error;
}
   echo "ok";
$conn->close();

 ?>


