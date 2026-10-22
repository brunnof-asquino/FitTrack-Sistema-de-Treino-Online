import api from './api'


export function toggleLike(workoutId) {
    return api.post(`/workouts/${workoutId}/toggle-like`)
}


export function getLikedWorkouts() {
    return api.get('/liked-workouts')
}