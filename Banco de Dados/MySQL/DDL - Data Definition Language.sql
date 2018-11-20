
## DATABASE ##

CREATE DATABASE nome_do_banco; /* cria um banco de dados */
SHOW DATABASES; /* mostra os banco de dados */
USE banco_de_dados; /* seleciona banco de dados */
DROP DATABASE nome_do_banco; /* apaga um banco de dados */

## TABLE ##

SHOW TABLES; /* mostra as tabelas do banco de dados */
DESC tabela (ou DESCRIBE); /* mostra detalhes da tabela */
SHOW COLUMNS FROM tabela; /* mostra colunas */
SHOW CREATE TABLE tabela; /* mostra script de criação de tabela */
CREATE TABLE nome_tabela (
	id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	palavra VARCHAR(100),
	caractere CHAR(1),
	texto TEXT,
	flag BOOLEAN NOT NULL DEFAULT true,
	data DATE,
	hora TIME,
	data_hora DATETIME NOT NULL DEFAULT NOW(),
	valor DECIMAL(9,2),
	preco FLOAT(9,2),
	opcoes ENUM('opcao1', 'opcao2', 'opcao3', 'opcao4'),
	UNIQUE (col1),
	CONSTRAINT UC_table UNIQUE (col1, col2)
) COMMENT 'Comentário da tabela';
RENAME TABLE tabela TO novo_nome; /* renomeia tabela */
ALTER TABLE nome_tabela ADD COLUMN nome_coluna tipo(t); /* cria coluna na tabela */
ALTER TABLE nome_tabela CHANGE nome_coluna novo_nome tipo(t); /* renomeia coluna da tabela */
ALTER TABLE nome_tabela DROP COLUMN nome_coluna; /* remove coluna da tabela */
ALTER TABLE nome_tabela MODIFY COLUMN nome_coluna tipo(t); /* modifica uma coluna  (MySQL) */
ALTER TABLE nome_tabela ALTER COLUMN nome_coluna tipo(t); /* modifica uma coluna  (SQL) */
ALTER TABLE nome_tabela ADD FOREIGN KEY (id) REFERENCES tabela_referencia (id_ref) ON DELETE CASCADE; /* cria chave estrageira, como delete automatico */
ALTER TABLE nome_tabela DROP FOREIGN KEY (foreign_key_name); /* apaga uma chave estrangeira */
ALTER TABLE nome_tabela ENGINE=InnoDB; /* altera o motor de busca da tabela */
ALTER TABLE nome_tabela ADD UNIQUE (col1); /* cria chave única simples */
ALTER TABLE nome_tabela ADD CONSTRAINT nome_constraint UNIQUE (col1, col2); /* cria chave única composta */
ALTER TABLE nome_tabela ADD INDEX idx_nome_coluna (nome_coluna); /* cria chave de index */
ALTER TABLE nome_tabela DROP INDEX nome_constraint; /* apaga uma chave */

## tipos de dados ##

# Numéricos

/* SIGNED (permite valores negativos) ou UNSIGNED (não permite negativos) */
/* ZEROFILL (automaticamente adiciona o UNSIGNED) */
/* SERIAL (BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE) */
/* BIT(x) DEFAULT '1' (1 a 64) */
/* TINYINT(x) (-128 a 127 e 0 a 255) */
/* BOOL, BOOLEAN (sinonimos de TINYINT(1)) */
/* SMALLINT(x) (-32768 a 32767) */
/* MEDIUMINT(x) (-8388608 a 8388607 e 0 a  16777215) */
/* INT(x), INTEGER(x) (-2147483648 a 2147483647 e 0 a 4294967295) */
/* BIGINT(x) (-9223372036854775808 to 9223372036854775807 e 0 a 18446744073709551615) */
/* DECIMAL(x,y) */
/* 		x DEFAULT '10' (max 65) */
/* 		y DEFAULT '0' (max 30) */
/* DEC(x,y), NUMERIC(x,y), FIXED(x,y) sinonimos de DECIMAL */
/* FLOAT(x,y) */
/* 		y DEFAULT 'hardware limit' (max 7) */
/* DOUBLE(x,y) */
/* 		y DEFAULT 'hardware limit' (max 15) */
/* DOUBLE PRECISION(x,y), REAL(x,y)(se REAL AS FLOAT estiver desabilitado) */
/* FLOAT(x) x 0 a 24 FLOAT x 25 a 53 DOUBLE*/

# link: https://dev.mysql.com/doc/refman/5.7/en/numeric-type-overview.html

## VIEW ##

SHOW FULL TABLES IN nome_do_banco WHERE TABLE_TYPE LIKE 'VIEW'; /* mostra todas as views */
CREATE VIEW [nome_view] AS SELECT * FROM tabela WHERE .. /* cria uma view */
CREATE OR REPLACE VIEW [nome_view] AS select * from nome_tabela where .. /* edita uma view */
ALTER VIEW [nome_view] AS SELECT * FROM tabela WHERE .. /* edita uma view*/
DROP VIEW [nome_view] /* apaga uma view */
RENAME TABLE [nome_view] TO [novo_nome]; /* renomeia view */

## PROCESS ##

SHOW FULL PROCESSLIST; /* mostra lista de processos */
KILL 0000; /* exclui um processo */ 
