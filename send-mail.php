<?php
/*echo true;
exit;*/
//define the recipient email address as a constant
define('RECIPIENT','michellepopcornsweet@gmail.com');

//catch the $_POST vars
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
//set the subject
$subject = "Website Enquiry";
	
//set email body and headers
$body = $message."\n\n";
$body.= $name."<$email>";
$headers = "From: $name<$email>";

//send email
//echo mail(RECIPIENT);
if(mail(RECIPIENT, $subject, $body, $headers)){
		
	echo true;
	
} else {
	
	echo false;
	
}//end if else
exit;
?>