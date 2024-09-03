
## DDL - Data Definition Language ##

/*
Converções de Nomenclatura:
 Nome do Banco de Dados: PascalCase
 Nome das Tabelas: PascalCase
 Nome das Colunas: camelCase
*/

/* criar banco de dados */
CREATE DATABASE Banco;

/* cria a tabela produtos */
CREATE TABLE [dbo].[Produtos] (
    [id]         INT            IDENTITY (3, 2017000) NOT NULL,
    [codBarras] NVARCHAR (50)  NOT NULL,
    [nome]       NVARCHAR (100) NOT NULL,
    [marca]      NVARCHAR (50)  NULL,
    [altura]     NVARCHAR (10)  NULL,
    [peso]       NVARCHAR (10)  NULL,
    [volume]     NVARCHAR (10)  NULL,
    [custo]      MONEY          DEFAULT ((0)) NOT NULL,
    [valor]      MONEY          DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Produtos] PRIMARY KEY CLUSTERED ([id] ASC)
);

/* renomear coluna */
USE banco;
GO
EXEC sp_rename 'Produtos.cod_barras', 'codBarras', 'COLUMN';
GO

/* adicionar coluna */
#NULL
ALTER TABLE Tabela ADD coluna DATETIME NULL;
GO
#NOT NULL
ALTER TABLE Tabela ADD coluna DATETIME NOT NULL DEFAULT '2017-01-01 00:00:00';
GO
/* OBS: Para o atributo 'NOT NULL' é obrigatório uma definição DEFAULT especificada */
/* OBS²: Para o tipo 'DATETIME' valor default deve ser uma data válida */

/* alterar coluna */
ALTER TABLE Tabela ALTER COLUMN coluna DATETIME NOT NULL;
GO
/* OBS: Comando acima falha caso conter registros nulos */

/* excluir coluna */
ALTER TABLE Tabela DROP COLUMN coluna;  
GO

/* adicionar restrição exclusiva para uma Tabela existente */
ALTER TABLE Tabela ADD CONSTRAINT UK__Tabela__name UNIQUE (coluna1, ...);

/* excluir uma constraint */
ALTER TABLE Produto DROP CONSTRAINT UQ__Produto__B3FE2EFC9AA56808;
GO
