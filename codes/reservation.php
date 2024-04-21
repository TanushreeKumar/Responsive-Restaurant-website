<?php
include('connection.php');
if($_SERVER['REQUEST_METHOD']=='POST')
{
    $No_person = $_POST['no_person'];
    $Time_res = $_POST['time_res'];
    $Phone_no = $_POST['phone_no'];
    $Date_res = $_POST['date_res'];
    $Name = $_POST['name'];
    $Email_id = $_POST['email_id'];

    $sql = "INSERT INTO reservation(No_person,Time_res,Phone_no,Date_res,Name,Email_id)
            VALUES ('$No_person','$Time_res','$Phone_no','$Date_res','$Name','$Email_id')";

    if($conn->query($sql)==TRUE){
        echo "Table Booked";
    }else{
        echo "Error ".$sql. "<br>". $conn->error;
    }
}
?>
