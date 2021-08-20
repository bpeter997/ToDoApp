const { Sequelize } = require("sequelize");
const UserModel = require("./userModel");
const db = require('../database');

const Model = Sequelize.Model;

class ToDo extends Model { }

const ToDoModel = ToDo.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    todo: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    responsible: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
            model: UserModel,
            key: 'email'
        }
    },
    status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            isToDoStatus(value) {
                const possibleToDoStatuses = ['ToDo', 'InProgress', 'InReview', 'Test', 'Done'];
                if (possibleToDoStatuses.indexOf(value) == -1) throw new Error('Invalid toDo status!')
            }
        }
    }
}, {
    timestamps: false,
    sequelize: db,
    modelName: 'ToDos',
});

module.exports = ToDoModel;