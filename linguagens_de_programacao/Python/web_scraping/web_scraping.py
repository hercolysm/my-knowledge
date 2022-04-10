import requests 
from bs4 import BeautifulSoup 
from selenium import webdriver
from selenium.webdriver.chrome.options import Options 
from webdriver_manager.chrome import ChromeDriverManager 
from time import sleep

chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-dev-shm-usage')

# url = 'https://www.loteriasonline.caixa.gov.br/'
url = 'https://www.loteriasonline.caixa.gov.br/silce-web/#/termos-de-uso'

browser = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chrome_options)
browser.get(url)

# response = requests.get(url)
# soup = BeautifulSoup(response.content, 'html5lib')


print(browser.page_source)
sleep(5)
# soup = BeautifulSoup(browser.page_source, 'html5lib')
soup = BeautifulSoup(browser.page_source, 'html.parser')

print(soup)


