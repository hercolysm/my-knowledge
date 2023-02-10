# Python 2.7.16
# 
# Manipulacao de arquivos de texto

# open("nome_arquivo", "modo")
# w => write
# r => read
# a => appened

# Criar arquivo
arquivo = open("nome_arquivo.txt","w")
arquivo.close()

# escrever no arquivo com texto
arquivo = open("nome_arquivo.txt", "w")
arquivo.write("linha 1\n")
arquivo.write("linha 2\n")
arquivo.close()

# escrever no arquivo com array
texto = []
texto.append("linha 1\n")
texto.append("linha 2\n")
arquivo = open("nome_arquivo.txt", "w")
arquivo.writelines(texto)
arquivo.close()

# ler arquivo
arquivo = open("nome_arquivo.txt", "r")
texto = arquivo.read()
print texto
arquivo.close()

# ler arquivo linha a linha
arquivo = open("nome_arquivo.txt", "r")
texto = arquivo.readlines()
for linha in texto:
    print linha.rstrip()
#arquivo.close()

# alterar a posicao do ponteiro (read/write) 
arquivo.seek(0,2) 
# 0 => inicio
# 1 => posicao atual
# 2 => final do arquivo

# capturar a posicao atual do ponteiro (read/write)
tamanho = arquivo.tell()
print "Posicao:", tamanho

# ler arquivo por bytes
arquivo = open("nome_arquivo.txt", "r")
arquivo.seek(0,2)
tamanho = arquivo.tell()
arquivo.seek(0)
chunk = 1024
while arquivo.tell() < tamanho:
    buffer = arquivo.read(chunk)
    print "Posicao:", arquivo.tell(), " - Total:", tamanho
arquivo.close()
    

# Manipulando arquivos .csv
import csv

csv.register_dialect('myDialect', quoting=csv.QUOTE_ALL, skipinitialspace=True)

# Criar arquivo .csv
arquivo = open("nome_arquivo.csv","w")
arquivo.close()

# Escrever no arquivo .csv
dados = ('value1', 'value2', 'value3')
with open('nome_arquivo.csv', 'a') as file:
    writer = csv.writer(file, dialect='myDialect')
    writer.writerow(dados)
file.close()

# ler arquivo .csv
with open("nome_arquivo.csv") as file:
    reader = csv.reader(file, dialect='myDialect')
    for row in reader:
        value1 = row[0]
        value2 = row[1]
        value3 = row[2]
        print value1, value2, value3
file.close()


# Manipulando arquivos binarios
import pickle

# presenva o tipo do dado gravado

# escrever no arquivo binario
arquivo = open("nome_arquivo.dat", "wb")
for i in range(10):
    pickle.dump(i, arquivo)
arquivo.close()

# ler arquivo binario
arquivo = open("nome_arquivo.dat", "rb")
for i in range(10):
    n = pickle.load(arquivo)
    print n
arquivo.close()
