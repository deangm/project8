Prerequisites:
    -postgres service running locally
    -node installed
    -npm installed

To run locally 

create a .env file in the root of your project

add the following variables to your .env file using your own database credentials 

DB_USER = "Your_db_username"
DB_PASSWORD = "your_db_pass"
DB_HOST="localhost"
DB_PORT = 5432 or your port
DB_DATABASE = "your_database"

PORT = 3000
NODE_ENV = "dev"

run npm install

Finally run the following:

npm run local
