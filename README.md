Prerequisites:
    -postgres service running locally
    -node installed
    -npm installed

To run locally 

create a .env file in the root of your project

add the following variables to your .env file using your own database credentials 

DB_USER = "db_user"
DB_PASSWORD = "db_pass"
DB_HOST="host"
DB_PORT = port
DB_DATABASE = "db"

PORT = port 
NODE_ENV = "dev"

run npm install

Finally run the following:

npm run local
