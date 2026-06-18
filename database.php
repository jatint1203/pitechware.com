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
$attachmentData = null;
$attachmentName = null;
$attachmentMime = null;
$attachmentInfo = 'No file uploaded';

if (isset($_FILES['projectFile']) && $_FILES['projectFile']['error'] === UPLOAD_ERR_OK) {
   $originalName = basename($_FILES['projectFile']['name']);
   $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
   $extension = strtolower(pathinfo($safeName, PATHINFO_EXTENSION));
   $allowedExtensions = ['pdf', 'xls', 'xlsx'];
   $maxSize = 5 * 1024 * 1024;
   $tmpPath = $_FILES['projectFile']['tmp_name'];

   if (!in_array($extension, $allowedExtensions, true)) {
      echo "Only PDF and Excel files are allowed.";
      exit;
   }

   if ($_FILES['projectFile']['size'] > $maxSize) {
      echo "File size must be under 5 MB.";
      exit;
   }

   if (!is_uploaded_file($tmpPath)) {
      echo "File upload failed. Please try again.";
      exit;
   }

   $attachmentData = file_get_contents($tmpPath);
   if ($attachmentData === false) {
      echo "File upload failed. Please try again.";
      exit;
   }

   $attachmentName = $originalName;
   $attachmentInfo = $originalName;
   $attachmentMime = 'application/octet-stream';

   $mimeMap = [
      'pdf' => 'application/pdf',
      'xls' => 'application/vnd.ms-excel',
      'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
   ];

   if (isset($mimeMap[$extension])) {
      $attachmentMime = $mimeMap[$extension];
   } elseif (function_exists('mime_content_type')) {
      $detectedType = mime_content_type($tmpPath);
      if ($detectedType) {
         $attachmentMime = $detectedType;
      }
   } elseif (class_exists('finfo')) {
      $finfo = new finfo(FILEINFO_MIME_TYPE);
      $detectedType = $finfo->file($tmpPath);
      if ($detectedType) {
         $attachmentMime = $detectedType;
      }
   }
} elseif (isset($_FILES['projectFile']) && $_FILES['projectFile']['error'] !== UPLOAD_ERR_NO_FILE) {
   echo "File upload error. Please try again.";
   exit;
}

$to = "info@ramavath.com";
$emailSubject = "Quote Request from $contactPerson - $source";
$from = "info@ramavath.com";

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

$boundary = '=_Part_' . md5((string) microtime(true));

$headers = "From: $from\r\n";
if ($email !== '') {
   $headers .= "Reply-To: " . $email . "\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$emailMessage = "--$boundary\r\n";
$emailMessage .= "Content-Type: text/html; charset=UTF-8\r\n";
$emailMessage .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$emailMessage .= $body . "\r\n";

if ($attachmentData !== null && $attachmentName !== null) {
   $emailMessage .= "--$boundary\r\n";
   $emailMessage .= "Content-Type: $attachmentMime; name=\"" . $attachmentName . "\"\r\n";
   $emailMessage .= "Content-Disposition: attachment; filename=\"" . $attachmentName . "\"\r\n";
   $emailMessage .= "Content-Transfer-Encoding: base64\r\n\r\n";
   $emailMessage .= chunk_split(base64_encode($attachmentData)) . "\r\n";
}

$emailMessage .= "--$boundary--";

$retval = mail($to, $emailSubject, $emailMessage, $headers);

if ($retval == true) {
   echo "Your Response Has Been Recorded..";
} else {
   echo "Something went wrong. Please try again or call us directly.";
}
