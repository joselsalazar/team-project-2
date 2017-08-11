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

  Album.associate = function(models) {
    Album.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Album;
};
