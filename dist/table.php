<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <title>Book a Table</title>
</head>

<body class="relative min-h-screen">

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
    echo "Sucessfully inserted";
}else{
    echo "ERROR : $sql <br> $con->error";
}

$conn->close();

}

?>

<!-- Navbar -->
<header class="w-full text-xl text-white p-5 bg-red-900">
        <div class="flex justify-between items-center flex-wrap relative">
            <!-- Logo Section -->
            <div class="mr-auto">
                <img src="logo/crazyforfood-high-resolution-logo-white-transparent.png" alt="Logo" class="h-32 hover:animate-spin-slow">
            </div>

            <!-- Menu Items (visible on medium and larger screens) -->
            <ul class="items-center gap-5 cursor-pointer font-bold text-xl hidden md:flex">
                <a href="index.html"><li class="hover:text-yellow-400 hover:font-semibold hover:animate-bounce">Home</li></a>
                <li class="hover:text-yellow-400 hover:font-semibold hover:animate-bounce"><a href="#">Menu</a></li>
                <li class="hover:text-yellow-400 hover:font-semibold hover:animate-bounce">Gallery</li>
                <li class="hover:text-yellow-400 hover:font-semibold hover:animate-bounce">About</li>
                <li class="hover:text-yellow-400 hover:font-semibold hover:animate-bounce">Contact</li>
            </ul>

            <!-- Toggle Button for smaller screens (Hamburger icon) -->
            <button id="toggleButton" class="md:hidden p-4 text-4xl hover:border hover:border-white" onclick="togglemenu()">
                <i class="fa-solid fa-bars"></i>
            </button>

            <!-- Close Button for smaller screens (X icon) -->
            <button id="closeButton" class="md:hidden p-4 text-4xl hover:border hover:border-white hidden" onclick="togglemenu()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <!-- Mobile Menu (hidden by default, shows when toggled) -->
        <nav id="nav-dialog" class="menu hidden md:hidden bg-red-900 text-white">
            <ul class="flex flex-col items-end gap-5 p-5">
                <li><a href="index.html" class="hover:text-yellow-400 hover:font-semibold">Home</a></li>
                <li><a href="#" class="hover:text-yellow-400 hover:font-semibold">Menu</a></li>
                <li><a href="#" class="hover:text-yellow-400 hover:font-semibold">Gallery</a></li>
                <li><a href="#" class="hover:text-yellow-400 hover:font-semibold">About</a></li>
                <li><a href="#" class="hover:text-yellow-400 hover:font-semibold">Contact</a></li>
            </ul>
        </nav>
    </header>


    <!-- Background Image -->
    <div class="absolute inset-0 bg-cover bg-center opacity-70 z-[-1]"
        style="background-image: url('images/image1.jpg');"></div>

    <div class="container mx-auto px-4 py-16 relative z-10">

        <!-- Booking Form Section -->
        <div class="max-w-xl mx-auto bg-white  p-8 shadow-lg rounded-lg">


            <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Book a Table</h2>

            <form action="table.php" method="POST" class="space-y-6 form">

    <!-- Number Input -->
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
        <input type="text" name="mobile" id="mobile"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter your mobile number" required>
    </div>

    <!-- Name Input -->
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input type="text" name="username" id="username"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter your full name" required>
    </div>

    <!-- Date Input -->
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <input type="date" name="date" id="date"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            required >
    </div>

    <!-- Time Input -->
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
        <input type="time" name="time" id="time"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            required>
    </div>

    <!-- Number of Guests -->
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
        <input type="number" name="usercount" id="usercount"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter number of guests" min="1" max="20" required>
    </div>

    <!-- Special Requests -->
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
        <textarea name="userrequest" id="userrequest"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            rows="4" placeholder="Enter any special requests"></textarea>
    </div>

    <!-- Submit Button -->
    <div class="text-center">
        <button type="submit" name="btn" id="btn"
            class="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300">
            Book Now
        </button>
    </div>
</form>

        </div>
    </div>

    <script src="script.js"></script>
    <script src="table.js"></script>
    </body>

</html>