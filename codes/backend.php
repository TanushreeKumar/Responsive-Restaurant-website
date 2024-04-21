<?php
// Retrieve form data
$restaurantName = $_POST['restaurantName'];
$cuisine = $_POST['cuisine'];
$address = $_POST['address'];
$message = $_POST[''];
// Validate and sanitize the input data
if(empty($restaurantName) || empty($cuisine) || empty($address)) {
    // If any required field is empty, redirect back to the form with an error message
    header('Location: add restaurant.html?msg=error');
    exit;
}

// Remove any potentially harmful characters and sanitize the input data
$restaurantName = filter_var($restaurantName, FILTER_SANITIZE_STRING);
$cuisine = filter_var($cuisine, FILTER_SANITIZE_STRING);
$address = filter_var($address, FILTER_SANITIZE_STRING);

// Additional validation
if (strlen($restaurantName) > 50) {
    // If restaurant name is too long, redirect back to the form with an error message
    header('Location: add restaurant.html?msg=error');
    exit;
}

if (strlen($cuisine) > 30) {
    // If cuisine name is too long, redirect back to the form with an error message
    header('Location: add restaurant.html?msg=error');
    exit;
}


if(isset($_GET['msg'])) {
        $message = $_GET['msg'];
        if ($message === 'success') {
          echo "Restaurant registered successfully!";
        } elseif ($message === 'error') {
          echo "Error occurred while registering restaurant. Please try again.";
        }
      }

header('Location: add restaurant.html?msg=success');
?>
