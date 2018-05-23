<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<form method="POST" enctype="multipart/form-data">
			File: <input type="file" name="file">
			<br>
			File2: <input type="file" name="file2">
			<button type="submit">Submit</button>
		</form>
<?php
define("HOST", "localhost");
define("USUARIO", "root");
define("SENHA", "123456");
define("BD", "jogo_na_praia");

// PDO
try
{
	$_pdo = new PDO("mysql:host=".HOST.";dbname=".BD."",USUARIO,SENHA);
}
catch (PDOException $e)
{
	echo $e->getMessage();
	echo $e->getCode();
}

echo "<pre>";print_r($_FILES);

if (isset($_FILES["file"]["tmp_name"])) {

	$arquivo_temporario = $_FILES["file"]["tmp_name"]; // caminho/arquivo temporario

	$is_upload = is_uploaded_file($arquivo_temporario); // verifica se arquivo foi enviado por POST HTTP

	if ($is_upload == true):
		echo "<br>Checking file ... hash: ".rand(0,100)."<br><br>";
		// abre arquivo
		$file = fopen($arquivo_temporario, "r") or die ("Unable to open file!");
		// enquanto nao chegar no fim do arquivo
		while (!feof($file)):
			// recebe linha
			$linha = fgets($file);
			var_dump($linha); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". $linha ."')");
			// var_dump(json_encode($linha)); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". json_encode($linha) ."')");
			// var_dump(json_decode($linha)); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". json_decode($linha) ."')");
			// var_dump(w1250_to_utf8($linha)); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". w1250_to_utf8($linha) ."')");
			var_dump(mb_convert_encoding($linha, 'UTF-8', 'ISO-8859-1')); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". mb_convert_encoding($linha, 'UTF-8', 'ISO-8859-1') ."')");
			
		endwhile;
		// fecha arquivo
		fclose($file);
	endif;
}

if (isset($_FILES["file2"]["tmp_name"])) {

	$arquivo_temporario = $_FILES["file2"]["tmp_name"]; // caminho/arquivo temporario

	$is_upload = is_uploaded_file($arquivo_temporario); // verifica se arquivo foi enviado por POST HTTP

	if ($is_upload == true):
		echo "<br>Checking file ... hash: ".rand(0,100)."<br><br>";
		// abre arquivo
		$file = fopen($arquivo_temporario, "r") or die ("Unable to open file!");
		// enquanto nao chegar no fim do arquivo
		while (!feof($file)):
			// recebe linha
			$linha = fgets($file);
			var_dump($linha); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". $linha ."')");
			// var_dump(json_encode($linha)); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". json_encode($linha) ."')");
			// var_dump(json_decode($linha)); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". json_decode($linha) ."')");
			// var_dump(w1250_to_utf8($linha)); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". w1250_to_utf8($linha) ."')");
			var_dump(mb_convert_encoding($linha, 'UTF-8', 'ISO-8859-1')); $_pdo->query("INSERT INTO jogadores (nome) VALUES ('". mb_convert_encoding($linha, 'UTF-8', 'ISO-8859-1') ."')");
			
		endwhile;
		// fecha arquivo
		fclose($file);
	endif;
}

function w1250_to_utf8($text) {
    // map based on:
    // http://konfiguracja.c0.pl/iso02vscp1250en.html
    // http://konfiguracja.c0.pl/webpl/index_en.html#examp
    // http://www.htmlentities.com/html/entities/
    $map = array(
        chr(0x8A) => chr(0xA9),
        chr(0x8C) => chr(0xA6),
        chr(0x8D) => chr(0xAB),
        chr(0x8E) => chr(0xAE),
        chr(0x8F) => chr(0xAC),
        chr(0x9C) => chr(0xB6),
        chr(0x9D) => chr(0xBB),
        chr(0xA1) => chr(0xB7),
        chr(0xA5) => chr(0xA1),
        chr(0xBC) => chr(0xA5),
        chr(0x9F) => chr(0xBC),
        chr(0xB9) => chr(0xB1),
        chr(0x9A) => chr(0xB9),
        chr(0xBE) => chr(0xB5),
        chr(0x9E) => chr(0xBE),
        chr(0x80) => '&euro;',
        chr(0x82) => '&sbquo;',
        chr(0x84) => '&bdquo;',
        chr(0x85) => '&hellip;',
        chr(0x86) => '&dagger;',
        chr(0x87) => '&Dagger;',
        chr(0x89) => '&permil;',
        chr(0x8B) => '&lsaquo;',
        chr(0x91) => '&lsquo;',
        chr(0x92) => '&rsquo;',
        chr(0x93) => '&ldquo;',
        chr(0x94) => '&rdquo;',
        chr(0x95) => '&bull;',
        chr(0x96) => '&ndash;',
        chr(0x97) => '&mdash;',
        chr(0x99) => '&trade;',
        chr(0x9B) => '&rsquo;',
        chr(0xA6) => '&brvbar;',
        chr(0xA9) => '&copy;',
        chr(0xAB) => '&laquo;',
        chr(0xAE) => '&reg;',
        chr(0xB1) => '&plusmn;',
        chr(0xB5) => '&micro;',
        chr(0xB6) => '&para;',
        chr(0xB7) => '&middot;',
        chr(0xBB) => '&raquo;',
    );
    return html_entity_decode(mb_convert_encoding(strtr($text, $map), 'UTF-8', 'ISO-8859-2'), ENT_QUOTES, 'UTF-8');
}
 ?>


	</body>
</html>
