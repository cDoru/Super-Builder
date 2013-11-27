<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Update Log for Super Builder</title>
<style>
.but4 {
	border: 1px solid #c5e2f2;
	background: #cde4f2 url('http://tool.chinaz.com/template/default/images/but.gif') repeat-x 50% top;
	height: 30px;
	cursor: pointer;
	width: 100px;
}
</style>
</head>

<body>
<div align="center"><table border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td valign="bottom" align="center" style="font-family:Verdana, Geneva, sans-serif; font-size:18px; line-height:18px; color:#000000; padding-bottom:15px; padding-top:15px;"><strong>这个是Super Builder的更新日志，大家不要点下面的submit，目前是半成品，大家就看一下我更新了哪些东西就行。</strong></td>
        </tr></table></div>
<div id="content" align="center">
<?php
$file = fopen("Log.txt", "r") or exit("Unable to open file!");
while(!feof($file))
  {
  echo fgets($file). "<br>";
  }
fclose($file);
?>
</div>
<div align="center">
<form action="uploadlog.php" method="post">
<textarea name="logtxt" style="width:400px; height:300px; border:2px solid; border-color:#c5e2f2;"></textarea><br />
<input class="but4" type="submit" value="submit">
</form>
</div>
</body>
</html>