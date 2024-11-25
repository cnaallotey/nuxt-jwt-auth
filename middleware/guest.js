export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return
    const authStore =  useAuthStore()
    await authStore.checkAuth()
    
    // If user is authenticated and trying to access auth pages (login/register)
    if (authStore.user) {
      return navigateTo('/')
    }
  })