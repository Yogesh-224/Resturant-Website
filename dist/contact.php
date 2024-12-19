<?php
// Include PHPMailer files (adjust path if necessary)
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Use PHPMailer's namespaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and collect form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate fields
    if (empty($name) || empty($email) || empty($message)) {
        echo "All fields are required.";
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings for Gmail SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'yogupandey7@gmail.com'; // Replace with your Gmail address
        $mail->Password = 'axoe pbpp wrhf zbtm'; // Replace with your App Password (for Gmail with 2FA enabled)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('yogupandey7@gmail.com', 'Crazy For Food'); // Your email and name
        $mail->addAddress('support@crazyforfood.com', 'Crazy For Food Support Team'); // Your recipient email
        $mail->addReplyTo($email, $name); // User's email and name for replies
        
        // Content (email body)
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Message from $name";
        $mail->Body    = "Name: $name<br>Email: $email<br>Message: $message"; // HTML content
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage: $message"; // Plain text alternative

        // Send email
        if ($mail->send()) {
            echo "Thank you for contacting us. We will get back to you shortly.";
        } else {
            echo "Sorry, there was an error sending your message. Please try again later.";
        }
    } catch (Exception $e) {
        // Log the error and show a generic message
        error_log("Mailer Error: " . $mail->ErrorInfo);
        echo "There was an error sending your message. Please try again later.";
    }
}
?>
