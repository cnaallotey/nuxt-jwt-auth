<script setup>
definePageMeta({
  middleware: ['auth'],
  guest: true
})
</script>
<template>
    <div class="h-full flex items-center justify-center">
        <LoginForm />
    </div>
</template>