# Python 3.10.5
# 
# MySQL

# Link: https://www.mysqltutorial.org/python-mysql-query/

import mysql.connector 

# conecta com o servidor
conn =  mysql.connector.connect(
    host = '127.0.0.1',
    port = '3306',
    user = 'root',
    password = '1q2w3e4r',
    database = 'goodluck'
)

# prepara query
query = conn.cursor()

lottery_name = 'lotofacil'

# realiza consulta
query.execute('SELECT id, selectable_numbers, winning_hits FROM lotteries WHERE name_id = "' + lottery_name + '" ')

# lê a primeira linha retornada
row = query.fetchone()

lottery_id = row[0]
selectable_numbers = row[1]
winning_hits = row[2]

print(lottery_id, selectable_numbers, winning_hits)

# realiza consulta
query.execute('SELECT hits, value FROM prices WHERE lottery_id = "' + str(lottery_id) + '" ')

# lê todas as linhas retornadas
rows = query.fetchall()

print('Total de linhas: ', query.rowcount)

lottery_prices = dict()

for row in rows:
    lottery_prices[row[0]] = row[1]
    
print(lottery_prices)

# insere registro na tabela
sql_insert = 'INSERT INTO contests (number, date, total_collection, premium_estimate, accumulated_special_raffle, lottery_id, selectable_numbers, winning_hits, saved_result) VALUES ("0", "0", "0", "0", "0", "1", "15", "1", "1")'
query.execute(sql_insert)
conn.commit()
print(query.rowcount, 'linha(s) inserida(s)')
contest_id = query.lastrowid 

# fecha a conexao
conn.close()
