const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL

export function getProfilePictureUrl(filename) {
    return `${UPLOADS_URL}/uploads/profiles/${filename}`
}

export function getWorkoutUrl(filename) {
    return `${UPLOADS_URL}/uploads/workout/${filename}`
}

export function getWorkoutThumbnailUrl(filename) {
    return `${UPLOADS_URL}/uploads/covers/${filename}`
}