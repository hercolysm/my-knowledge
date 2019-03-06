<?php

define("HOST", "localhost");
define("USUARIO", "root");
define("SENHA", "s0m0sCrm928");
define("BD", "lotofacil");

// conexão PDO
try
{
	$PDO = new PDO("mysql:host=".HOST.";dbname=".BD, USUARIO, SENHA);
	print "Conexao realizada com sucesso!";
}
catch (PDOException $e)
{
	print $e->getMessage();
	print $e->getCode();
}

/*
$PDO->query("DELETE FROM `lotofacil`.`sorteios`");

$cont = 0;
while ($cont<1000000) {
	$cont ++;
	echo "$cont\n";
	$numeros = range(1, 25);
	$sorteados = [];

	while (count($sorteados) < 15) {
		$escolhido = array_rand($numeros, 1);
	    $sorteados[] = $numeros[$escolhido];
	    unset($numeros[$escolhido]);
	}
	sort($sorteados);

	$PDO->query("INSERT INTO `lotofacil`.`sorteios` (`id_sorteio`, `p1`, `p2`, `p3`, `p4`, `p5`, `p6`, `p7`, `p8`, `p9`, `p10`, `p11`, `p12`, `p13`, `p14`, `p15`) VALUES ('$cont', '$sorteados[0]', '$sorteados[1]', '$sorteados[2]', '$sorteados[3]', '$sorteados[4]', '$sorteados[5]', '$sorteados[6]', '$sorteados[7]', '$sorteados[8]', '$sorteados[9]', '$sorteados[10]', '$sorteados[11]', '$sorteados[12]', '$sorteados[13]', '$sorteados[14]');");
}
exit();

select p1, count(id_sorteio) as total from sorteios group by p1 order by p1;
select p2, count(id_sorteio) as total from sorteios group by p2 order by p2;
select p3, count(id_sorteio) as total from sorteios group by p3 order by p3;
select p4, count(id_sorteio) as total from sorteios group by p4 order by p4;
select p5, count(id_sorteio) as total from sorteios group by p5 order by p5;
select p6, count(id_sorteio) as total from sorteios group by p6 order by p6;
select p7, count(id_sorteio) as total from sorteios group by p7 order by p7;
select p8, count(id_sorteio) as total from sorteios group by p8 order by p8;
select p9, count(id_sorteio) as total from sorteios group by p9 order by p9;
select p10, count(id_sorteio) as total from sorteios group by p10 order by p10;
select p11, count(id_sorteio) as total from sorteios group by p11 order by p11;
select p12, count(id_sorteio) as total from sorteios group by p12 order by p12;
select p13, count(id_sorteio) as total from sorteios group by p13 order by p13;
select p14, count(id_sorteio) as total from sorteios group by p14 order by p14;
select p15, count(id_sorteio) as total from sorteios group by p15 order by p15;
*/

// funções
function get_aposta_aleatoria($qtd_numeros) {
	$numeros = range(1, 25);
	$aposta_aleatoria = [];
	while (count($aposta_aleatoria) < $qtd_numeros) {
		$escolhido = array_rand($numeros, 1);
	    $aposta_aleatoria[] = $numeros[$escolhido];
	    unset($numeros[$escolhido]);
	}

	return $aposta_aleatoria;
}

// jogos prontos
$jogo_hamenon =  [1,2,3,4,5,8,9,11,12,14,16,18,19,23,24];
$jogo_ruim1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
$jogo_ruim2 = [11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
$jogo_ruim3 = [1,2,3,4,5,6,7,18,19,20,21,22,23,24,25];
$jogo_bom1 = [1,3,4,6,8,9,11,13,15,17,18,20,22,24,25];
$jogo_bom2 = [1,3,4,6,8,10,11,13,15,17,18,20,22,24,25];
$jogo_bom3 = [1,3,4,6,7,9,11,13,15,17,18,20,22,24,25];

$resultados = [];

for ($i = 1; $i <= 15; $i++) {
	$resultados[$i] = 0;
}

$resultado_jogos = [];
$cont = 0;

$consulta_sorteios = $PDO->query("SELECT id_sorteio, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15 FROM sorteios");

while ($row = $consulta_sorteios->fetch(PDO::FETCH_ASSOC)) {
// while (!$resultados[15]) {
// while ($cont != 10) {

	// $cont++;
	$cont = $row['id_sorteio'];

	$sorteados = [];
	$sorteados[] = $row['p1'];
	$sorteados[] = $row['p2'];
	$sorteados[] = $row['p3'];
	$sorteados[] = $row['p4'];
	$sorteados[] = $row['p5'];
	$sorteados[] = $row['p6'];
	$sorteados[] = $row['p7'];
	$sorteados[] = $row['p8'];
	$sorteados[] = $row['p9'];
	$sorteados[] = $row['p10'];
	$sorteados[] = $row['p11'];
	$sorteados[] = $row['p12'];
	$sorteados[] = $row['p13'];
	$sorteados[] = $row['p14'];
	$sorteados[] = $row['p15'];

	// prepara jogos
	$jogos = [];
	$jogos['jogo_hame'] = $jogo_hamenon;
	$jogos['jogo_mau1'] = $jogo_ruim1;
	$jogos['jogo_mau2'] = $jogo_ruim2;
	$jogos['jogo_mau3'] = $jogo_ruim3;
	$jogos['jogo_bom1'] = $jogo_bom1;
	$jogos['jogo_bom2'] = $jogo_bom2;
	$jogos['jogo_bom3'] = $jogo_bom3;

	$jogo_aleatorio1 = get_aposta_aleatoria(15);
	$jogos['jogo_alea'] = $jogo_aleatorio1;

	// prepara sorteio
	$numeros = range(1, 25);

	shuffle($numeros);
	shuffle($numeros);
	shuffle($numeros);

	$rand = rand(10,99);
	while (rand(0,$rand)!=rand(0,$rand)) {
		shuffle($numeros);
		shuffle($numeros);
		shuffle($numeros);
	}

	// $sorteados = [];

	// while (count($sorteados) < 15) {
	// 	$escolhido = array_rand($numeros, 1);
	//     $sorteados[] = $numeros[$escolhido];
	//     unset($numeros[$escolhido]);
	// }

echo "sorteio $cont -> ";
sort($sorteados);
for ($i=0; $i < 15; $i++) { 
	$val = $sorteados[$i];
	if ($val<10) {
		echo "0$val ";
	} else {
		echo "$val ";
	}
}
$str = '';
	foreach ($jogos as $key => $apostados) {
	
		$str.= "sorteio $cont -> jogo $key -> ";
		
		$x = array_diff($apostados, $sorteados);

		$acertos = count($apostados) - count($x);
if ($key=="jogo_mau1" && $acertos>12) {
	echo "a casa caiu\n";
	print_r($sorteados);
	print_r($apostados);
	print_r($x);
}
		// $resultados[$acertos]++;
		$resultado_jogos[$key][$acertos]++;
		
		for ($i = 5; $i <= 15; $i++) {
			// echo "[" . $i . "] " . $resultados[$i] . "  ";
			if (!isset($resultado_jogos[$key][$i])) {
				$resultado_jogos[$key][$i] = 0;
			}
			$str .= "[" . $i . "] " . $resultado_jogos[$key][$i] . "  ";
		}

		$str.= "\n";
	}
	echo "\n";
}
echo $str."\n";