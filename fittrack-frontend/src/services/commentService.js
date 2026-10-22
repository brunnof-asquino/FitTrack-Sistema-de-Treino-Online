import api from './api'


export function getComments(workoutId) {
    return api.get(`/workouts/${workoutId}/comments`)
}


export function addComment(workoutId, content) {
    return api.post(`/workouts/${workoutId}/comments`, { content })
}