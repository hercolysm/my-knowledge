# Python 3.10.5
# 
# Data e hora

from datetime import datetime

# Link: https://docs.python.org/3/library/datetime.html

# convert date string to date
date_string = '31/12/2021'
date = datetime.strptime(date_string, '%d/%m/%Y')
date = date.strftime('%Y-%m-%d')
print(date) # 2021-12-31

# convert datetime string to datetime
datetime_string = '31/12/2021 12:01:02'
date_time = datetime.strptime(datetime_string, '%d/%m/%Y  %H:%M:%S')
date_time = date_time.strftime('%Y-%m-%d  %H:%M:%S')
print(date_time) # 2021-12-31 12:01:02

