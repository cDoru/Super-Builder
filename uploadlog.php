<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="refresh" content="0.1;url=http://www.merklebillmin.com/superbuilder/updatelog.php">
<title>upload</title>
</head>

<body>
<?php
$logtxt="";
$file = fopen("Log.txt", "a+") or exit("Unable to open file!");
$logtxt=date("Y-m-d")."\n";
$logtxt.=$_POST["logtxt"]."\n\n";
fputs($file,$logtxt);
fclose($file);
?>
</body>
</html>