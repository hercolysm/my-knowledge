SELECT * FROM tabela ORDER BY coluna asc (ou desc); /* ordena */
SELECT * FROM tabela WHERE val <= 2016; /* maior ou igual */
SELECT * FROM tabela WHERE val != (ou <>) 2016; /* diferente */
SELECT * FROM tabela WHERE val BETWEEN 2014 and 2015; /* entre */
SELECT * FROM tabela WHERE val IN (2014,2016); /* esteja em */
SELECT * FROM tabela WHERE val > 35 and val2 <= 30; /* e */
SELECT * FROM tabela WHERE val > 35 or val2 = 30; /* ou */
SELECT * FROM tabela WHERE val LIKE '%busca%'; /* busca */
SELECT * FROM tabela WHERE val NOT LIKE '%busca%'; /* negação */
SELECT * FROM tabela WHERE val LIKE 'PH%P'; /* php, photoshop */
SELECT * FROM tabela WHERE val LIKE 'PH%P_'; /* php3, php4 */
SELECT distinct coluna FROM tabela; /* distintos */
SELECT count(id) FROM tabela; /* conta */
SELECT max(coluna) FROM tabela; /* retorna o maior */
SELECT min(coluna) FROM tabela; /* retorna o menor */
SELECT sum(coluna) FROM tabela; /* retorna a soma */
SELECT avg(coluna) FROM tabela; /* retorna a media */
SELECT * FROM tabela GROUP BY coluna; /* agrupa */
SELECT * FROM tabela GROUP BY coluna HAVING coluna > 1999; /*  */
SELECT * FROM tabela ORDER BY field (coluna,valor) desc; /* escolher qual valor vem primeiro */
SELECT concat(coluna1,' - ',coluna2) FROM tabela; /* concatena */
SELECT * FROM tabela LIMIT posicao , qnt; /* limita */
SELECT * FROM tabela WHERE coluna = substring('string',pos,tam); /* corta uma string */
SELECT sec_to_time(segundos) FROM tabela; /* converte em segundos */
SELECT coalesce(null,2,3) FROM tabela; /* retorna primeiro resultado não nulo */  
RENAME TABLE tabela TO novo_nome; /* renomeia tabela */
SHOW COLUMNS FROM tabela; /* mostra colunas */
ALTER TABLE nome_tabela ADD COLUMN nome_coluna tipo(t); /* add coluna na tabela */
ALTER TABLE nome_tabela DROP COLUMN nome_coluna; /* remove coluna da tabela */
ALTER TABLE nome_tabela MODIFY COLUMN nome_coluna tipo()t; /* modifica uma coluna  (MySQL) */
ALTER TABLE nome_tabela ALTER COLUMN nome_coluna tipo()t; /* modifica uma coluna  (SQL) */
ALTER TABLE nome_tabela ADD FOREIGN KEY (id) REFERENCES tabela_referencia (id_ref) ON DELETE CASCADE; /* cria chave estrageira, como delete automatico */
ALTER TABLE nome_tabela DROP FOREIGN KEY (foreign_key_name); /* apaga uma chave estrangeira */ 
ALTER TABLE nome_tabela ENGINE=InnoDB /* altera o motor de busca da tabela */
SHOW FULL TABLES IN nome_do_banco WHERE TABLE_TYPE LIKE 'VIEW'; /* mostra todas as views */
CREATE VIEW nome_view AS select * from nome_tabela where .. /* cria uma view */
DROP VIEW nome_view; /* deleta uma view */
CREATE OR REPLACE VIEW nome_view AS select * from nome_tabela where .. /* edita uma view */
SHOW FULL PROCESSLIST /* mostra lista de processos */
