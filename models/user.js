const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        bio: {
            type: DataTypes.STRING(1000),
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        hooks: {
            async beforeBulkCreate(newUserData) {
                for (const user of newUserData) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
            beforeUpdate: async (updatedUserData) => {
                if (updatedUserData.password) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                }
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)



module.exports = User;