<?php

$urls2 = $_POST['urls1'];


if ($urls2 == 'index.html') {

   $name2 = $_POST['name1']; // Fetching Values from URL
   $email2 = $_POST['email1'];
   $subject2 = $_POST['subject1'];
   $message2 = $_POST['message1'];
   $phone2 = $_POST['phone1'];
   $address2 = $_POST['address1'];



   if (1 == 1) {

      $to = "info@pitechware.com";
      $subject = "This is Query Form of $name2 ";

      $message = "<h1>Details of the User <b> $name2 </b></h1>";
      $message .= "<h5>Name      : $name2</h5>";
      $message .= "<h5>Email     : $email2</h5>";
      $message .= "<h5>Mobile No : $phone2</h5>";
      $message .= "<h5>Address   : $address2</h5>";



      $message .= "<h5>Subject   : $subject2</h5>";
      $message .= "<h5>Message   : $message2</h5>";

      $header = "From:info@pitechware.com \r\n";

      $header .= "MIME-Version: 1.0\r\n";
      $header .= "Content-type: text/html\r\n";

      $retval = mail($to, $subject, $message, $header);

      if ($retval == true) {
         echo "Your Response Has Been Recorded..";
      } else {
         echo "Fill the form properly.";
      }
   }
} elseif ($urls2 == 'contact.html') {

   $name2 = $_POST['name1']; // Fetching Values from URL
   $email2 = $_POST['email1'];
   $subject2 = $_POST['subject1'];
   $message2 = $_POST['message1'];
   $phone2 = $_POST['phone1'];
   // $address2 = $_POST['address1'];

   if (1 == 1) {

      $to = "info@pitechware.com";
      $subject = "This is Callback Form of $name2 ";

      $message = "<h1>Call back Details of the User <b> $name2 </b></h1>";
      $message .= "<h5>Name      : $name2</h5>";
      $message .= "<h5>Email     : $email2</h5>";
      $message .= "<h5>Mobile No : $phone2</h5>";
      // $message .= "<h5>Address   : $address2</h5>";



      $message .= "<h5>Subject   : $subject2</h5>";
      $message .= "<h5>Message   : $message2</h5>";

      $header = "From:info@pitechware.com \r\n";

      $header .= "MIME-Version: 1.0\r\n";
      $header .= "Content-type: text/html\r\n";

      $retval = mail($to, $subject, $message, $header);

      if ($retval == true) {
         echo "Your Response Has Been Recorded..";
      } else {
         echo "Fill the form properly.";
      }
   }
}


 