<?php

$resultados = [];

for ($i = 0; $i <= 20; $i++) {
	$resultados[$i] = 0;
}

$cont = 0;

while (!$resultados[20]) {
// while ($cont != 100) {

	$cont++;

	$apostados = [
		5,12,14,15,17,
		19,20,23,24,26,
		27,28,29,32,33,
		35,38,39,40,41,
		42,43,45,46,48,

		51,53,56,57,58,
		59,61,64,67,68,
		70,72,74,77,80,
		82,83,84,86,87,
		88,91,93,95,96
	];

	// $numeros = range(0, 99);

	// while (count($apostados) < 20) {
	// 	$escolhido = array_rand($numeros, 1);
	//     $apostados[] = $numeros[$escolhido];
	//     unset($numeros[$escolhido]);
	// }

	$numeros = range(0, 99);

	shuffle($numeros);
	shuffle($numeros);
	shuffle($numeros);

	$sorteados = [];

	while (count($sorteados) < 20) {
		$escolhido = array_rand($numeros, 1);
	    $sorteados[] = $numeros[$escolhido];
	    unset($numeros[$escolhido]);
	}

	// $x = array_diff($apostados, $sorteados);
	$y = array_diff($sorteados, $apostados);

	// sort($apostados);
	// sort($sorteados);
	// sort($x);
	// sort($y);

	// print_r($apostados);
	// print_r($sorteados);
	// print_r($x);
	// print_r($y);

	$acertos = 20 - count($y);

	$resultados[$acertos]++;

	echo "s$cont ";

	for ($i = 0; $i <= 20; $i++) {
		echo "[" . $i . "]" . $resultados[$i] . " ";
	}

	echo "\n";
}
