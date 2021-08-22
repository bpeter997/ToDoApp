const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../database');
const UserRoles = require('../consts/userRoles');

const { Model } = Sequelize;

class User extends Model {
  async correctPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
}
const UserModel = User.init(
  {
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    role: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        isUserRole(value) {
          if (value !== UserRoles.ADMIN && value !== UserRoles.USER)
            throw new Error('Only admin and user allowed!');
        }
      }
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: [8, 50]
      }
    },
    profile_picture: {
      type: Sequelize.STRING(50),
      defaultValue: 'default.jpg'
    }
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'Users'
  }
);

User.beforeCreate(async user => {
  const hashedPassWord = await bcrypt.hash(
    user.password,
    bcrypt.genSaltSync(8)
  );
  user.password = hashedPassWord;
});

module.exports = UserModel;
