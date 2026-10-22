const sequelize = require('../../config/database');
const Comment = require('./commentModel');
const Workout = require('../workout/workoutModel');
const User = require('../user/userModel');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function findWorkoutOrFail(workoutId) {
    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
        const error = new Error('Treino não encontrado.');
        error.status = 404;
        throw error;
    }

    return workout;
}


async function addComment(userId, workoutId, content) {
    const workout = await findWorkoutOrFail(workoutId);

    const comment = await sequelize.transaction(async (t) => {
        const created = await Comment.create({ userId, workoutId: workout.id, content }, { transaction: t });
        await workout.increment('commentsCount', { transaction: t });
        return created;
    });

    return await Comment.findByPk(comment.id, {
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }]
    });
}


async function getCommentsByWorkoutId(workoutId) {
    const workout = await findWorkoutOrFail(workoutId);

    return await Comment.findAll({
        where: { workoutId: workout.id },
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }],
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });
}


module.exports = { addComment, getCommentsByWorkoutId };