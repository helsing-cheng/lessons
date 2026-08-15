const { Sequelize } = require('sequelize');
const config = require('../config').db;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize);
db.Course = require('./course')(sequelize);

db.User.hasMany(db.Course, { foreignKey: 'teacher_id' });
db.Course.belongsTo(db.User, { as: 'teacher', foreignKey: 'teacher_id' });

module.exports = db;
