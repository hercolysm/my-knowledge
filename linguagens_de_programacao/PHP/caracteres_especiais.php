<html>
<head>
	<meta charset="utf-8">
</head>
<body>
	<form method="POST" enctype="multipart/form-data">
		File: <input type="file" name="file">
		<button type="submit">Submit</button>
	</form>
	<?php

	echo "<pre>";
	var_dump($_FILES);

	if (isset($_FILES["file"]["tmp_name"])) {

		$arquivo_temporario = $_FILES["file"]["tmp_name"]; // caminho/arquivo temporario

		$is_upload = is_uploaded_file($arquivo_temporario); // verifica se arquivo foi enviado por POST HTTP

		if ($is_upload == true):
			echo "<br>Checking file '".$_FILES["file"]["name"]."'...<br>";

			// verifica codificação do arquivo
			$encoding = exec("file --mime-encoding ".$arquivo_temporario);
			$is_iso_encoding = (strpos($encoding, "iso-8859-1") === false) ? false : true;
			echo "Encoding: ".$encoding."<br>";

			// abre arquivo
			$file = fopen($arquivo_temporario, "r") or die ("Unable to open file!");

			// enquanto nao chegar no fim do arquivo
			while (!feof($file)):
				// recebe linha
				$linha = fgets($file);

				if ($is_iso_encoding == true) {
					echo "Encoding ISO-8859-1 detected, converting to UTF-8 format...<br>";
					$linha = mb_convert_encoding($linha, "UTF-8", "ISO-8859-1");
				}

				var_dump($linha);
				
			endwhile;
			// fecha arquivo
			fclose($file);
		endif;
	}
	?>
	</body>
</html>