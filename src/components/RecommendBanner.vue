<template>
    <div class="recommend-banner">
        <div class="banner-content">
            <img :src="nextTest.icon" :alt="nextTest.name" class="banner-icon" />
            <div class="banner-text">
                <h4>다음 테스트 추천</h4>
                <p>{{ nextTest.name }} 성향 테스트하기</p>
            </div>
            <button class="try-button" @click="goToTest">
                테스트 하기
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const testList = [
    {
        id: 'premier22-23',
        name: '22-23 프리미어리그',
        icon: '/icons/premier.png',
        path: '/'
    },
    {
        id: 'premier23-24',
        name: '23-24 프리미어리그',
        icon: '/icons/premier.png',
        path: '/premier23-24'
    },
    {
        id: 'laliga23-24',
        name: '23-24 라리가',
        icon: '/icons/laliga.png',
        path: '/laliga'
    }
];

const currentTestIndex = computed(() => {
    return testList.findIndex(test => test.path === route.path);
});

const nextTest = computed(() => {
    const nextIndex = (currentTestIndex.value + 1) % testList.length;
    return testList[nextIndex];
});

const goToTest = () => {
    router.push(nextTest.value.path);
};
</script>

<style scoped>
.recommend-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
    padding: 12px 20px;
}

.banner-content {
    display: flex;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
}

.banner-icon {
    width: 40px;
    height: 40px;
    margin-right: 12px;
}

.banner-text {
    flex: 1;
}

.banner-text h4 {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
}

.banner-text p {
    margin: 4px 0 0 0;
    font-size: 1rem;
    color: #333;
}

.try-button {
    background: #bd55b6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.2s;
}

.try-button:hover {
    background: #b82cae;
}
</style> 