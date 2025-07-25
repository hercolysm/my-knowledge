# Criar Projeto MSTest

Este guia descreve como criar um projeto de teste unitário para Dataverse usando MSTest.

## 1. Criar o Projeto

Crie um novo projeto de teste unitário no Visual Studio utilizando o template **MSTest**.

## 2. Instalar Pacotes Necessários

Adicione os seguintes pacotes NuGet ao projeto:

- `Microsoft.CrmSdk.CoreAssemblies`
- `Microsoft.CrmSdk.XrmTooling.CoreAssembly`
- `FakeXrmEasy.9`

## 3. Implementar a Conexão com o Dataverse

Crie um arquivo chamado `MSTestSettings.cs` e adicione o seguinte código para configurar a conexão com o Dataverse:

```csharp
using Microsoft.Xrm.Tooling.Connector;

public class MSTestSettings
{
    private static string Url = "";
    private static string ClientId = "";
    private static string ClientSecret = "k";

    private static string connectionString = $@"AuthType=ClientSecret;url={Url};ClientId={ClientId};ClientSecret={ClientSecret}";

    public CrmServiceClient service;

    public MSTestSettings()
    {
        service = GetService();
    }

    public static CrmServiceClient GetService()
    {
        CrmServiceClient crmServiceClient = new CrmServiceClient(connectionString);
        return crmServiceClient;
    }
}
```

## 4. Implementar Classes de Teste

Implemente suas classes de teste herdando de `MSTestSettings` para reutilizar a configuração da conexão.

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class MeuTeste : MSTestSettings
{
    [TestMethod]
    public void TesteDeExemplo()
    {
        // Seu código de teste aqui
        Assert.IsNotNull(service);
    }
}
```
