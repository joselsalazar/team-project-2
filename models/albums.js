module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define("Album", {
    albumArt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 1000]
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    listen: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Album;
};
