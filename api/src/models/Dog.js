const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Height_Min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Height_Max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Weight_Min: {
      type: DataTypes.INTEGER,
      allowNull: false  
    },
    Weight_Max: {
      type: DataTypes.INTEGER,
      allowNull: false  
    },
    YearsOfLife:{
      type: DataTypes.INTEGER,
      allowNull: false    
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CreateDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false
  });
};
