<?php

define("HOST", "localhost");
define("USUARIO", "root");
define("SENHA", "s0m0sCrm928");
define("BD", "lotofacil");

// conexão PDO
try
{
	$PDO = new PDO("mysql:host=".HOST.";dbname=".BD, USUARIO, SENHA);
	print "Conexao realizada com sucesso!\n";
}
catch (PDOException $e)
{
	print $e->getMessage();
	print $e->getCode();
}

print "\nANALISE POR POSICAO\n\n";

for ($i = 1; $i <= 15; $i++) {
	$c = $PDO->query("SELECT p$i, count(id_sorteio) as total from sorteios group by p$i order by p$i");

    print "posicao $i:\n";
	while ($r = $c->fetch(PDO::FETCH_ASSOC)) {
		$n = $r["p$i"];
		$t = $r["total"];
		$p = ($t * 100) / 10000;
		print "  $n: $t $p%\n";
	}
}

print "\n";

$consulta_sorteios = $PDO->query("SELECT id_sorteio, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15 FROM sorteios");

$impares_pares = [];

while ($row = $consulta_sorteios->fetch(PDO::FETCH_ASSOC)) {

	$cont = $row['id_sorteio'];

	$impares = 0;
	$pares = 0;

	for ($i = 1; $i <= 15; $i++) {
		$n = $row["p$i"];

		if ($n % 2 == 0) {
			$pares++;
		} else {
			$impares++;
		}
	}

	if (!isset($impares_pares[$impares][$pares])) {
		$impares_pares[$impares][$pares] = 0;
	}
	
	$impares_pares[$impares][$pares]++;

	// $sorteados = [];
	// $sorteados[] = $row['p1'];
	// $sorteados[] = $row['p2'];
	// $sorteados[] = $row['p3'];
	// $sorteados[] = $row['p4'];
	// $sorteados[] = $row['p5'];
	// $sorteados[] = $row['p6'];
	// $sorteados[] = $row['p7'];
	// $sorteados[] = $row['p8'];
	// $sorteados[] = $row['p9'];
	// $sorteados[] = $row['p10'];
	// $sorteados[] = $row['p11'];
	// $sorteados[] = $row['p12'];
	// $sorteados[] = $row['p13'];
	// $sorteados[] = $row['p14'];
	// $sorteados[] = $row['p15'];
}

print "\nANALISE IMPARES-PARES\n\n";

foreach ($impares_pares as $impares => $arr) {
	foreach ($arr as $pares => $total) {
		$porcentagem = ($total * 100) / $consulta_sorteios->rowCount();
		print "impares: $impares pares: $pares total: $total porcentagem: $porcentagem %\n";
	}
}
