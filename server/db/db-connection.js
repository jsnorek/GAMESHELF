import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false } 
});

export default db;

// import pkg from 'pg';
// const { Pool } = pkg;
// import dotenv from 'dotenv';

// dotenv.config();

// let connectionString;
// let sslConfig = false;

// // Determine which database connection to use
// if (process.env.DB_LOCAL) {
//     connectionString = process.env.DB_LOCAL;
// } else {
//     connectionString = process.env.DB_URL;
//     sslConfig = { rejectUnauthorized: false };
// }

// const db = new Pool({
//     connectionString: connectionString,
//     ssl: sslConfig
// });

// export default db;