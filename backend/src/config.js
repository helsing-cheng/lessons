require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'change_this',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'teaching',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Cc123321',
    dialect: 'mysql'
  }
};
