const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const bcrypt = require('bcrypt');

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  membership_type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
  },
  group_age: {
    type: DataTypes.STRING,
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = Customer;