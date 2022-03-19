import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "welcome",
            path: "/",
            component: () => import('@/view/Welcome.vue'),
        }, {
            name: "login",
            path: "/login",
            component: () => import('@/view/Login.vue'),
        }, {
            name: "chat",
            path: "/chat",
            component: () => import('@/view/Chat.vue'),
        }, {
            name: "test",
            path: "/test",
            component: () => import('@/components/Test.vue')
        }, {
            name: "404",
            path: "/:catchAll(.*)",
            component: () => import('@/view/404.vue')
        },

    ]
})