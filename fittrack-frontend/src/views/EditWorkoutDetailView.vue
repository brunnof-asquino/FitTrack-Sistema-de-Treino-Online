<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getWorkoutForEdit, updateWorkout } from '../services/workoutService'
import { getWorkoutThumbnailUrl } from '../utils/media'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import FormCard from '../components/base/FormCard.vue'

const TITLE_MAX = 100
const DESCRIPTION_MAX = 500

const route = useRoute()

const form = reactive({
    title: '',
    description: '',
})

const errors = reactive({
    title: '',
    description: '',
})

const thumbnailInputRef = ref(null)
const selectedThumbnail = ref(null)
const thumbnailPreviewUrl = ref('')

const isLoading = ref(true)
const isSubmitting = ref(false)
const loadErrorMessage = ref('')
const apiErrorMessage = ref('')
const successMessage = ref('')

const descriptionCharsRemaining = computed(() => DESCRIPTION_MAX - form.description.length)

onMounted(async () => {
    try {
        const response = await getWorkoutForEdit(route.params.id)
        const workout = response.data

        form.title = workout.title
        form.description = workout.description || ''
        thumbnailPreviewUrl.value = getWorkoutThumbnailUrl(workout.thumbnailPath)
    } catch (error) {
        loadErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
})

function handleThumbnailChange(event) {
    const file = event.target.files[0]
    if (!file) {
        return
    }

    selectedThumbnail.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
        thumbnailPreviewUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
}

function validate() {
    errors.title = ''
    errors.description = ''

    if (!form.title.trim()) {
        errors.title = 'O título é obrigatório.'
    } else if (form.title.length > TITLE_MAX) {
        errors.title = `O título deve ter no máximo ${TITLE_MAX} caracteres.`
    }

    if (form.description.length > DESCRIPTION_MAX) {
        errors.description = `A descrição deve ter no máximo ${DESCRIPTION_MAX} caracteres.`
    }

    return errors.title === '' && errors.description === ''
}

async function handleSubmit() {
    apiErrorMessage.value = ''
    successMessage.value = ''

    if (!validate()) {
        return
    }

    isSubmitting.value = true

    const formData = new FormData()
    formData.append('title', form.title.trim())
    formData.append('description', form.description.trim())
    if (selectedThumbnail.value) {
        formData.append('thumbnail', selectedThumbnail.value)
    }

    try {
        const response = await updateWorkout(route.params.id, formData)

        thumbnailPreviewUrl.value = getWorkoutThumbnailUrl(response.data.thumbnailPath)
        selectedThumbnail.value = null
        if (thumbnailInputRef.value) thumbnailInputRef.value.value = ''

        successMessage.value = 'Treino atualizado com sucesso!'
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <FormCard title="Editar Treino">
        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

        <div v-else-if="loadErrorMessage" class="text-center">
            <p class="text-danger">{{ loadErrorMessage }}</p>
            <router-link :to="{ name: 'my-workouts' }" class="btn btn-outline-secondary">
                Voltar para Meus Treinos
            </router-link>
        </div>

        <form v-else @submit.prevent="handleSubmit">
            <BaseInput label="Título do Treino" v-model="form.title" :error="errors.title" :disabled="isSubmitting" />

            <BaseInput label="Descrição" type="textarea" v-model="form.description" :error="errors.description"
                :disabled="isSubmitting">
                <template #hint>
                    <div class="form-text text-end" :class="{ 'text-danger': descriptionCharsRemaining < 0 }">
                        {{ form.description.length }}/{{ DESCRIPTION_MAX }}
                    </div>
                </template>
            </BaseInput>

            <div class="mb-3">
                <label class="form-label d-block">Capa atual</label>
                <img :src="thumbnailPreviewUrl" alt="Capa do treino" class="thumbnail-preview mb-2" />

                <label for="thumbnailFile" class="form-label d-block">Nova capa (opcional)</label>
                <input id="thumbnailFile" ref="thumbnailInputRef" type="file" class="form-control" accept="image/*"
                    :disabled="isSubmitting" @change="handleThumbnailChange" />
                <div class="form-text">Deixe em branco para manter a capa atual.</div>
            </div>

            <p v-if="apiErrorMessage" class="text-danger small">{{ apiErrorMessage }}</p>
            <p v-if="successMessage" class="text-success small">{{ successMessage }}</p>

            <div class="d-grid gap-2">
                <BaseButton type="submit" :loading="isSubmitting" loading-text="Salvando...">
                    Salvar Alterações
                </BaseButton>
                <router-link :to="{ name: 'my-workouts' }" class="btn btn-outline-secondary btn-lg">
                    Voltar para Meus Treinos
                </router-link>
            </div>
        </form>
    </FormCard>
</template>