const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Comment = sequelize.define('Comment',
    {
        id:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        content: { type: DataTypes.TEXT, allowNull: false },
        userId:  { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
        workoutId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'workouts', key: 'id' } }
    },
    {
        timestamps: true,
        tableName: 'comments',
        indexes: [
            { fields: ['workout_id'], name: 'idx_comments_workout_id' }
        ]
    }
);

module.exports = Comment;