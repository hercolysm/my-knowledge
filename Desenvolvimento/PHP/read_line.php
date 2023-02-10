/**
 * Recebe uma entrada do teclado
 */
$readline = "Digite o ano: \n";

if (PHP_OS == 'WINNT') {
  echo $readline;
  $ano = stream_get_line(STDIN, 1024, PHP_EOL);
} else {
  $ano = readline($readline);
}