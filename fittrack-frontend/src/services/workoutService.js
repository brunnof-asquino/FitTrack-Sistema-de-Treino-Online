import api from './api'

export function uploadWorkout(formData, onUploadProgress) {
    return api.post('/workout/upload', formData, {
        headers: { 'Content-Type': undefined },
        onUploadProgress,
    })
}

export function getWorkoutById(id) {
    return api.get(`/workouts/${id}`)
}

export function getMyWorkouts() {
    return api.get('/my-workouts')
}

export function getWorkoutForEdit(id) {
    return api.get(`/workouts/${id}/edit`)
}

export function updateWorkout(id, formData) {
    return api.put(`/workouts/${id}`, formData, {
        headers: { 'Content-Type': undefined },
    })
}

export function deleteWorkout(id) {
    return api.delete(`/workouts/${id}`)
}