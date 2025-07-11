<?php
 include 'db_head.php';

 $emp_id =test_input($_GET['emp_id']);
 $admin_id =test_input($_GET['admin_id']);
 $leave_type =test_input($_GET['leave_type']);
 
function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$data = "'".$data."'";
return $data;
}
$sql = "SET time_zone = '+05:30';"; 
$sql .= "SELECT
    count(*) as count
FROM
    employee
INNER JOIN(
    SELECT(
        SELECT
            emp_menu.role
        FROM
            emp_menu
        WHERE
            emp_menu.menu_id = att_approval_chart.a_role_id
    ) AS admins,
    fatt.*
FROM
    att_approval_chart
INNER JOIN(
    SELECT att_req.*,
        emp_menu.menu_id AS role_id
    FROM
        emp_menu
    INNER JOIN(
        SELECT att_req.*,
            employee.emp_role
         
        FROM
            att_req
        INNER JOIN employee ON att_req.emp_id = employee.emp_id
        WHERE
            att_req.status = 'pending' AND employee.emp_id =  $emp_id and att_req.leave_type = $leave_type
    ) AS att_req
ON
    emp_menu.role = att_req.emp_role
) AS fatt
ON
    att_approval_chart.role_id = fatt.role_id
) AS final
ON
    employee.emp_role = final.admins
WHERE
    employee.emp_id =  $admin_id  AND NOT EXISTS (
        SELECT 1 
        FROM req_approval 
        WHERE req_approval.emp_id =  $admin_id AND req_approval.att_req_id = final.id
    )
ORDER BY
    final.id;";

// Execute the multi_query
if ($conn->multi_query($sql)) {
    // This loop is used to handle multiple result sets
    do {
        // Store the result set from the query
        if ($result = $conn->store_result()) {
            if ($result->num_rows > 0) {
                $rows = array();
                while($r = $result->fetch_assoc()) {
                    $rows[] = $r;
                }
                // Output the result as JSON
                print json_encode($rows);
            } else {
                echo "0 result";
            }
            $result->free(); // Free the result set
        }
        // Check if there are more result sets
    } while ($conn->more_results() && $conn->next_result());
} else {
    // If the multi_query fails, output the error
    echo "Error: " . $conn->error;
}
$conn->close();

 ?>


