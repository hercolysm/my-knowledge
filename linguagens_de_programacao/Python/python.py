
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
print not(a > b) # nao (logico)
print a << b # deslocamento de bits a direita 
print a >> b # deslocamento de bits a esquerda
print a & b  # operador bit a bit and
print a | b  # operador bit a bit or
print a ^ b  # operador bit a bit xor
print ~a     # operador bit a bit not
