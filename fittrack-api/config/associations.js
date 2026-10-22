const User = require('../modules/user/userModel');
const Workout = require('../modules/workout/workoutModel');
const Like = require('../modules/like/likeModel');                
const Comment = require('../modules/comment/commentModel');  

User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Like, { foreignKey: 'userId' });                       
Like.belongsTo(User, { foreignKey: 'userId' });
Workout.hasMany(Like, { foreignKey: 'workoutId' });
Like.belongsTo(Workout, { foreignKey: 'workoutId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Workout.hasMany(Comment, { foreignKey: 'workoutId' });
Comment.belongsTo(Workout, { foreignKey: 'workoutId' });         