# Python 3.10.5
# 
# Argumentos via linha de comando

import sys

# Link: https://www.geeksforgeeks.org/command-line-arguments-in-python/#:~:text=The%20arguments%20that%20are%20given%20after%20the%20name,Using%20getopt%20module%3B%20Using%20argparse%20module.%20Using%20sys.argv

# Total arguments
n = len(sys.argv)
print("Total arguments passed:", n)

# Arguments passed
print("Name of Python script:", sys.argv[0])

print("Arguments passed:", end = " ")
for i in range(1, n):
    print(sys.argv[i], end = " ")
