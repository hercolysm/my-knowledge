# LocalDB 

## Nome do servidor 
    (localdb)\MSSQLLocalDB

## Conectar sem especificar o banco de dados
    Server=(localdb)\MSSQLLocalDB;Integrated Security=true

## Exemplo de string de conexão usando autenticação Windows
    Server=(localdb)\MSSQLLocalDB;Integrated Security=true;Initial Catalog=ControleDeEstoque

## Exemplo de string de conexão usando autenticação de usuário
    Server=(localdb)\MSSQLLocalDB;User Id=seu_usuario;Password=sua_senha;Initial Catalog=ControleDeEstoque

## Exemplo de string de conexão de um data set no Visual Studio
    Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=ControleDeEstoque;Integrated Security=True
