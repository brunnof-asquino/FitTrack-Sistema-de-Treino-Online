const likeService = require('./likeService');
const { success } = require('../../middlewares/apiResponse');

exports.toggleLike = async (req, res) => {
    const workoutId = req.params.workoutId;
    const userId = req.user.id;

    const result = await likeService.toggleLike(userId, workoutId);

    if (result.liked) {
        return success(res, result, 'Treino curtido.', 201);
    }
    return success(res, result, 'Curtida removida.');
};


exports.checkLikeStatus = async (req, res) => {
    const workoutId = req.params.workoutId;
    const userId = req.user.id;

    const liked = await likeService.checkLikeStatus(userId, workoutId);

    return success(res, { liked });
};


exports.getLikedWorkouts = async (req, res) => {
    const userId = req.user.id;

    const workouts = await likeService.getLikedWorkouts(userId);

    return success(res, workouts);
};