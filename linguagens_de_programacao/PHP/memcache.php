<?php
/**
 * Usando memcache php
 * @author Hercolys Moraes <hercolysmoraes@live.com>
 */

e("Ola".rand(0, 100));
e("Tentando php memcache ...");

// Exeplos:

/*--------------------------------------------- procedural API ---------------------------------------------*/

@$memcache_obj = memcache_connect('localhost', 11211);

if ($memcache_obj === false) {
	e("Nao foi possivel conectar ao servidor de cache");
} else {
	e("Versao do servidor memcache: ".$memcache_obj->getVersion());
}

// Recuperar item do servidor
@$var = memcache_get($memcache_obj, 'var_key') or e("Falha ao buscar dados do servidor de cache");

// Adicionar item ao servidor (se não existir)
if ($var == false) {
	e("Gerando cache ...");
	$var =  'test variable';
	@memcache_set($memcache_obj, 'var_key', $var, false, 10) or e("Falha ao salvar dados no servidor de cache");
}

var_dump($var);
e();


/*------------------------------------------------- OO API ------------------------------------------------*/

$memcache_obj = new Memcache;
@$memcache_obj->connect('localhost', 11211) or e("Nao foi possivel conectar ao servidor de cache");

// Recuperar item do servidor
$var2 = $memcache_obj->get('var_key2') or e("Falha ao buscar dados do servidor de cache");

// Adicionar item ao servidor (se não existir)
if ($var2 === false) {
	e("Gerando cache ...");
	$var2 =  'test variable';
	$memcache_obj->set('var_key2', $var2, false, 10) or  e("Falha ao salvar dados no servidor de cache");
}

var_dump($var2);
e();

function e($txt=""){
	echo $txt . "<br>\n";
}


// Instalação Windows
/**
 * Configurar php.init
 *
 * extension=php_memcache.dll
 * [Memcache]
 * memcache.allow_failover = 1
 * memcache.max_failover_attempts=20
 * memcache.chunk_size =8192
 * memcache.default_port = 11211
 *
 * Baixar arquivo php_memecache.dll (na mesma versão do PHP)
 * link: http://windows.php.net/downloads/pecl/releases/memcache/3.0.8/php_memcache-3.0.8-5.5-ts-vc11-x86.zip
 * Copiar arquivo .dll para 'xampp\php\ext'
 * 
 * Baixar arquivo memcache.exe
 * link: https://commaster.net/content/installing-memcached-windows
 * instalar: c:\memcached\memcached.exe -d install
 * iniciar: c:\memcached\memcached.exe -d start
 * parar: c:\memcached\memcached.exe -d stop
 *
 */


/*--------------------------------------------- procedural API ---------------------------------------------*/
/*
$memcache_obj = memcache_connect('localhost', 11211); // conecta ao servidor memcache
$version = $memcache_obj->getVersion(); // versão do servidor
$var = memcache_get($memcache_obj, 'var_key'); // recupera item do servidor
memcache_add($memcache_obj, 'var_key', $var, false, 10); // adiciona item ao servidor (apenas se não existir)
memcache_set($memcache_obj, 'var_key', $var, false, 10); // armazena dados no servidor
memcache_replace($memcache_obj, 'var_key', $var, false, 10); // substitui valor de um item existente no servidor
memcache_delete($memcache_obj, 'var_key'); // deleta item do servidor
memcache_close($memcache_obj); // fecha a conexao com o servidor
*/
/*------------------------------------------------- OO API ------------------------------------------------*/
/*
$memcache_obj = new Memcache;
$memcache_obj->connect('localhost', 11211);
$var2 = $memcache_obj->get('var_key2'); // recupera item do servidor
$memcache_obj->add('var_key2', $var2, false, 10); // adiciona item ao servidor (apenas se não existir)
$memcache_obj->set('var_key2', $var2, false, 10); // armazena dados no servidor
$memcache_obj->replace('var_key2', $var2, false, 10); // substitui valor de um item existente no servidor
$memcache_obj->delete('var_key2'); // deleta item do servidor
$memcache_obj->close(); // fecha a conexao com o servidor
*/
/*----------------------------------------------------------------------------------------------------------*/
