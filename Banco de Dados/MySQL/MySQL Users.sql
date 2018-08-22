# Definir a senha root pela primeira vez
mysqladmin.exe -u root password nova_senha

# Alterar senha root
USE mysql;
UPDATE user SET password = PASSWORD('123456') WHERE user='root';
FLUSH PRIVILEGES;

# listar usuarios
USE mysql;
SELECT user,host FROM user;

# criar usuario
CREATE USER '<USERNAME>'@'<SERVER_HOSTNAME>' IDENTIFIED BY '<PASSWORD>';

# dar permissões para o usuário
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER,INDEX on <DB_NAME>.* TO '<USERNAME>'@'<SERVER_HOSTNAME>' IDENTIFIED BY '<PASSWORD>';
flush privileges;
