<?php

define("HOST", "localhost");
define("USUARIO", "root");
define("SENHA", "123456");
define("BD", "jogo_na_praia");

// conexão PDO
try
{
	$PDO = new PDO("mysql:host=".HOST.";dbname=".BD, USUARIO, SENHA);
	echo "Conexao realizada com sucesso!";
}
catch (PDOException $e)
{
	echo $e->getMessage();
	echo $e->getCode();
}

// conecta ao bando de dados (descontunuada)
@$conn = mysqli_connect(HOST, USUARIO, SENHA, BD);

if (!$conn) {
	die("Falha na conexao: " . mysqli_connect_error());
} else {
	echo "Conexao realizada com sucesso!";
}
