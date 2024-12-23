import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const UserTracker = sequelize.define('user_tracker', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export const TodoTracker = sequelize.define('todo_tracker', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finish: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

UserTracker.hasMany(TodoTracker);
TodoTracker.belongsTo(UserTracker);


UserTracker.sync().catch((error) => console.error("UserTracker sync error:", error));
TodoTracker.sync().catch((error) => console.error("TodoTracker sync error:", error));

export const TodoWithoutTimeTracker = sequelize.define('todo_without_time_tracker', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

UserTracker.hasMany(TodoTracker);
TodoWithoutTimeTracker.belongsTo(UserTracker);
TodoWithoutTimeTracker.sync().catch((error) => console.error("TodoWithoutTime sync error", error));

