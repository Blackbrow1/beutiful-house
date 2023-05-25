<?php
function clear_data($val) {
  $val = trim($val);
  $val = stripslashes($val);
  $val = htmlspecialchars($val);
  return $val;
}

$to = "alesandro83@mail.ru";
$from = clear_data($_POST['name']);

$subject = "Заявка с сайта krasadom.ru";

$tel = clear_data($_POST['tel']);

$headers = "Свяжитесь пожалуйста в течение 30 минут" . "\r\n" .
"Письмо от: $from" . "\r\n" .
"Reply-To: $from" . "\r\n" .
"Телефон: $tel" . "\r\n" .
"X-Mailer: PHP/" . phpversion();

mail($to, $subject, $headers);

$redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'index.php';
header("Location: $redirect");
exit();
?>
