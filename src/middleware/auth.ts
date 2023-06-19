export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/login' || to.path === '/api/auth/login') {
        return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
        return redirect('/login');
    }

    return;
})
