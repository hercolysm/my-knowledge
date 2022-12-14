<?php 


$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://www.receitaws.com.br/v1/cnpj/05533459000174/days/10',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer 734f1a87442f12f022bab611fe073a41f56a8f5d2c77f5f5e5fe22f825fa93b4',
        'Cookie: JSESSIONID=ed179333b826d9026424e4b7dd183e4d36c2892d'
    ),
    CURLOPT_SSL_VERIFYHOST => false, 
    CURLOPT_SSL_VERIFYPEER => false,
));

$response = curl_exec($curl);

if($response === false)
{
    echo 'Curl error: ' . curl_error($curl);
}
else
{
    echo 'Operation completed without any errors';
}

curl_close($curl);
var_dump($response);
