<?php

define("HOST", "localhost");
define("USUARIO", "root");
define("SENHA", "123456");
define("BD", "banco_de_dados");

function e($string){
	echo $string."<br>\n";
}

// conexão PDO
try
{
	$PDO = new PDO("mysql:host=".HOST.";dbname=".BD, USUARIO, SENHA);
	e("Conexao realizada com sucesso!");
}
catch (PDOException $e)
{
	e($e->getMessage());
	e($e->getCode());
}



/**
 * exec()
 * Executa instrução SQL 
 * @return int $numero_linhas_afetadas
 */
// $numero_linhas_inseridas = $PDO->exec("INSERT INTO tabela (nome) VALUES ('a')");
// $numero_linhas_alteradas = $PDO->exec("UPDATE tabela SET nome='b'");
// $numero_linhas_deletadas = $PDO->exec("DELETE FROM tabela");

/**
 * rowCount()
 * @return int $numero_linhas_afetadas/retornadas
 */
// $numero_linhas_inseridas = $PDO->query("INSERT INTO tabela (nome) VALUES ('a')")->rowCount();
// $numero_linhas_alteradas = $PDO->query("UPDATE tabela SET nome='b'")->rowCount();
// $numero_linhas_deletadas = $PDO->query("DELETE FROM tabela")->rowCount();
// $numero_linhas_selecionadas = $PDO->query("SELECT * FROM tabela")->rowCount();

$a = NULL;

// $stmt = $PDO->prepare("SELECT * FROM tabela WHERE nome=:nome");
// $stmt->bindParam(":nome", $a);
// $stmt->execute();

// $stmt = $PDO->prepare("INSERT INTO tabela (nome) VALUES (:nome)");
// $stmt->bindParam(":nome", $a);
// $stmt->execute();

// $stmt = $PDO->prepare("UPDATE tabela SET nome=:nome");
// $stmt->bindParam(":nome", $a);
// $stmt->execute();

// $stmt = $PDO->prepare("DELETE FROM tabela WHERE nome=:nome");
// $stmt->bindParam(":nome", $a);
// $stmt->execute();

$stmt->bindParam(":nome", $a, PDO::PARAM_STR);
$stmt->bindParam(":nome", $a, PDO::PARAM_INT);
$stmt->bindParam(":nome", $a, PDO::PARAM_NULL);
$stmt->bindParam(":nome", $a, PDO::PARAM_BOOL);

var_dump($stmt->rowCount());
// e($numero_linhas_deletadas);
