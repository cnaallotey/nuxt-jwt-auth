export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return
    const authStore =  useAuthStore()
    await authStore.checkAuth()
    
    // If user is not authenticated and trying to access a protected route
    if (!authStore.user && to.meta.requiresAuth) {
      return navigateTo('/login')
    }
    
    // If user is authenticated and trying to access auth pages (login/register)
    if (authStore.user && to.meta.guest) {
      return navigateTo('/')
    }
  })