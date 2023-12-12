<?php

$acceptedFormats = array('gif', 'png', 'jpg', 'GIF', 'JPG', 'PNG', 'jpeg', 'JPEG', 'jfif', 'webp', 'WEBP', 'JFIF');
function forceVal($str)
{
  global $pdo;
  $str = str_replace(array('`', '\'', '#', '"'), '', $str);
//        $str=my_real_escape_string($str,$pdo);
  return trim($str);
}

//convert persian date to latin date
function per_to_latin($per_date)
{
  $per_date = str_replace('-', '/', $per_date);
  $arr_temp = explode('/', $per_date);
  $gdate = jalali_to_gregorian($arr_temp[0], $arr_temp[1], $arr_temp[2]);
  $year = $gdate[0];
  if (strlen($gdate[1]) == 1)
    $month = '0' . $gdate[1];
  else
    $month = $gdate[1];
  if (strlen($gdate[2]) == 1)
    $day = '0' . $gdate[2];
  else
    $day = $gdate[2];
  $latin_date = $year . '/' . $month . '/' . $day;
  return $latin_date;
}

//convert latin date to persian date
function latin_to_per($latin_date, $format)
{
  $latin_date = str_replace('-', '/', $latin_date);
  if ($format == 'date') {
    $arr_temp = explode(' ', $latin_date);
    $arr_date = explode('/', $arr_temp[0]);
    $arr_temp = gregorian_to_jalali($arr_date[0], $arr_date[1], $arr_date[2]);
    $str_date = implode('/', $arr_temp);
    return $str_date;
  } elseif ($format == 'date_time') {
    $arr_temp1 = explode(' ', $latin_date);
    $arr_date = explode('/', $arr_temp1[0]);
    $arr_temp = gregorian_to_jalali($arr_date[0], $arr_date[1], $arr_date[2]);
    $str_date = implode('/', $arr_temp) . ' ' . $arr_temp1[1];
    return $str_date;
  }
}


//set a random name for images
function generateFileName($dir, $OriginalFilename)
{
  $OriginalFilename = str_replace(' ', '_', $OriginalFilename);
  $OriginalFilename = str_replace('(', '', $OriginalFilename);
  $OriginalFilename = str_replace(')', '', $OriginalFilename);
  $FileCounter = 1;
  $filename = pathinfo($OriginalFilename, PATHINFO_FILENAME);
  $extension = pathinfo($OriginalFilename, PATHINFO_EXTENSION);
  $FinalFilename = $OriginalFilename;
  while (fileExists($dir . $FinalFilename))
    $FinalFilename = $filename . '_' . $FileCounter++ . '.' . $extension;
  return $FinalFilename;
}

function ins_test($data)
{
  global $pdo;
  $insert = $pdo->prepare("insert into test(name)values(:name)");
  $insert->execute(array(
    ':name' => $data
  ));
}

function fileExists($filePath)
{
  return is_file($filePath) && file_exists($filePath);
}

function getBaseUrl()
{
  if (isset($_SERVER['HTTPS'])) {
    $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
  } else {
    $protocol = 'http';
  }
  $temp = explode('/', $_SERVER["REQUEST_URI"]);
  return $protocol . "://" . $_SERVER['HTTP_HOST'] . '/' . $temp[1] . '/';
}

function sendSms($to, $text)
{

}

function getMonthName($month)
{
  switch ($month) {
    case '01':
    case '1':
      return 'فروردین';
    case '02':
    case '2':
      return 'اردیبهشت';
    case '03':
    case '3':
      return 'خرداد';
    case '04':
    case '4':
      return 'تیر';
    case '05':
    case '5':
      return 'مرداد';
    case '06':
    case '6':
      return 'شهریور';
    case '07':
    case '7':
      return 'مهر';
    case '08':
    case '8':
      return 'آبان';
    case '09':
    case '9':
      return 'آذر';
    case '10':
      return 'دی';
    case '11':
      return 'بهمن';
    case '12':
      return 'اسفند';
  }
}

function persianDate($persianDate)
{
  $temp = explode('/', $persianDate);
  $month = getMonthName($temp[1]);
  return $temp[2] . ' ' . $month . ' ' . $temp[0];
}

function getRandomStringRandomInt($length = 16)
{
  $stringSpace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $pieces = [];
  $max = mb_strlen($stringSpace, '8bit') - 1;
  for ($i = 0; $i < $length; ++$i) {
    $pieces[] = $stringSpace[random_int(0, $max)];
  }
  return implode('', $pieces);
}

function send_mail($sender,$to,$body,$title='school management system')
{
  $mail = new PHPMailer();
  $mail->IsHTML(true);
  $mail->AddReplyTo($sender,"school management system");
  $mail->SetFrom($sender, 'school management system');
  $mail->AddReplyTo($sender,"school management system");
  $address = $to;
  $mail->AddAddress($address, $to);
  $mail->Subject    = $title;
  $mail->AltBody    = $body;
  $mail->Body=$body;
  $mail->CharSet='UTF-8';
  $mail->Send();
}

function getScoreMessage($score, $examName)
{
  global $pdo;
  $sql = "select * from setting";
  $query = $pdo->query($sql);
  $fetch = $query->fetch();
  if ($score === 0)
    return $fetch['categoryOneText'];
  elseif ($score === 25 or $score === 5)
    return $fetch['categoryTwoText'];
  elseif ($score === 50 or $score === 10)
    return $fetch['categoryThreeText'];
  elseif ($score === 75 or $score === 15)
    return $fetch['categoryFourText'];
  elseif ($score === 100 or $score === 20)
    return $fetch['categoryFiveText'];
}

?>

