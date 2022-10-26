const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('temperament', {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    }
)};

