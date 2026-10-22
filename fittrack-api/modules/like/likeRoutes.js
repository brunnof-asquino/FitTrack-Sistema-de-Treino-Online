const express = require('express');
const router = express.Router();
const likeController = require('./likeController');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/workouts/:workoutId/toggle-like', isAuthenticated, asyncHandler(likeController.toggleLike));
router.get('/workouts/:workoutId/like-status', isAuthenticated, asyncHandler(likeController.checkLikeStatus));
router.get('/liked-workouts', isAuthenticated, asyncHandler(likeController.getLikedWorkouts));

module.exports = router;