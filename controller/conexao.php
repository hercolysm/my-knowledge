<?php //conexao
	define("HOST", "localhost");
	define("USUARIO", "root");
	define("SENHA", "");
	define("BD", "jogo_na_praia");

	// conecta ao bando de dados
	/*$conn2 = mysqli_connect(HOST, USUARIO, SENHA, BD);
	if ($conn2->connect_error) {
		die('Erro na conexão: ' . $conn->connect_error);
	}*/
	// conecte ao banco com PDO
	try {
		$_pdo = new PDO("mysql:host=".HOST.";dbname=".BD."",USUARIO,SENHA);
	} catch (PDOException $e) {
		var_dump($e);
		echo $e->getMessage();
		echo $e->getCode();
	}
?>