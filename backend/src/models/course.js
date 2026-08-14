const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT },
    teacher_id: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'courses',
    timestamps: false
  });
};
