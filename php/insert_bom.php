<?php
include 'db_head.php';


$inputPartsData = $_POST['inputPartsData']; // This should be an array of data for input_parts
$output_part = $_POST['output_part']; 


   $sql_process = "INSERT  INTO   bom_output (part_id)
   VALUES ('$output_part')";
 
 if ($conn->query($sql_process) === TRUE) {
    $last_insert_id = $conn->insert_id;
 {
   
    foreach ($inputPartsData as $input)
    { 
       
        $input_part = $input['part_id']; 
        $input_qty = $input['part_qty']; 

        $sql_input= "INSERT INTO  bom_input  (bom_id,part_id,qty)
        VALUES ('$last_insert_id','$input_part','$input_qty')";
         
          
           if ($conn->query($sql_input) === TRUE) {
           } 
           else {
             echo "Error: " . $sql_input . "<br>" . $conn->error;
           }
    }
  echo "ok";
    }
  

 } else {
   echo "Error: " . $sql_process . "<br>" . $conn->error;
 }


$conn->close();
?>
