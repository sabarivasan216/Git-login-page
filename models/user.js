const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('nightingaleDB', 'root', 'Sabariv2004s',  {
    host: 'localhost',
    dialect: 'mysql',
});
const User = sequelize.define('User', {
    githubId: {
        type: DataTypes.STRING,
        unique: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
});

sequelize.sync(); // Creates table if not exists
module.exports = { User, sequelize };
