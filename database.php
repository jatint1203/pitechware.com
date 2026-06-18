<?php

$urls2 = $_POST['urls1'] ?? '';

if (!$urls2) {
   echo "Invalid request.";
   exit;
}

$company = trim($_POST['companyName1'] ?? '');
$contactPerson = trim($_POST['contactPerson1'] ?? '');
$phone = trim($_POST['phone1'] ?? '');
$email = trim($_POST['email1'] ?? '');
$subject = trim($_POST['subject1'] ?? '');
$message = trim($_POST['message1'] ?? '');
$address = trim($_POST['address1'] ?? '');
$state = trim($_POST['state1'] ?? '');
$city = trim($_POST['city1'] ?? '');

if ($contactPerson === '' || $phone === '') {
   echo "Please fill Contact Person and Phone Number.";
   exit;
}

$source = ($urls2 === 'contact.html') ? 'Contact Page' : 'Home Page';
$attachmentInfo = 'No file uploaded';

if (isset($_FILES['projectFile']) && $_FILES['projectFile']['error'] === UPLOAD_ERR_OK) {
   $uploadDir = __DIR__ . '/uploads/';

   if (!is_dir($uploadDir)) {
      mkdir($uploadDir, 0755, true);
   }

   $originalName = basename($_FILES['projectFile']['name']);
   $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
   $fileName = time() . '_' . $safeName;
   $targetPath = $uploadDir . $fileName;

   if (move_uploaded_file($_FILES['projectFile']['tmp_name'], $targetPath)) {
      $attachmentInfo = $fileName . ' (saved on server)';
   } else {
      $attachmentInfo = 'File upload failed';
   }
} elseif (isset($_FILES['projectFile']) && $_FILES['projectFile']['error'] !== UPLOAD_ERR_NO_FILE) {
   $attachmentInfo = 'File upload error';
}

$to = "info@ramavath.com";
$emailSubject = "Quote Request from $contactPerson - $source";

$body = "<h1>Quote Request Details</h1>";
$body .= "<h5>Source: $source</h5>";
$body .= "<h5>Company Name: " . htmlspecialchars($company) . "</h5>";
$body .= "<h5>Contact Person: " . htmlspecialchars($contactPerson) . "</h5>";
$body .= "<h5>Phone: " . htmlspecialchars($phone) . "</h5>";
$body .= "<h5>Email: " . htmlspecialchars($email) . "</h5>";
$body .= "<h5>Requirement: " . htmlspecialchars($subject) . "</h5>";
$body .= "<h5>Site Location: " . htmlspecialchars($address) . "</h5>";
$body .= "<h5>State: " . htmlspecialchars($state) . "</h5>";
$body .= "<h5>City: " . htmlspecialchars($city) . "</h5>";
$body .= "<h5>Project Details: " . nl2br(htmlspecialchars($message)) . "</h5>";
$body .= "<h5>Uploaded File: " . htmlspecialchars($attachmentInfo) . "</h5>";

$header = "From: info@ramavath.com \r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html\r\n";

$retval = mail($to, $emailSubject, $body, $header);

if ($retval == true) {
   echo "Your Response Has Been Recorded..";
} else {
   echo "Something went wrong. Please try again or call us directly.";
}
