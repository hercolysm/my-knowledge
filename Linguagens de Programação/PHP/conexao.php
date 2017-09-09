<?php 
	define("HOST", "localhost");
	define("USUARIO", "root");
	define("SENHA", "");
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

	// conecta ao bando de dados (descontunuada)
	/*$conn = mysqli_connect(HOST, USUARIO, SENHA, BD);
	if ($conn2->connect_error) {
		die('Erro na conexão: ' . $conn->connect_error);
	}*/
