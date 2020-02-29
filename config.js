const { Pool } = require('pg');
const isNotDev = !(process.env.NODE_ENV === 'dev');
const PORT = process.env.PORT || 3000;
// const local_DATABASE_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const local_DATABASE_URL = `postgres://dkjhzjihgexsxc:cf0c15616a5723c9c78965ccfa3ae9af24a5c01f0308bf44085d2198e827b7a5@ec2-52-73-247-67.compute-1.amazonaws.com:5432/dfkp7uel73i0km`;

const connectionString = process.env.DATABASE_URL || local_DATABASE_URL;
//console.log(`${process.env.DB_USER} isNotDev: ${isNotDev}`);
const pool = new Pool({
  connectionString: connectionString,
  ssl: isNotDev,
})
module.exports = { pool, PORT }