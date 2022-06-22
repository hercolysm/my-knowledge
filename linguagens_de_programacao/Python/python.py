# Python 2.7.16
# 
# Recursos básicos da linguagem Python

# identificar o tipo de um valor
print type(1)     # int
print type(1.0)   # float
print type('1')   # str
print type(True)  # bool
print type([])    # list
print type({})    # dict
print type(())    # tuple

a = 4
b = 3

# operadores aritmeticos
print a + b  # adicao
print a - b  # subtracao
print a * b  # multiplicacao
print a / b  # divisao (reais)
print a // b # divisao (inteiros)
print a ** b # exponenciacao
print a % b  # modulo

# operadores relacionais
print a > b  # maior que
print a < b  # menor que
print a >= b # maior ou igual que
print a <= b # menor ou igual que
print a == b # igualdade
print a != b # diferenca
print a > b and a < b # e (logico)
print a > b or a < b  # ou (logico)
print a is b # mesmo que
print a is not b # nao e o mesmo maior_que_zero
print not(a > b) # nao (logico)
print a << b # deslocamento de bits a direita 
print a >> b # deslocamento de bits a esquerda
print a & b  # operador bit a bit and
print a | b  # operador bit a bit or
print a ^ b  # operador bit a bit xor
print ~a     # operador bit a bit not

# calcula a raiz quadrada de cada elemento da lista
import math
lista1 = [1, 4, 9, 16, 25]
lista2 = map(math.sqrt, lista1)
print lista2

# aplica filtro em uma lista
def maior_que_zero(numero):
	return numero > 0
lista1 = [-11, -9, -1, 0 , 1, 9, 11]
lista2 = filter(maior_que_zero, lista1)
print lista2

# aplica funcao a uma lista agregando todos em um unico valor
lista1 = [1, 2, 3, 4, 5]
soma = reduce(lambda x, y: x + y, lista1)
print soma

# concatenar string
print 'Nome' + ' ' + 'Sobrenome'

# entrada de dados
#entrada = raw_input('Digite algo: ')
#print 'Voce digitou: ' + entrada

# converter para inteiros
valor1 = '1'
valor2 = '2'
print int(valor1) + int(valor2)

# converter para float
valor1 = '1'
valor2 = '2'
print float(valor1) + float(valor2)

# converter para string
valor1 = 1
valor2 = 2
print str(valor1) + str(valor2)

# operadores booleanas de string-in
num1 = 1
num2 = 5.5
str1 = 'abc'
print '%d' % num1
print '%2.2f' % num2
print '%s' % str1

# case sensitive
str1 = 'Ana'
str2 = 'ana'
print str1 == str2

# maiuscula
print str1.upper() 

# minuscula
print str1.lower()

# quantidade de digitos
print len(str1)

# quantidade de ocorrencias
print str2.count('a')

# posicao da primeira ocorrencia (-1 se nao encontrar)
print str2.find('m')

# estruturas de controle

# if - elif - else
if a > b:
	print a, 'e maior que', b
elif a < b:
	print a, 'e menor que', b
else:
	print a, 'e igual a', b

# try - except - else - finally
try:
	print 'tentando...'
except Exception as e:
	print 'erro', e
else:
	print 'else...'
finally:
	print 'finalizado...'

# for
for x in xrange(5,8):
	print x,

# while
cont = 0
while (cont < 4):
	print cont
	cont = cont + 1

# lista
lista1 = [1, 2, 3]
lista1.append(4)
print lista1

print min(lista1)
print max(lista1)

# dicionario
dict1 = dict([(1, 'um'), (2, 'dois')])
print 'dict1[1] = ' + dict1[1]
print 'dict1[2] = ' + dict1[2]

dict1 = dict()
word = "dicionario de dados"
for x in word:
	if x not in dict1:
		dict1[x] = 1
	else:
		dict1[x] += 1
print dict1

# dicionario de tuplas
dict1 = {'a': 1, 'b': 2, 'c': 3}
lista_tuplas = dict1.items()
print lista_tuplas

# ordena dicionario pelo indice
lista_tuplas.sort()
print lista_tuplas

# percorre chaves e valores do dicionario
for key, val in dict1.items():
	print key, val

# tuplas como chave do dicionario
directory = dict()
for x in xrange(1, 4):
	for y in xrange(1, 4):
		directory[x, y] = x + y

# setando um valor
directory[1, 2] = -1

# exibindo os valores
for last, first in directory:
	print first, last, directory[last, first]

# chaves do dicionario
lista_keys = dict1.keys()
print lista_keys

# valores do dicionario
lista_values = dict1.values()
print lista_values

# split
data = '2019-06-01'
lista1 = data.split('-')
ano = lista1[0]
mes = lista1[1]
dia = lista1[2]
print dia + '/' + mes + '/' + ano

import string

fname = raw_input('Digite o nome do arquivo: ')
try:
	fhand = open(fname)
except Exception as e:
	print 'Erro ao abrir o arquivo...'
	print e
	exit()

# contagem de ocorrencias de cada palavra no arquivo
counts = dict()
for line in fhand:
	line = line.translate(None, string.punctuation)
	line = line.lower()
	words = line.split()
	for word in words:
		if word in words:
			if word not in counts:
				counts[word] = 1
			else:
				counts[word] += 1

print counts

# tuplas
tupla1 = 'a', 'b', 'c'
tupla2 = ('a', 'b', 'c')
tupla3 = ('a',)
tupla4 = tuple()
print type(tupla1)
print type(tupla2)
print type(tupla3)
print type(tupla4)

print tupla1
print tupla1[0]
print tupla1[1:2]
