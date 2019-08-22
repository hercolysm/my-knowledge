<?php 
	//echo "Hello World!"; 

	// cria arquivo
	$file = fopen("/tmp/teste.txt", "w");

	if ($file == true):
		print "Abrindo arquivo...";
		// escreve no arquivo
		fwrite($file, "Hello World !");
		// fechar arquivo
		//fclose($file);
	else:
		print "Não foi possível abrir o arquivo.";
	endif;
	exit();
?>
