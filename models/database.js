const Sequelize =require('sequelize')

const sequelize=new Sequelize('node-f','root','sanjay',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;
