const sequelize = require('../../config/database');
const Like = require('./likeModel');
const Workout = require('../workout/workoutModel');
const User = require('../user/userModel');

async function toggleLike(userId, workoutId) {
    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
        const error = new Error('Treino não encontrado.');
        error.status = 404;
        throw error;
    }

    const liked = await sequelize.transaction(async (t) => {
        const [like, created] = await Like.findOrCreate({
            where: { userId, workoutId: workout.id },
            defaults: { userId, workoutId: workout.id },
            transaction: t
        });

        if (created) {
            await workout.increment('likesCount', { transaction: t });
            return true;
        }

        await like.destroy({ transaction: t });
        await workout.decrement('likesCount', { transaction: t });
        return false;
    });

    await workout.reload();

    return { liked, likesCount: workout.likesCount };
}


async function checkLikeStatus(userId, workoutId) {
    const like = await Like.findOne({ where: { userId, workoutId } });
    return !!like;
}


async function getLikedWorkouts(userId) {
    const likes = await Like.findAll({
        where: { userId },
        include: [{
            model: Workout,
            include: [{
                model: User,
                attributes: ['id', 'username', 'fullName', 'profilePicture']
            }]
        }],
        order: [['createdAt', 'DESC']]
    });

    return likes.map((like) => like.Workout);
}


module.exports = { toggleLike, checkLikeStatus, getLikedWorkouts };