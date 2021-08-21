INSERT INTO tabela (col1, col2) VALUES (val1, val2); /* insere linha na tabela */

UPDATE tabela SET col1 = val1, col2 = val2 WHERE id = @id; /* altera linha na tabela */

DELETE FROM tabela WHERE id = @id; /* apaga linha da tabela */
DELETE FROM tabela WHERE id = @id ORDER BY coluna DESC limit 1 /* apaga linhas da tabela (ordenando e limitando) */

TRUNCATE tabela; /* apaga todos os registros da tabela (dará erro se a tabela possuir chave estrangeira) */

SELECT * FROM tabela ORDER BY coluna asc (ou desc); /* ordena */
SELECT * FROM tabela ORDER BY CAST(coluna as SIGNED); /* converte campo numero (int) e ordena */
SELECT * FROM tabela ORDER BY CAST(coluna as DECIMAL(12,2)); /* converte campo numero (float) e ordena */
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
SELECT group_concat(id SEPARATOR ';') FROM tabela GROUP BY tipo /* contatena os id's de cada tipo (com o separador ';') */
SELECT group_concat(distinct coluna) FROM tabela ORDER BY group_concat(distinct coluna) /* concatena os valores distinctos e ordena */
SELECT group_concat(distinct coluna order by coluna) FROM tabela /* concatena os valores distinctos de forma ordenada */
SET SESSION group_concat_max_len = 6000; /* aumenta a quantidade de caracteres do retorno do GROUP_CONCAT() */
SELECT * FROM tabela LIMIT posicao , qnt; /* consulta paginada */
SELECT * FROM tabela LIMIT qnt OFFSET posicao; /* consulta paginada */
SELECT * FROM tabela WHERE coluna = substring('string',pos,tam); /* corta uma string */
SELECT sec_to_time(segundos) FROM tabela; /* converte em segundos */
SELECT coalesce(null,2,3) FROM tabela; /* retorna primeiro resultado não nulo */
SELECT * FROM [nome_view] GROUP BY ORDER BY /* busca em uma view */
SELECT UPPER(coluna) FROM tabela; /* converte caracteres para caixa alta, exceto, caracteres especiais */
SELECT LENGTH(coluna) FROM tabela; /* retorna a qnt de caracteres */
SELECT CHAR_LENGTH(coluna) FROM tabela; /* retorna a qnt de bytes */
SELECT CURDATE(), CURRENT_DATE(), CURDATE()+0; /* retorna a data atual, é possível fazer soma com o número retornado */
SELECT DATE_ADD(coluna, INTERVAL 31 DAY) as 31_dias_a_mais; /* retorna a data acrescida de x dias */
SELECT TRIM(coluna) FROM tabela /* remove espaços antes e depois */
SELECT TRIM(BOTH ',' FROM coluna) FROM tabela /* remove vírgulas antes e depois [BOTH, LEADING, TRAILING] */
SELECT REPLACE(coluna, 'palavra_procurada', 'palavra_substituta') FROM tabela /* substitui uma string por outra */
SELECT LOCATE('texto_procurado', coluna) FROM tabela; /* retorna a posição da primeira ocorrência de uma string */
SELECT CONVERT(CAST(CONVERT(coluna USING latin1) AS BINARY) USING utf8) AS coluna_acentuada; /* converte texto UTF-8 e exibir os acentos no resultado */
SELECT DATEDIFF(data_base, data_a_substrair) /* retorna a diferença de dias entre as datas */

/* query's incompatible with sql_mode=only_full_group_by */
SELECT count(coluna), ANY_VALUE(coluna) FROM tabela; /* permite a consulta qualquer valor */
SELECT ANY_VALUE(coluna), max(coluna) FROM tabela; /* permite a consulta qualquer valor */

SELECT data,
CASE
    WHEN data > '2018-08-29' THEN "FUTURAS"
    WHEN data < '2018-08-29' THEN "EM ATRASO"
    ELSE "HOJE"
END as status
FROM tabela;

SELECT opcao,
CASE
	WHEN opcao = '1' THEN 'Opção1'
	WHEN opcao = '2' THEN 'Opção2'
	ELSE 'Nenhuma das opções'
END
FROM tabela;

# executar comando e capturar retorno
mysql -u user -psenha banco_de_dados -e "select distinct coluna from tabela where coluna is null order by coluna" > /tmp/retorno_consulta.txt

# criar arquivo csv
SELECT coluna FROM tabela WHERE coluna = 'valor' INTO OUTFILE '/var/lib/mysql-files/nome_arquivo.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';

# importar arquivo csv (É necessário que o arquivo esteja dentro no diretório do banco de dados)
LOAD DATA INFILE 'nome_arquivo.csv' INTO TABLE tabela FIELDS TERMINATED BY ';' ENCLOSED BY '"' LINES TERMINATED BY '\n' (col1, col2, col3);
