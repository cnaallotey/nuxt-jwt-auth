<script setup>
definePageMeta({
  middleware: ['guest']
})
</script>
<template>
    <div class="h-full flex items-center justify-center">
        <LoginForm />
    </div>
</template>