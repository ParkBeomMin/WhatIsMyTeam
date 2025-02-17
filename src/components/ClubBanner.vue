<template>
    <div class="banner-container">
        <div :class="['logo-container', slideAnim]">
            <!-- 첫 번째 세트 -->
            <div v-for="club in clubList" :key="`first-${club}`" class="wrap">
                <img :src="`/club/${currentTest.id}/${club}.png`" :alt="club" />
            </div>
            <!-- 두 번째 세트 (무한 스크롤을 위한 복제) -->
            <div v-for="club in clubList" :key="`second-${club}`" class="wrap">
                <img :src="`/club/${currentTest.id}/${club}.png`" :alt="club" />
            </div>
            <div v-for="club in clubList" :key="`third-${club}`" class="wrap">
                <img :src="`/club/${currentTest.id}/${club}.png`" :alt="club" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { useTestList } from "@/composables/useTestList";
import { useRoute } from "vue-router";

const { slideType = "left" } = defineProps<{ slideType?: string }>();
const { getCurrentTest } = useTestList();
const route = useRoute();
const currentTest = computed(() => getCurrentTest(route.path));
const clubList = computed(() => currentTest.value.clubList);

const slideAnim = computed(() => {
    return slideType == "right" ? "slide-right" : "slide-left";
});
</script>

<style scoped>
.banner-container {
    overflow: hidden;
    height: 50px;
    width: 100%;
}

.logo-container {
    display: flex;
    gap: 8px;
    padding: 5px 0;
}

.wrap {
    flex-shrink: 0;
}

.wrap img {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.slide-left {
    animation: slideLeft 8s linear infinite;
}

.slide-right {
    flex-direction: row-reverse;
    animation: slideRight 8s linear infinite;
}

@keyframes slideLeft {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

@keyframes slideRight {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(50%);
    }
}
</style>
