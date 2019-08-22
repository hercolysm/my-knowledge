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
$numero_linhas_inseridas = $PDO->exec("INSERT INTO tabela (nome) VALUES ('a')");
$numero_linhas_alteradas = $PDO->exec("UPDATE tabela SET nome='b'");
$numero_linhas_deletadas = $PDO->exec("DELETE FROM tabela");

/**
 * rowCount()
 * @return int $numero_linhas_afetadas/retornadas
 */
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

$numero_linhas_inseridas = $PDO->query("INSERT INTO tabela (nome) VALUES ('a')")->rowCount();
$numero_linhas_alteradas = $PDO->query("UPDATE tabela SET nome='b'")->rowCount();
$numero_linhas_deletadas = $PDO->query("DELETE FROM tabela")->rowCount();
$numero_linhas_selecionadas = $PDO->query("SELECT * FROM tabela")->rowCount();

/**
 * prepare()
 * @return object (PDOStatement)
 */
$a = NULL;

$stmt = $PDO->prepare("SELECT * FROM tabela WHERE nome=:nome");
$stmt->bindParam(":nome", $a);
$stmt->execute();

$stmt = $PDO->prepare("INSERT INTO tabela (nome) VALUES (:nome)");
$stmt->bindParam(":nome", $a);
$stmt->execute();

$stmt = $PDO->prepare("UPDATE tabela SET nome=:nome");
$stmt->bindParam(":nome", $a);
$stmt->execute();

$stmt = $PDO->prepare("DELETE FROM tabela WHERE nome=:nome");
$stmt->bindParam(":nome", $a);
$stmt->execute();

// Tipos
$stmt->bindParam(":nome", $a, PDO::PARAM_STR); // string
$stmt->bindParam(":nome", $a, PDO::PARAM_INT); // int
$stmt->bindParam(":nome", $a, PDO::PARAM_NULL); // null
$stmt->bindParam(":nome", $a, PDO::PARAM_BOOL); // boolean

/**
 * Recuperar error de um PDOStatement
 */
$stmt = $PDO->prepare("INSERT INTO tabela1 (nome) VALUES (:nome)");
$stmt->bindParam(":nome", $a);

if ($stmt->execute()) {
	echo "Inserido com sucesso!";
} else {
	$errorInfo = $stmt->errorInfo();
	echo "Erro ao inserir! <br>";
	echo "Codigo: ".$errorInfo[1]."<br>";
	echo "Descricao: ".$errorInfo[2]."<br>";
}


/**
 * fetchObject() ou fetch(PDO::FETCH_OBJ)
 * @return object(stdClass)
 */
$query = $PDO->query("SELECT id, nome FROM tabela LIMIT 3");

while ($obj = $query->fetchObject()) {
	$id = $obj->id;
	$nome = $obj->nome;
	echo "id: $id, nome: $nome<br>";
}
// @$query->fetchObject("ClassName"); // retorna um object(ClassName)


/**
 * bindColumn()
 * Associa uma coluna a uma variável PHP
 * @param $coluna (index ou nome)
 * @param $variavel
 */
$stmt = $PDO->prepare("SELECT id, nome FROM tabela LIMIT 3");
$stmt->bindColumn(1, $id);
$stmt->bindColumn("nome", $nome);
$stmt->execute();
while ($row = $stmt->fetch(PDO::FETCH_BOUND)) {
	echo "$id - $nome<br>";
}


/**
 * Analise de desempenho com o uso de transação
 * (INSERT) 10s - 1s
 * (UPDATE) 11s - 9s
 * (DELETE) 10s - 8s
 */
$start = time();
$PDO->query("START TRANSACTION");
for ($i=1; $i<= 100; $i++) {
	$PDO->query("INSERT INTO tabela (nome) VALUES ('$i')");
}
$PDO->query("COMMIT");
$end = time();
$segundos = $end - $start;
echo "Tempo decorrido: $segundos segundos<br><br>";

/**
 * Capturar o último ID inserido
 */
$PDO->lastInsertId();
