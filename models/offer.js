const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Offer extends Model {}

Offer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 40]
            }
        },
        content: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        date_available: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        location: {
            type: DataTypes.STRING(1000),
        },
        crop: {
            type: DataTypes.STRING(1000),
        },
        quantity: {
            type: DataTypes.STRING(1000),
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        modelName: "user"
    }
)

module.exports = Offer;