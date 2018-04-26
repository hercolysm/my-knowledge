# instalar phpredis
git clone https://github.com/phpredis/phpredis.git
cd phpredis
sudo phpize
sudo ./configure
make
make install

# usar php redis
$redis = new Redis();
$redis->connect("127.0.0.1", 6379);
$redis->publish("channel", "Hello World!");


# redis
redis-serve => Iniciar o servidor na porta 6379
redis-cli => Iniciar o redis client


# comandos do redis client

# inserir registros
set namespace:var-name value 
// retorno: OK

# inserir registros com TTL(Time To Live)
setex namespace:var-name seconds value 
// retorno: OK

# recuperar registro
get namespace:var-name
// retorno: "value" ou (nil) se não existir

# deletar registro
del namespace:var-name
// retorno: (integer) 1

# assinar um canal específico
subscribe channel-name

# assinar todos os canais
psubscribe *

# publicar em um canal
publish channel-name "value"
// retorno: (integer) 1

# instalar modulo redis node
npm install --save redis
