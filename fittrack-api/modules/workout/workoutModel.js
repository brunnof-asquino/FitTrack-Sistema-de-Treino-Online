const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Workout = sequelize.define('Workout',
    {
        id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title:         { type: DataTypes.STRING(100), allowNull: false },
        description:   { type: DataTypes.TEXT, allowNull: true },
        workoutPath:   { type: DataTypes.STRING, allowNull: false },
        thumbnailPath: { type: DataTypes.STRING, allowNull: false },
        views:         { type: DataTypes.INTEGER, defaultValue: 0 },
        likesCount:    { type: DataTypes.INTEGER, defaultValue: 0 },      
        commentsCount: { type: DataTypes.INTEGER, defaultValue: 0 }, 
        userId:        { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } }
    },
    {
        timestamps: true,
        tableName: 'workouts',
        indexes: [
            { fields: ['user_id'], name: 'idx_workouts_user_id' }
        ]
    }
);

module.exports = Workout;