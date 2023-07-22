<template>
    <div :class="['logo-container', slideAnim]">
        <div v-for="club in clubList" :key="club" class="wrap">
            <img :src="`/club/${club}.png`" :alt="club" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { onMounted, onBeforeUnmount } from "vue";
import { useClub } from "@/composables/useClub";
const { slideType = "left" } = defineProps<{ slideType?: string }>();

const { clubList } = useClub();

const data = reactive({
    interval: null as any,
});

let index = ref(0);
const slideAnim = computed(() => {
    return slideType == "right" ? "slide-right" : "slide-left";
});

onMounted(() => {
    slideLogos();
    // const logoContainer = document.querySelector(".logo-container");
    // const logos = document.querySelectorAll(".logo");
    // const firstLogo = logos[0].cloneNode(true);
    // logoContainer?.appendChild(firstLogo);
    data.interval = setInterval(() => {
        let i = 0;
        clubList.push(clubList[i++]);
        clubList.shift();
    }, 14000);
});
const slideLogos = () => {
    const logoContainer = document.querySelector(".logo-container");
    // logoContainer.style.animation = `${slideAnim} 15s linear infinite`;
    (
        logoContainer as HTMLElement
    ).style.transform = `translateX(calc(-100% * ${index.value++}))`;
    setTimeout(slideLogos, 6000); // 15초 후에 함수를 다시 호출하여 반복 실행
};

onBeforeUnmount(() => {
    clearInterval(data.interval);
});
</script>

<style scoped>
.logo-container {
    /* position: absolute;
    transform: translate(-50%, -50%);
    -webkit-animation: linear infinite;
    -webkit-animation-name: run;
    -webkit-animation-duration: 5s;
    display: flex; */
    display: flex;
}

.wrap {
    margin: 0 4px;
}
.slide-left {
    animation: slideLeft 15s linear infinite;
}

.slide-right {
    flex-direction: row-reverse;
    animation: slideRight 15s linear infinite;
}

@keyframes slideLeft {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(-100%));
    }
}
@keyframes slideRight {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(100%));
    }
}
</style>
