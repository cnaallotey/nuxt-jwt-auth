<template>
  <div class="min-h-screen flex flex-col">
    <header v-if="!authStore.loading" class="p-4 bg-gray-100">
      <div class="max-w-screen-lg mx-auto">
        <nav v-if="authStore.isAuthenticated">
          <button @click="authStore.logout">Logout</button>
        </nav>
        <nav v-else class="flex gap-4">
          <NuxtLink to="/login" class="text-blue-500 hover:text-blue-600">
            Login
          </NuxtLink>
          <NuxtLink to="/register" class="text-blue-500 hover:text-blue-600">
            Sign Up
          </NuxtLink>
        </nav>
      </div>
    </header>

    <div class="flex-1 flex items-center justify-center"><NuxtPage /></div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

// Check authentication status on app mount
onNuxtReady( async () => {
 await authStore.checkAuth();
});
</script>
