import mysql.connector
from faker import Faker
fake = Faker()

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="srshah",
  database="project_gallery_local"
)


mycursor = mydb.cursor()
counter = 0
try:
  for i in range(1000):
    profile = fake.profile()
    sql = "INSERT INTO project_gallery_local.users (user_name, name, email, password) VALUES (%s, %s, %s, %s);"
    val = (profile['username'], profile['name'], profile['mail'], "abcdefg")
    mycursor.execute(sql, val)
    mydb.commit()
    counter += 1
    
finally:
  print(counter, "record inserted.")



