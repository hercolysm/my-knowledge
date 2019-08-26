/**
 * Recebe uma entrada do teclado
 */
$readline = "Digite o seu nome: \n";

if (PHP_OS == 'WINNT') {
  echo $readline;
  $nome = stream_get_line(STDIN, 1024, PHP_EOL);
} else {
  $nome = readline($readline);
}

print "O seu nome é ".$nome;
