# Python 3.10.5
# 
# Web Scraping 

# instalar chrome (forma 01)
#>wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
#>dpkg -i google-chrome-stable_current_amd64.deb
#>apt-get -f install

# instalar chrome (forma 02)
#>wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
#>apt-get install -y ./google-chrome-stable_current_amd64.deb 

# desinstalar chrome
#>dpkg -r google-chrome-stable
#>dpkg -p google-chrome-stable

# listar pacotes instalados
#>dpkg -l

# procurar pacotes pelo nome
#>dpkg -s chrom

# procurar por nome
#>find / -name *chrom*

# Instalar pacotes do python3
#> pip3 install html5lib
#> pip3 install beautifulsoup4
#> pip3 install selenium
#> pip3 install webdriver-manager

import requests 
from bs4 import BeautifulSoup 
from selenium import webdriver
from selenium.webdriver.chrome.options import Options 
from webdriver_manager.chrome import ChromeDriverManager 
from time import sleep

url = 'https://loterias.caixa.gov.br/Paginas/Lotofacil.aspx'

# busca conteúdo html fazendo uma requisição get
# response = requests.get(url)
# soup = BeautifulSoup(response.content, 'html5lib')

# configura o nagegador
chrome_options = Options()
chrome_options.add_argument('window-size=1280,720')
chrome_options.add_argument('--no-sandbox')
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-dev-shm-usage')

# abre o navegador e acessa a url
browser = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chrome_options)
browser.get(url)

sleep(2)

# pesquisa o concurso no campo de busca
input = browser.find_element_by_id('buscaConcurso')
input.send_keys('1234')
# input.submit()

# aciona o enter
input.send_keys(u'\ue007') 

sleep(2)

# recebe o conteúdo da página
# soup = BeautifulSoup(browser.page_source, 'html5lib')
soup = BeautifulSoup(browser.page_source, 'html.parser')

# busca <h2> que contem o número e a data do concurso 
h2 = soup.find('h2')
span = h2.find('span', {'class' : 'ng-binding'})
number_date = span.string
print(number_date)

# busca <div> que contem os totais acumulado
div = soup.find('div', {'class': 'totals'})
totals = []
for total in div.find_all('span', {'class': 'value ng-binding'}):
    totals.append(total.string)
accumulated_special_raffle = totals[2]
print(accumulated_special_raffle)

exit()
