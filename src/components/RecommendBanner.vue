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
import { useTestList } from '@/composables/useTestList';
const router = useRouter();
const route = useRoute();
const { testList } = useTestList();


const currentTestIndex = computed(() => {
    return testList.value.findIndex(test => test.path === route.path);
});

const nextTest = computed(() => {
    const filteredTests = testList.value.filter((_, index) => index !== currentTestIndex.value);
    const randomIndex = Math.floor(Math.random() * filteredTests.length);
    return filteredTests[randomIndex];
});

// const nextTest = computed(() => {
    
//     const nextIndex = (currentTestIndex.value + 1) % testList.value.length;
//     return testList.value[nextIndex];
// });

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