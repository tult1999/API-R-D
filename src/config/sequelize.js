const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fnb', 'postgres', 'postgres', {
  host: 'postgres_db', // Or '127.0.0.1' for local installation
  dialect: 'postgres',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;