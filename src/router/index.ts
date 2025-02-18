import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useTestList } from "@/composables/useTestList";

const { testList } = useTestList();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: testList.value[0].path
        },
        ...testList.value.map(test => ({
            path: test.path === '/' ? '/' : `/${test.path}`,
            name: test.id,
            component: HomeView
        })),
        {
            path: '/result',
            name: 'result',
            component: () => import('../views/ResultView.vue')
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('../views/PrivacyView.vue')
        },
        {
            path: '/terms',
            name: 'terms',
            component: () => import('../views/TermsView.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactView.vue')
        }
    ],
});

export default router;
