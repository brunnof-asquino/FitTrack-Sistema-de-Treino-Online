const express = require('express');
const router = express.Router();
const workoutController = require('./workoutController');
const { uploadValidator } = require('./workoutValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const { optionalAuth } = require('../../middlewares/optionalAuth');
const workoutMulter = require('../../middlewares/workoutMulter');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post(
    '/workout/upload',
    isAuthenticated,
    workoutMulter.fields([
        { name: 'workout', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ]),
    uploadValidator,
    asyncHandler(workoutController.uploadWorkout)
);

router.get('/workouts/:id/stream', isAuthenticated, asyncHandler(workoutController.streamWorkout));
router.get('/workouts/:id', optionalAuth, asyncHandler(workoutController.getWorkoutDetails));
router.get('/my-workouts', isAuthenticated, asyncHandler(workoutController.getMyWorkouts));           

router.get('/workouts/:id/edit', isAuthenticated, asyncHandler(workoutController.getWorkoutForEdit)); 

router.put(                                                                                    
    '/workouts/:id',
    isAuthenticated,
    workoutMulter.single('thumbnail'),
    uploadValidator,
    asyncHandler(workoutController.updateWorkout)
);

router.delete('/workouts/:id', isAuthenticated, asyncHandler(workoutController.deleteWorkout));       

module.exports = router;