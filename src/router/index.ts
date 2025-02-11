import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useTestList } from "@/composables/useTestList";

const { testList } = useTestList();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...testList.value.map(test => ({
            path: test.path === '/' ? '/' : `/${test.path}`,
            name: test.id,
            component: HomeView
        })),
        {
            path: '/result/:teamName/:results/:image',
            name: 'result',
            component: () => import('../views/ResultView.vue')
        }
    ],
});

export default router;
