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
