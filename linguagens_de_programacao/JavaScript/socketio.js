/*
# projeto para servidor

mkdir socketio
cd socketio/

npm init
npm install --save socket.io
npm install --save request
npm install --save redis

cp node_modules/socket.io-client/dist/socket.io.js {path}/public/assets/js/socket.io.js


# Uso da porta 80 para sockets com redirecionamento http

echo 'LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so' >> /etc/httpd/conf.modules.d/00-proxy.conf 

echo "" >> /etc/httpd/conf/httpd.conf
echo "# redirecionamento socket para a porta 80" >> /etc/httpd/conf/httpd.conf
echo "RewriteEngine On" >> /etc/httpd/conf/httpd.conf
echo "RewriteCond %{REQUEST_URI}  ^/socket.io            [NC]" >> /etc/httpd/conf/httpd.conf
echo "RewriteCond %{QUERY_STRING} transport=websocket    [NC]" >> /etc/httpd/conf/httpd.conf
echo "RewriteRule /(.*)           ws://127.0.0.1:4541/$1 [P,L]" >> /etc/httpd/conf/httpd.conf
echo "ProxyPass        /socket.io http://127.0.0.1:4541/socket.io" >> /etc/httpd/conf/httpd.conf
echo "ProxyPassReverse /socket.io http://127.0.0.1:4541/socket.io" >> /etc/httpd/conf/httpd.conf

# O cliente deve conectar na porta 80
# O servidor deve ouvir a porta 8140

*/
