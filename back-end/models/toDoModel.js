const { Sequelize } = require("sequelize/types");
const UserModel = require("./userModel");

const Model = Sequelize.Model;

class ToDo extends Model { }

const ToDoModel = ToDo.init({
    id: {
        type: DataTypes.INTEGER,
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
                const possibleToDoStatuses = ['ToDo', 'InProgress', 'InReview', 'Test', 'Done'],
                if (possibleToDoStatuses.indexOf(value) == -1) throw new Error('Invalid toDo status!')
            }
        }
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'todo',
});

module.exports = ToDoModel;