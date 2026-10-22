<script setup>
import { ref, onMounted } from 'vue'
import { getMyWorkouts, deleteWorkout } from '../services/workoutService'
import { useAuth } from '../composables/useAuth'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import BaseModal from '../components/base/BaseModal.vue'

const { currentUser } = useAuth()

const workouts = ref([])
const isLoading = ref(true)
const apiErrorMessage = ref('')

const workoutToDelete = ref(null)
const isDeleting = ref(false)
const deleteErrorMessage = ref('')

onMounted(async () => {
    try {
        const response = await getMyWorkouts()
        workouts.value = response.data
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
})

function askDelete(workout) {
    deleteErrorMessage.value = ''
    workoutToDelete.value = workout
}

function cancelDelete() {
    workoutToDelete.value = null
}

async function confirmDelete() {
    isDeleting.value = true
    deleteErrorMessage.value = ''

    try {
        await deleteWorkout(workoutToDelete.value.id)
        workouts.value = workouts.value.filter((workout) => workout.id !== workoutToDelete.value.id)
        workoutToDelete.value = null
    } catch (error) {
        deleteErrorMessage.value = error.message
    } finally {
        isDeleting.value = false
    }
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold mb-0">Meus Treinos</h4>
            <router-link :to="{ name: 'workout-upload' }" class="btn btn-primary rounded-pill px-4">
                <i class="bi bi-plus-lg"></i> Novo treino
            </router-link>
        </div>

        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
        <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>

        <template v-else>
            <div v-if="workouts.length === 0" class="alert alert-info text-center">
                Você ainda não enviou nenhum treino.
                <router-link :to="{ name: 'workout-upload' }">Envie o primeiro agora</router-link>.
            </div>

            <div v-else class="row g-4">
                <div v-for="workout in workouts" :key="workout.id" class="col-6 col-md-4 col-lg-3">
                    <WorkoutCard :workout="workout" :author="currentUser">
                        <template #actions>
                            <div class="d-flex gap-2 mt-3">
                                <router-link :to="{ name: 'workout-edit', params: { id: workout.id } }"
                                    class="btn btn-sm btn-outline-secondary flex-fill">
                                    <i class="bi bi-pencil"></i> Editar
                                </router-link>
                                <button type="button" class="btn btn-sm btn-outline-danger flex-fill"
                                    @click="askDelete(workout)">
                                    <i class="bi bi-trash"></i> Excluir
                                </button>
                            </div>
                        </template>
                    </WorkoutCard>
                </div>
            </div>
        </template>

        <BaseModal v-if="workoutToDelete" title="Excluir treino" :busy="isDeleting" @close="cancelDelete">
            <p class="mb-0">
                Tem certeza que deseja excluir <strong>{{ workoutToDelete.title }}</strong>?
                Essa ação não pode ser desfeita.
            </p>
            <p v-if="deleteErrorMessage" class="text-danger small mt-3 mb-0">{{ deleteErrorMessage }}</p>

            <template #footer>
                <button type="button" class="btn btn-secondary" :disabled="isDeleting" @click="cancelDelete">
                    Cancelar
                </button>
                <button type="button" class="btn btn-danger" :disabled="isDeleting" @click="confirmDelete">
                    {{ isDeleting ? 'Excluindo...' : 'Excluir' }}
                </button>
            </template>
        </BaseModal>
    </div>
</template>