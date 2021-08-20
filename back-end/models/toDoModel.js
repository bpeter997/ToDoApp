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
    },
    deadline: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isValid(deadline) {
                let deadlineDate = new Date(deadline);
                if (deadlineDate <= new Date(Date.now())) throw new Error('Deadline must be later then the actual date!')
            }
        }
    }
}, {
    timestamps: false,
    sequelize: db,
    modelName: 'ToDos',
});

// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

module.exports = ToDoModel;