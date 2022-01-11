import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import Signup from '../views/Signup/Signup.vue'
import Home from '../views/Home/Home.vue';

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    // redirect
    {
        path: '/signup',
        redirect: '/home'
    }


]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router