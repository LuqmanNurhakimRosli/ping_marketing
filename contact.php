<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate form inputs
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);

    // Validate name
    if (empty($name) || !preg_match("/^[a-zA-Z ]*$/", $name)) {
        echo "Invalid name. Please use letters and spaces only.";
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }


    $to = "luqman@dagangnet.com"; // Recipient email address
    $subject = "New Contact Form Submission";

    // Create the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Set email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email and return a message
    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "There was an error sending your message. Please try again.";
    }
}
?>
