<script setup>
definePageMeta({
  middleware: ['auth'],
  guest: true
})
</script>

<template>
    <div class="h-max flex items-center justify-center">
        <SignupForm />
    </div>
</template>