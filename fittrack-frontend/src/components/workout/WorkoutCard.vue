<script setup>
import { computed } from 'vue'
import { getWorkoutThumbnailUrl, getProfilePictureUrl } from '../../utils/media'

const props = defineProps({
    workout: { type: Object, required: true },
    author: { type: Object, default: null },
})

const displayAuthor = computed(() => props.author ?? props.workout.User)
</script>

<template>
    <div class="workout-card">
        <router-link :to="{ name: 'workout-detail', params: { id: workout.id } }" class="d-block">
            <div class="thumbnail-placeholder"
                :style="{ backgroundImage: `url(${getWorkoutThumbnailUrl(workout.thumbnailPath)})` }">
                <i class="bi bi-play-circle play-icon"></i>
                <span class="badge-views"><i class="bi bi-eye"></i> {{ workout.views }}</span>
            </div>
        </router-link>

        <div class="p-3">
            <h6 class="text-truncate mb-1">
                <router-link :to="{ name: 'workout-detail', params: { id: workout.id } }"
                    class="text-decoration-none text-dark">
                    {{ workout.title }}
                </router-link>
            </h6>

            <router-link v-if="displayAuthor"
                :to="{ name: 'public-profile', params: { username: displayAuthor.username } }"
                class="d-flex align-items-center text-decoration-none">
                <img :src="getProfilePictureUrl(displayAuthor.profilePicture)" :alt="displayAuthor.username"
                    class="rounded-circle me-2" width="24" height="24" style="object-fit: cover;" />
                <span class="text-muted small">@{{ displayAuthor.username }}</span>
            </router-link>

            <div v-if="workout.likesCount !== undefined" class="d-flex gap-3 text-muted small mt-2">
                <span><i class="bi bi-heart"></i> {{ workout.likesCount }}</span>
                <span><i class="bi bi-chat"></i> {{ workout.commentsCount }}</span>
            </div>

            <slot name="actions" />
        </div>
    </div>
</template>