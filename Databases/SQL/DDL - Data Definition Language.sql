
## DDL - Data Definition Language ##

/* cria a tabela produtos */
CREATE TABLE [dbo].[produtos] (
    [id]         INT            IDENTITY (3, 2017000) NOT NULL,
    [cod_barras] NVARCHAR (50)  NOT NULL,
    [nome]       NVARCHAR (100) NOT NULL,
    [marca]      NVARCHAR (50)  NULL,
    [altura]     NVARCHAR (10)  NULL,
    [peso]       NVARCHAR (10)  NULL,
    [volume]     NVARCHAR (10)  NULL,
    [custo]      MONEY          DEFAULT ((0)) NOT NULL,
    [valor]      MONEY          DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_produtos] PRIMARY KEY CLUSTERED ([id] ASC)
);

/* renomear coluna */
USE banco;
GO
EXEC sp_rename 'tabela.coluna', 'novo_nome', 'COLUMN';
GO

/* adicionar coluna */
#NULL
ALTER TABLE tabela ADD coluna DATETIME NULL;
GO
#NOT NULL
ALTER TABLE tabela ADD coluna DATETIME NOT NULL DEFAULT '2017-01-01 00:00:00';
GO
/* OBS: Para o atributo 'NOT NULL' é obrigatório uma definição DEFAULT especificada */
/* OBS²: Para o tipo 'DATETIME' valor default deve ser uma data válida */

/* alterar coluna */
ALTER TABLE tabela ALTER COLUMN coluna DATETIME NOT NULL;
GO
/* OBS: Comando acima falha caso conter registros nulos */

/* excluir coluna */
ALTER TABLE tabela DROP COLUMN coluna;  
GO

/* adicionar restrição exclusiva para uma tabela existente */
ALTER TABLE tabela ADD CONSTRAINT UK__tabela__name UNIQUE (coluna1, ...);

/* excluir uma constraint */
ALTER TABLE produto DROP CONSTRAINT UQ__produto__B3FE2EFC9AA56808;
GO
