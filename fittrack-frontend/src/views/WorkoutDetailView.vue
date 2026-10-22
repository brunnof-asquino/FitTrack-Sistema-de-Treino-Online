<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getWorkoutById } from '../services/workoutService'
import { getWorkoutUrl, getWorkoutThumbnailUrl, getProfilePictureUrl } from '../utils/media'
import LikeButton from '../components/workout/LikeButton.vue'
import CommentSection from '../components/workout/CommentSection.vue'

const route = useRoute()

const workout = ref(null)
const isLoading = ref(true)
const apiErrorMessage = ref('')

async function loadWorkout() {
    isLoading.value = true
    apiErrorMessage.value = ''
    workout.value = null

    try {
        const response = await getWorkoutById(route.params.id)
        workout.value = response.data
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
}

onMounted(loadWorkout)

watch(() => route.params.id, loadWorkout)
</script>

<template>
    <div class="container mt-4">
        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
        <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>

        <div v-else-if="workout" class="row">
            <div class="col-12 col-lg-4 d-flex justify-content-center">
                <div class="workout-player-container mb-4">
                    <video controls class="w-100 h-100" :poster="getWorkoutThumbnailUrl(workout.thumbnailPath)">
                        <source :src="getWorkoutUrl(workout.workoutPath)" type="workout/mp4" />
                        Seu navegador não suporta a tag de vídeo.
                    </video>
                </div>
            </div>

            <div class="col-12 col-lg-8">
                <h1 class="h4 fw-bold mb-2">{{ workout.title }}</h1>

                <div class="d-flex align-items-center mb-3">
                    <router-link :to="{ name: 'public-profile', params: { username: workout.User.username } }"
                        class="d-flex align-items-center text-decoration-none text-dark">
                        <img :src="getProfilePictureUrl(workout.User.profilePicture)" :alt="workout.User.username"
                            class="rounded-circle me-2" width="40" height="40" style="object-fit: cover;" />
                        <div>
                            <h6 class="mb-0">{{ workout.User.fullName }}</h6>
                            <small class="text-muted">@{{ workout.User.username }}</small>
                        </div>
                    </router-link>
                    <span class="ms-auto text-muted small">{{ workout.views }} visualizações</span>
                </div>

                <div class="d-flex align-items-start gap-2 mb-3">
                    <LikeButton :workout-id="workout.id" :initial-liked="workout.isLiked"
                        :initial-count="workout.likesCount" />

                    <router-link v-if="workout.isOwner" :to="{ name: 'workout-edit', params: { id: workout.id } }"
                        class="btn btn-outline-secondary rounded-pill">
                        <i class="bi bi-pencil"></i> Editar
                    </router-link>
                </div>

                <div class="card shadow-sm">
                    <div class="card-body">
                        <p class="card-text mb-0">{{ workout.description || 'Sem descrição.' }}</p>
                    </div>
                </div>

                <CommentSection :workout-id="workout.id" />
            </div>
        </div>
    </div>
</template>