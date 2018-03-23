# Definir a senha root pela primeira vez
mysqladmin.exe -u root password nova_senha

# Alterar senha root
USE mysql;
UPDATE user SET password = PASSWORD('123456') WHERE user='root';
FLUSH PRIVILEGES;
