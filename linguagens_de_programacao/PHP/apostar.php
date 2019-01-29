<?php

$resultados = [];

for ($i = 1; $i <= 15; $i++) {
	$resultados[$i] = 0;
}

$cont = 0;

while (!$resultados[12]) {
// while ($cont != 100) {

	$cont++;

	$numeros = range(1, 25);

	$apostados = [1,2,3,4,5,8,9,11,12,14,16,18,19,23,24,25];
	// $apostados = [7,10,13,15,17,20,21,22,25,1,2,3,4,5,6,8,24,19];
	// $apostados = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

	// while (count($apostados) < 15) {
	// 	$escolhido = array_rand($numeros, 1);
	//     $apostados[] = $numeros[$escolhido];
	//     unset($numeros[$escolhido]);
	// }

	$numeros = range(1, 25);

	$sorteados = [];

	while (count($sorteados) < 15) {
		$escolhido = array_rand($numeros, 1);
	    $sorteados[] = $numeros[$escolhido];
	    unset($numeros[$escolhido]);
	}

	$x = array_diff($apostados, $sorteados);
	// $y = array_diff($sorteados, $apostados);

	// sort($apostados);
	// sort($sorteados);
	// sort($x);
	// sort($y);

	// print_r($apostados);
	// print_r($sorteados);
	// print_r($x);
	// print_r($y);

	$acertos = 16 - count($x);

	$resultados[$acertos]++;

	echo "sorteio $cont -> ";

	for ($i = 1; $i <= 15; $i++) {
		echo "[" . $i . "] " . $resultados[$i] . "  ";
	}

	echo "\n";
}
