
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
