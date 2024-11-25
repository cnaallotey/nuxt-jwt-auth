export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return
    const authStore =  useAuthStore()
    await authStore.checkAuth()
    
    // If user is not authenticated and trying to access a protected route
    if (!authStore.user) {
      return navigateTo('/login')
    }
  })