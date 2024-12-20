
<?php
if(isset($_POST['btn'])){


$servername = "localhost:3307";
$username = "root";
$password = "12345";
$dbname = "resturant";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname );

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
$mobile = $_POST['mobile'];
$username = $_POST['username'];
$date = $_POST['date'];
$time = $_POST['time'];
$usercount = $_POST['usercount'];
$userrequest = $_POST['userrequest'];
$sql = "INSERT INTO resturant.reservation(Mobile,Name,Date,Time,GuestCount,Remarks)
VALUES ('$mobile', '$username', '$date', '$time', '$usercount', '$userrequest')";

if($conn->query($sql) == true){
    echo "Table Reserved Sucessfully!!";
}else{
    echo "ERROR : $sql <br> $con->error";
}

$conn->close();

}

?>

