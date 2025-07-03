<?php
 include 'db_head.php';

 $emp_id = test_input($_GET['emp_id']);
$part_id = test_input($_GET['part_id']);
$bom_production = test_input($_GET['bom_production']);
$order_type = test_input($_GET['order_type']);
$shortfall_qty = test_input($_GET['shortfall_qty']);
$stock_for_sufficent_days = test_input($_GET['stock_for_sufficent_days']);
$req_qty = test_input($_GET['req_qty']);
$req_date = test_input($_GET['req_date']);
$last_purchase_date = test_input($_GET['last_purchase_date']);
$last_purchase_qty = test_input($_GET['last_purchase_qty']);
$material_receipt_status = test_input($_GET['material_receipt_status']);
$prepared_by = test_input($_GET['prepared_by']);
$physical_stock_array = ($_GET['physical_stock_array']);


 
function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$data = "'".$data."'";
return $data;
}


 $sql = "INSERT INTO material_request_form ( emp_id,part_id,bom_production,order_type,shortfall_qty,stock_for_sufficent_days,req_qty,req_date,last_purchase_date,last_purchase_qty,material_receipt_status,prepared_by) VALUES ($emp_id,$part_id,$bom_production,$order_type,$shortfall_qty,$stock_for_sufficent_days,$req_qty,$req_date,$last_purchase_date,$last_purchase_qty,$material_receipt_status,$prepared_by)";

  if ($conn->query($sql) === TRUE) {
  $mrf_id = $conn->insert_id;
 foreach ($physical_stock_array as $physical_stock)
{ 
  $godown_id = $physical_stock['godown_id']; 
  $qty = $physical_stock['qty']; 

$sql_insert_physical_stock = "INSERT INTO internal_godown_stock_physical (mrf_id,godown_id,qty) VALUES ($mrf_id,'$godown_id','$qty')";
  if ($conn->query($sql_insert_physical_stock) === TRUE) {
    //echo "New record created successfully";
  } else {
    echo "Error: " . $sql_insert_physical_stock . "<br>" . $conn->error;
  } 
}
 echo "ok";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
$conn->close();

 ?>


