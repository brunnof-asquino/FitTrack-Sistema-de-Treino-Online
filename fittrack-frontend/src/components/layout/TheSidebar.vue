<script setup>
import { useAuth } from '../../composables/useAuth'

const { currentUser } = useAuth()
</script>

<template>
  <aside class="col-md-3 col-lg-2 d-none d-md-block sidebar py-4">
    <nav class="nav flex-column">
      <router-link to="/feed/suggestions" class="nav-link"><i class="bi bi-house-door-fill me-2"></i> Para Você</router-link>
      <router-link to="/feed/follow" class="nav-link"><i class="bi bi-people me-2"></i> Seguindo</router-link>
      <router-link to="/search" class="nav-link"><i class="bi bi-compass me-2"></i> Explorar</router-link>

      <hr />
      <p class="small text-muted px-3 mb-2">Minha Atividade</p>
      <router-link to="/my-workouts" class="nav-link"><i class="bi bi-card-checklist"></i> Treinos</router-link>
      <router-link to="/liked-workouts" class="nav-link"><i class="bi bi-heart me-2"></i> Curtidas</router-link>

      <template v-if="currentUser?.isAdmin">
        <hr />
        <p class="small text-muted px-3 mb-2">Administração</p>
        <router-link to="/admin" class="nav-link"><i class="bi bi-speedometer2 me-2"></i> Dashboard Admin</router-link>
      </template>
    </nav>
  </aside>
</template>