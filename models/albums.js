module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Albums", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    }
  });
  return Todo;
};
