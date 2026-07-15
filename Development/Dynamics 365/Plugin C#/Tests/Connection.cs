static string url = "https://your-crm-instance.crm2.dynamics.com";
static string clientId = "YOUR_CLIENT_ID";
static string clientSecret = "YOUR_CLIENT_SECRET";

static string connection = $@"AuthType=ClientSecret;url={url};ClientId={clientId};ClientSecret={clientSecret}";

static string conection = $@"AuthType=OAuth; Username={username}; Password={password}; Url={url}; AppId={appId}; RedirectUri={redirectUri}; LoginPrompt=Auto";

EX:
    <add name="DEV" connectionString="authtype=OAuth; Username=YOUR_USERNAME; Password=YOUR_PASSWORD; Url=https://your-crm-instance.crm2.dynamics.com; AppId=YOUR_APP_ID; RedirectUri=YOUR_REDIRECT_URI; LoginPrompt=Auto" />

    <add name="DEV" connectionString="authtype=ClientSecret; Url=https://your-crm-instance.crm2.dynamics.com; ClientId=YOUR_CLIENT_ID; ClientSecret=YOUR_CLIENT_SECRET" />

    <add name="DEV" connectionString="AuthType=ClientSecret;url=https://your-crm-instance.crm2.dynamics.com;ClientId=YOUR_CLIENT_ID;ClientSecret=YOUR_CLIENT_SECRET" />
    