# Python 3.10.5
# 
# Gestão de diretórios

import os

# Get the current working directory (cwd)
cwd = os.getcwd()

# Get all the files in that directory
files = os.listdir(cwd)  
print("Files in %r: %s" % (cwd, files))

# Link: https://www.delftstack.com/howto/python/relative-path-in-python/

# Path file
absolutepath = os.path.abspath(__file__)
print(absolutepath)

# Get Path
fileDirectory = os.path.dirname(absolutepath)
print(fileDirectory)

# Path of parent directory
parentDirectory = os.path.dirname(fileDirectory)
print(parentDirectory)

# Navigate to Strings directory
newPath = os.path.join(parentDirectory, 'Ferramentas')   
print(newPath)

# Link: https://nono.ma/environment-variable-python-notebook-os-environ-get

# load the variables .env manually with this script.
env_vars = !cat ../script/.env
for var in env_vars:
    key, value = var.split('=')
    os.environ[key] = value

# Print variable FOO
print(os.environ.get('FOO'))
