import jwt from 'jsonwebtoken';

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/login' || to.path === '/api/auth/login') {
        return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
        return redirect('/login');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return redirect('/login');
    }

    return;
})
