<?php
 include 'db_head.php';
error_reporting(E_ERROR | E_PARSE);
$result = file_get_contents('company.json');
$obj = json_decode($result ,true);
// var_dump(json_decode($result));
//   print_r($obj);
// echo $obj->StockItem; 

 $count =0;
 echo '<table border=\"0\"><thead><tr><th>Count</th><th>Name</th><th>key</th><th>sts</th><th>role</th><th>Emp id</th><th>email</th><th>phone</th></tr></thead>';
foreach ($obj as $k=>$v) {
if($v['status'] == "approved")
    {
$count = $count + 1;
$username =  $v['username'];
$phonekey = $k;
$sts = $v['status'];
$role = $v['role'];
$emp_id = $v['emp_id'];
$email = $v['email'];
$phone = $v['phone'];
   echo "<tr>";
   echo "<td> $count </td>";
   echo "<td> $username</td>";

   echo "<td> $phonekey </td>";
   echo "<td> $sts </td>";
   echo "<td> $role </td>";
   echo "<td> $emp_id </td>";
   echo "<td> $email </td>";
   echo "<td> $phone </td>";
   echo "</tr>";



   $sql = "INSERT INTO employee (emp_name,emp_phone,emp_email,emp_approve,emp_role,firebase_uid,emp_code,emp_phone_id,emp_user_id)
   VALUES (  '$username','$phone','$email','yes','$role','0','$emp_id','$phonekey','0')";
    
    if ($conn->query($sql) === TRUE) {
      echo "success";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
   
  
  
  

  
    }
  
   
}
$conn->close();
echo "</table>";
?>