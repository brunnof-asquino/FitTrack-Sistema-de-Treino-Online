const express = require('express');
const router = express.Router();
const commentController = require('./commentController');
const { commentValidator } = require('./commentValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/workouts/:workoutId/comments', isAuthenticated, commentValidator, asyncHandler(commentController.addComment));
router.get('/workouts/:workoutId/comments', asyncHandler(commentController.getComments));

module.exports = router;