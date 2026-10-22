const commentService = require('./commentService');
const { success } = require('../../middlewares/apiResponse');

exports.addComment = async (req, res) => {
    const workoutId = req.params.workoutId;
    const userId = req.user.id;
    const { content } = req.body;

    const comment = await commentService.addComment(userId, workoutId, content);

    return success(res, comment, 'Comentário adicionado com sucesso!', 201);
};


exports.getComments = async (req, res) => {
    const workoutId = req.params.workoutId;

    const comments = await commentService.getCommentsByWorkoutId(workoutId);

    return success(res, comments);
};