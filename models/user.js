'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Wasap broh unique"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Harus email nich boss formatnya"
        },
        notNull: {
          msg: "Email harus ada boss"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Passwordnya mana???"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Staff"
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        // Ini jalan sebelum User.create selesai
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};