Install-Module -Name Microsoft.PowerApps.Administration.PowerShell -Scope CurrentUser
Install-Module -Name Microsoft.PowerApps.PowerShell -AllowClobber -Scope CurrentUser

# Sign in (tenant-wide)
Add-PowerAppsAccount
 
# If you already know only the App ID:
Get-AdminPowerApp -AppId "c647e1a9-c393-9988-1731-9c9848c7b1e1" | Format-List DisplayName, AppId, EnvironmentName, Owner, CreatedTime
 
# Enumerate all environments, then search for the App ID:
Get-AdminPowerApp | Where-Object { $_.AppId -eq "c647e1a9-c393-9988-1731-9c9848c7b1e1" } |
  Select-Object DisplayName, AppId, EnvironmentName
 
# If you suspect a Dataverse for Teams environment:
Get-AdminPowerAppEnvironment -EnvironmentName "<teams-env-id>" |
  Get-AdminPowerApp | Where-Object { $_.AppId -eq "c647e1a9-c393-9988-1731-9c9848c7b1e1" }