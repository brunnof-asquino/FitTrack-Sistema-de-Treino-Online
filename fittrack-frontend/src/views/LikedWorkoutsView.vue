<script setup>
import { ref, onMounted } from 'vue'
import { getLikedWorkouts } from '../services/likeService.js'
import WorkoutCard from '../components/workout/WorkoutCard.vue'

const workouts = ref([])
const isLoading = ref(true)
const apiErrorMessage = ref('')

onMounted(async () => {
    try {
        const response = await getLikedWorkouts()
        workouts.value = response.data
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div>
        <h4 class="fw-bold mb-4">Treinos Curtidos</h4>

        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
        <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>

        <template v-else>
            <div v-if="workouts.length === 0" class="alert alert-info text-center">
                Você ainda não curtiu nenhum treino.
                <router-link :to="{ name: 'feed-all' }">Explore o Feed</router-link>.
            </div>

            <div v-else class="row g-4">
                <div v-for="workout in workouts" :key="workout.id" class="col-6 col-md-4 col-lg-3">
                    <WorkoutCard :workout="workout" />
                </div>
            </div>
        </template>
    </div>
</template>