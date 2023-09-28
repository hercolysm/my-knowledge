# versão do python
python --version
python3 --version

# instalador de pacotes do python
apt-get update
apt-get install python-pip # python 2
apt-get install python3-pip # python 3

pip -> python -m pip
pip3 -> python3 -m pip

# instalar requests 
pip install requests # python 2
pip3 install requests # python 3

pip install beautifulsoup4 # python 2
pip3 install beautifulsoup4 # python 3

pip install selenium # python 2
pip3 install selenium # python 3

pip install webdriver-manager # python 2
pip3 install webdriver-manager # python 3

pip install html5lib # python 2
pip3 install html5lib # python 3

# instalar pacotes pelo arquivo
pip install -r file.txt 

# instalar chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb
apt-get -f install

# desinstalar chrome
dpkg -r google-chrome-stable
dpkg -p google-chrome-stable

# listar pacotes instalados
dpkg -l

# procurar pacotes pelo nome
dpkg -s chrom

# procurar por nome
find / -name *chrom*
