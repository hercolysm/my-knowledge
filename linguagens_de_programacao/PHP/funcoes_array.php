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

// array_search - retorno o índice de um determinado valor
$arr = ['a','b','c'];
array_search('a', $arr); // int(0)
array_search('b', $arr); // int(1)
array_search('c', $arr); // int(2)
array_search('d', $arr); // bool(false)

/**
 * Valores distinctos de um array
 */
$arr = ['a', 'b', 'b', 'c'];
$distint = array_unique($arr); // ['a', 'b', 'c']
