// import pkg from 'pg';
// const { Pool } = pkg;
// import dotenv from 'dotenv';

// dotenv.config();

// const db = new Pool({
//     connectionString: process.env.DB_URL,
//     ssl: { rejectUnauthorized: false } 
// });

// export default db;

// import { Pool } from 'pg';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Set up the SSL configuration conditionally based on the environment
const sslConfig = process.env.NODE_ENV === 'production'
  ? { rejectUnauthorized: false }  // Use SSL in production (Render)
  : false;  // Disable SSL locally

// Create a new Pool with the connection string and conditional SSL
const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: sslConfig
});

// Export the database connection
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