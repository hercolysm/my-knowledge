# Python 3.10.5
# 
# Requisições

# Instalar pacotes do python3
#> pip3 install requests

import requests 

url = 'http://165.227.174.105:8080/'

response = requests.get(url)

status = response.status_code
content = response.content

print('status: ', status)
