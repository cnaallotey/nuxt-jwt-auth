<script setup>
definePageMeta({
  middleware: ['guest']
})
</script>

<template>
    <div class="h-max flex items-center justify-center">
        <SignupForm />
    </div>
</template>