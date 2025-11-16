## DML - Data Manipulation Language ##

SELECT name, database_id, create_date FROM sys.databases; /* mostrar todos os databases */

USE database; /* seleciona o banco de dados */

GO /* executa os comandos */

/* mostrar todas as tabelas do database */
SELECT table_name FROM information_schema.tables WHERE table_type = 'base table' ORDER BY table_name;

/* mostrar a descrição de uma tabela */
SELECT column_name as [nome], is_nullable as [null], data_type + COALESCE('('+ case when character_maximum_length = -1 then 'max' else cast(character_maximum_length as varchar(5)) end + ')', '') as type FROM information_schema.Columns WHERE table_name = 'nome_tabela';

/* listar constraint's de uma tabela */
SELECT OBJECT_NAME(parent_object_id) as tabela, name, type_desc FROM sys.objects WHERE type = 'UQ' AND OBJECT_NAME(parent_object_id) = 'nome_tabela';

SELECT customername, COUNT(customerid) as totalCliente 
FROM tabela 
WHERE
    customername IS NOT NULL 
    AND customername <> 'teste'
    AND createdon BETWEEN '2024-09-11 00:00:00' AND '2024-09-11 23:59:59'
GROUP BY customernames
HAVING COUNT(customerid) > 1

WITH subQuery AS (
    SELECT id, column_name, customerid, COUNT(customerid) as totalCliente 
    FROM tabela 
    WHERE
        customername IS NOT NULL 
        AND createdon BETWEEN '2024-09-12 00:00:00' AND '2024-09-12 23:59:59'
    GROUP BY column_name, customerid
    HAVING COUNT(customerid) > 1
) SELECT createdon, column_name, customerid, customeridname, owneridname FROM tabela WHERE id IN (
    SELECT id FROM subQuery
)