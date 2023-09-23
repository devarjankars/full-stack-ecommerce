const Sequelize = require('sequelize');

<<<<<<< HEAD
const sequelize = require('../util/database');
=======
const sequelize = require('../models/database');
>>>>>>> 6f4f473807613c8152570b2ac79e5bf9bc1b0e32

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
