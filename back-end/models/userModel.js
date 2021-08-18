const { Sequelize } = require("sequelize/types");
const bcrypt = require('bcryptjs');

const Model = Sequelize.Model;

class User extends Model { }
const UserModel = User.init({
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        validate: {
            isEmail: true,
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
                if (value !== 'admin' && value !== 'user') throw new Error('Only admin and user allowed!');
            }
        }
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    profile_picture: {
        type: Sequelize.STRING(50)
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'user',
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }

});

module.exports = UserModel;