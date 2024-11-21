<script setup>
definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
})

const authStore = useAuthStore()
</script>

<template>
    <div>
        <p>This is your Dashboard</p>
        <pre>{{ authStore.user }}</pre>
    </div>
</template>