## DML - Data Manipulation Language ##

SELECT name, database_id, create_date FROM sys.databases; /* mostrar todos os databases */

USE database; /* seleciona o banco de dados */

GO /* executa os comandos */

/* mostrar todas as tabelas do database */
SELECT table_name FROM information_schema.tables WHERE table_type = 'base table' ORDER BY table_name;

/* mostrar a descrição de uma tabela */
SELECT column_name as [nome], is_nullable as [null], data_type + COALESCE('('+ case when character_maximum_length = -1 then 'max' else cast(character_maximum_length as varchar(5)) end + ')', '') as type FROM information_schema.Columns WHERE table_name = 'nome_tabela';
