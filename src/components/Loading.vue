<template>
    <div class="container">
        <div v-for="club in data.loadingClubList" :key="club" class="wrap">
            <img :src="`/club/${club}.png`" :alt="club" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { onMounted, onBeforeUnmount } from "vue";
import { useClub } from "@/composables/useClub";

const { clubList } = useClub();
const data = reactive({
    index: 0,
    sizeNum: 3,
    loadingClubList: [],
    interval: null as any,
});

onMounted(() => {
    data.interval = setInterval(() => {
        data.index = Math.floor(Math.random() * clubList.length);

        data.loadingClubList = [...[clubList[data.index]]] as [];
        console.log("data.loadingClubList", data.loadingClubList);
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(data.interval);
});
</script>

<style scoped>
.container {
    position: absolute;
    top: 50%;
}

.wrap {
    transform: translate(-50%, -50%);
    position: absolute;
    opacity: 0;

    animation-name: loading;
    animation-duration: 2s;
}

/* 키프레임 이름 = 애니메이션 이름 */
@-webkit-keyframes loading {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
