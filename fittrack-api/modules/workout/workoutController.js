const workoutService = require('./workoutService');
const { success } = require('../../middlewares/apiResponse');
const fs = require('fs');
const path = require('path');

exports.uploadWorkout = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    const workoutFile = req.files && req.files.workout ? req.files.workout[0] : null;
    const thumbnailFile = req.files && req.files.thumbnail ? req.files.thumbnail[0] : null;

    if (!workoutFile || !thumbnailFile) {
        const error = new Error('Envie o arquivo de vídeo e a imagem de capa.');
        error.status = 400;
        throw error;
    }

    const newWorkout = await workoutService.uploadWorkout(title, description, workoutFile, thumbnailFile, userId);

    return success(res, newWorkout, 'Treino enviado com sucesso!', 201);
};

exports.getWorkoutDetails = async (req, res) => {
    const workoutId = req.params.id;
    const currentUserId = req.user ? req.user.id : null;

    const { workout, isLiked } = await workoutService.getWorkoutDetails(workoutId, currentUserId);
    const isOwner = currentUserId === workout.userId;

    return success(res, { ...workout.toJSON(), isOwner, isLiked });
};


exports.streamWorkout = async (req, res) => {
    const workoutId = req.params.id;

    const workout = await workoutService.getWorkoutForStream(workoutId);

    const workoutPath = path.join(__dirname, '../../public/uploads/workout', workout.workoutPath);
    const stat = fs.statSync(workoutPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = (end - start) + 1;

        const file = fs.createReadStream(workoutPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'workout/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'workout/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(workoutPath).pipe(res);
    }
};

exports.getMyWorkouts = async (req, res) => {
    const userId = req.user.id;

    const workouts = await workoutService.getWorkoutByUser(userId);

    return success(res, workouts);
};


exports.getWorkoutForEdit = async (req, res) => {
    const workoutId = req.params.id;
    const userId = req.user.id;

    const workout = await workoutService.getWorkoutForEdit(workoutId, userId);

    return success(res, workout);
};


exports.updateWorkout = async (req, res) => {
    const workoutId = req.params.id;
    const userId = req.user.id;
    const { title, description } = req.body;
    const newThumbnailFile = req.file || null;

    const updatedWorkout = await workoutService.updateWorkout(workoutId, userId, title, description, newThumbnailFile);

    return success(res, updatedWorkout, 'Treino atualizado com sucesso!');
};


exports.deleteWorkout = async (req, res) => {
    const workoutId = req.params.id;
    const userId = req.user.id;

    await workoutService.deleteWorkout(workoutId, userId, false);

    return success(res, null, 'Treino excluído com sucesso.');
};