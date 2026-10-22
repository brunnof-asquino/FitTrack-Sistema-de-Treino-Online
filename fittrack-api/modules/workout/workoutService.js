const Workout = require('./workoutModel');
const User = require('../user/userModel');
const fs = require('fs');               
const path = require('path');            
const Like = require('../like/likeModel');                         
const Comment = require('../comment/commentModel');                 
const sequelize = require('../../config/database');                

async function uploadWorkout(title, description, workoutFile, thumbnailFile, userId) {
    const newWorkout = await Workout.create({
        title,
        description,
        workoutPath: workoutFile.filename,
        thumbnailPath: thumbnailFile.filename,
        userId
    });

    await User.increment('workoutsCount', { where: { id: userId } });

    return newWorkout;
}

async function getWorkoutDetails(workoutId, currentUserId = null) {
    const workout = await Workout.findByPk(workoutId, {
        include: [{
            model: User,
            attributes: ['id', 'username', 'fullName', 'profilePicture']
        }]
    });

    if (!workout) {
        const error = new Error('Treino não encontrado.');
        error.status = 404;
        throw error;
    }

    await workout.increment('views');
    await workout.reload();

    let isLiked = false;                                                                   
    if (currentUserId) {
        const existingLike = await Like.findOne({ where: { userId: currentUserId, workoutId: workout.id } });
        isLiked = !!existingLike;
    }

    return { workout, isLiked };                                                             
}


async function getWorkoutForStream(workoutId) {
    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
        const error = new Error('Treino não encontrado.');
        error.status = 404;
        throw error;
    }

    return workout;
}


async function getFeedWorkouts(page = 1, limit = 12) {
    const offset = (page - 1) * limit;

    const workouts = await Workout.findAll({
        include: [{
            model: User,
            attributes: ['id', 'username', 'fullName', 'profilePicture']
        }],
        order: [['createdAt', 'DESC']],
        offset,
        limit
    });

    return workouts;
}

async function getWorkoutByUser(userId) {
    return await Workout.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
    });
}

async function getWorkoutForEdit(workoutId, userId) {
    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
        const error = new Error('Treino não encontrado.');
        error.status = 404;
        throw error;
    }

    if (workout.userId !== userId) {
        const error = new Error('Você não tem permissão para editar este treino.');
        error.status = 403;
        throw error;
    }

    return workout;
}


async function updateWorkout(workoutId, userId, title, description, newThumbnailFile) {
    const workout = await getWorkoutForEdit(workoutId, userId);

    const oldThumbnailFilename = newThumbnailFile ? workout.thumbnailPath : null;

    workout.title = title;
    workout.description = description;

    if (newThumbnailFile) {
        workout.thumbnailPath = newThumbnailFile.filename;
    }

    await workout.save();

    if (oldThumbnailFilename) {
        const oldThumbnailPath = path.join(__dirname, '../../public/uploads/covers', oldThumbnailFilename);
        fs.unlink(oldThumbnailPath, (err) => {
            if (err) console.error('Erro ao apagar capa antiga:', err);
        });
    }

    return workout;
}


async function deleteWorkout(workoutId, requestingUserId, isAdmin = false) {
    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
        const error = new Error('Treino não encontrado.');
        error.status = 404;
        throw error;
    }

    if (!isAdmin && workout.userId !== requestingUserId) {
        const error = new Error('Você não tem permissão para excluir este treino.');
        error.status = 403;
        throw error;
    }

    await sequelize.transaction(async (t) => {
        await Like.destroy({ where: { workoutId: workout.id }, transaction: t });
        await Comment.destroy({ where: { workoutId: workout.id }, transaction: t });
        await workout.destroy({ transaction: t });
        await User.decrement('workoutsCount', { where: { id: workout.userId }, transaction: t });
    });

    const workoutFilePath = path.join(__dirname, '../../public/uploads/workout', workout.workoutPath);
    const thumbnailFilePath = path.join(__dirname, '../../public/uploads/covers', workout.thumbnailPath);

    [workoutFilePath, thumbnailFilePath].forEach((filePath) => {
        fs.unlink(filePath, (err) => {
            if (err) console.error('Erro ao apagar arquivo do treino excluído:', err);
        });
    });
}

module.exports = { uploadWorkout, getWorkoutDetails, getWorkoutForStream, getFeedWorkouts, getWorkoutByUser, getWorkoutForEdit, updateWorkout, deleteWorkout };