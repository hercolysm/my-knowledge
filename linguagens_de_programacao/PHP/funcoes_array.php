<?php

/**
 * Ordenação de um array associativo
 */
$datas = [
    ['data'=>'2019-01-03'],
    ['data'=>'2019-01-01'],
    ['data'=>'2019-01-02'],
];

// ordena lista por data
usort($datas, function($a, $b){
    return (strtotime($a['data']) - strtotime($b['data'])) * -1; // '-1' define a ordem crescente/decrecente
});

print_r($datas);
