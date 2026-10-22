<script setup>
import { reactive, ref, computed } from 'vue'
import { uploadWorkout } from '../services/WorkoutService'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import FormCard from '../components/base/FormCard.vue'

const TITLE_MAX = 100
const DESCRIPTION_MAX = 500

const form = reactive({
    title: '',
    description: '',
})

const errors = reactive({
    title: '',
    description: '',
})

const workoutInputRef = ref(null)
const thumbnailInputRef = ref(null)

const selectedWorkout = ref(null)
const selectedThumbnail = ref(null)
const thumbnailPreviewUrl = ref('')

const isSubmitting = ref(false)
const uploadProgress = ref(0)
const apiErrorMessage = ref('')
const successMessage = ref('')

const descriptionCharsRemaining = computed(() => DESCRIPTION_MAX - form.description.length)

function handleWorkoutChange(event) {
    selectedWorkout.value = event.target.files[0] || null
}

function handleThumbnailChange(event) {
    const file = event.target.files[0]
    if (!file) {
        selectedThumbnail.value = null
        thumbnailPreviewUrl.value = ''
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
    apiErrorMessage.value = ''

    if (!form.title.trim()) {
        errors.title = 'O título é obrigatório.'
    } else if (form.title.length > TITLE_MAX) {
        errors.title = `O título deve ter no máximo ${TITLE_MAX} caracteres.`
    }

    if (form.description.length > DESCRIPTION_MAX) {
        errors.description = `A descrição deve ter no máximo ${DESCRIPTION_MAX} caracteres.`
    }

    if (!selectedWorkout.value) {
        apiErrorMessage.value = 'Selecione um arquivo de vídeo.'
    } else if (!selectedThumbnail.value) {
        apiErrorMessage.value = 'Selecione uma imagem de capa.'
    }

    return errors.title === '' && errors.description === '' && apiErrorMessage.value === ''
}

function resetForm() {
    form.title = ''
    form.description = ''
    selectedWorkout.value = null
    selectedThumbnail.value = null
    thumbnailPreviewUrl.value = ''
    uploadProgress.value = 0
    if (workoutInputRef.value) workoutInputRef.value.value = ''
    if (thumbnailInputRef.value) thumbnailInputRef.value.value = ''
}

async function handleSubmit() {
    successMessage.value = ''

    if (!validate()) {
        return
    }

    isSubmitting.value = true
    uploadProgress.value = 0

    const formData = new FormData()
    formData.append('title', form.title.trim())
    formData.append('description', form.description.trim())
    formData.append('workout', selectedWorkout.value)
    formData.append('thumbnail', selectedThumbnail.value)

    try {
        await uploadWorkout(formData, (progressEvent) => {
            uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        })

        successMessage.value = 'Treino enviado com sucesso!'
        resetForm()
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <FormCard title="Enviar Novo Treino">
        <form @submit.prevent="handleSubmit">
            <BaseInput label="Título do Treino" v-model="form.title" placeholder="Um título cativante para seu treino"
                :error="errors.title" :disabled="isSubmitting" />

            <BaseInput label="Descrição" type="textarea" v-model="form.description"
                placeholder="Conte mais sobre seu treino (opcional)" :error="errors.description"
                :disabled="isSubmitting">
                <template #hint>
                    <div class="form-text text-end" :class="{ 'text-danger': descriptionCharsRemaining < 0 }">
                        {{ form.description.length }}/{{ DESCRIPTION_MAX }}
                    </div>
                </template>
            </BaseInput>

            <div class="mb-3">
                <label for="workoutFile" class="form-label">Arquivo de Vídeo</label>
                <input id="workoutFile" ref="workoutInputRef" type="file" class="form-control" accept="workout/*"
                    :disabled="isSubmitting" @change="handleWorkoutChange" />
                <div class="form-text">Formatos suportados: MP4, WebM, Ogg. Tamanho máximo: 100MB.</div>
            </div>

            <div class="mb-3">
                <label for="thumbnailFile" class="form-label">Capa (Thumbnail)</label>
                <input id="thumbnailFile" ref="thumbnailInputRef" type="file" class="form-control" accept="image/*"
                    :disabled="isSubmitting" @change="handleThumbnailChange" />
                <div class="form-text">Uma imagem que represente seu treino. Formatos: JPG, PNG.</div>

                <img v-if="thumbnailPreviewUrl" :src="thumbnailPreviewUrl" alt="Prévia da capa"
                    class="thumbnail-preview mt-2" />
            </div>

            <div v-if="isSubmitting" class="progress mb-3" style="height: 10px;">
                <div class="progress-bar" role="progressbar" :style="{ width: uploadProgress + '%' }"
                    :aria-valuenow="uploadProgress" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <p v-if="apiErrorMessage" class="text-danger small">{{ apiErrorMessage }}</p>
            <p v-if="successMessage" class="text-success small">
                {{ successMessage }}
                <router-link :to="{ name: 'my-workouts' }">Ver em Meus Treinos</router-link>
            </p>

            <div class="d-grid gap-2">
                <BaseButton type="submit" :loading="isSubmitting" loading-text="Enviando...">
                    Enviar Treino
                </BaseButton>
                <router-link to="/feed" class="btn btn-outline-secondary btn-lg">Cancelar</router-link>
            </div>
        </form>
    </FormCard>
</template>