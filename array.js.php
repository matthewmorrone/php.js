<html>
<head>
<script type='text/javascript'>
<?
$bin = "bin";
$dir = new DirectoryIterator($bin);
$arr = array_map("trim", file("array"));


foreach($dir as $name):
	if (in_array($name, $arr)) {
		$src = file_get_contents("$bin/$name");
		echo $src."\n";


	}

endforeach;
?>
</script>
</head>
</html>
