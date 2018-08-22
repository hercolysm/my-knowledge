<?php

echo "Hello world! ".rand(0, 100);

$numeros = ["01234567890","12345678912","23456789234","85988696390"];

$mascaras = ["XXX[1-37-9]XXXX[0-3]XX","YYYYYYYYYYY","DDDDDDDDDDD","XXXXXXXXXXX"];

foreach ($numeros as $numero) {

	echo "<br><br>".$numero;
	$rota = null;

	foreach ($mascaras as $mascara) {

		$ok = verificar_mascara($numero, $mascara);

		if ($ok == true) {
			$rota = $mascara;
			break;
		}
	}

	var_dump($rota);
}

function verificar_mascara($numero, $mascara) {

	$sequencias = [];
	$split = explode("[", $mascara);

	if ((count($split) - 1) > 0) {
		$count = 1;
		while (isset($split[$count])) {
			$chars = $split[$count];
			$sequencia = explode("]", $chars)[0];
			array_push($sequencias, $sequencia);
			$count++;
		}
	}

	$numeros = str_split($numero);

	$mascara_ = str_replace(array("[", "]"), "*", $mascara);
	$mascara_ = preg_replace("/\*([^*]+)\*/" , '?', $mascara_);
	$sequencia_key = 0;

	foreach (str_split($mascara_) as $key => $letra) {
		// echo "<br>".$letra."-".$numeros[$key];
		$permitido = true;
		$numero = $numeros[$key];
		switch ($letra) {
			case 'X':
				$permitido = ($numero >= 0) && ($numero <= 9);
				break;

			case 'D':
				$permitido = ($numero >= 1) && ($numero <= 9);
				break;

			case 'Y':
				$permitido = ($numero >= 2) && ($numero <= 9);
				break;

			case '?':
				$sequencia = $sequencias[$sequencia_key];
				if (strpos($sequencia, $numero) !== false) {
					$permitido = true;
				} else {
					if (strpos($sequencia, "-") !== false) {
						$preg = preg_replace("/[$sequencia]/", "", $numero);
						$permitido = ($preg == "") ? true : false;
					} else {
						$permitido = false;
					}
				}
				$sequencia_key++;
				break;
			
			default:
				$permitido = ($numero == $letra);
				break;
		}
		if ($permitido == false) {
			return false;
		}
	}
	return true;
}
