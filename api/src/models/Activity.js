const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    /*id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },*/
    name: {
      type: DataTypes.STRING
    },
    dificulty:{
        type: DataTypes.ENUM('1','2','3','4','5')
    },
    duration:{
        type: DataTypes.INTEGER
    },
    season:{
        type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
    }
  });
};