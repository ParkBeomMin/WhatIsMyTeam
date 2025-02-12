<template>
    <div class="menu-container">
        <button class="menu-trigger" @click="toggleMenu">
            <span class="hamburger-box">
                <span class="hamburger-inner" :class="{ 'is-active': isOpen }"></span>
            </span>
        </button>
        
        <div class="menu-content" :class="{ 'is-open': isOpen }">
            <h3 class="menu-title">테스트 목록</h3>
            <ul class="menu-list">
                <li 
                    v-for="test in testList" 
                    :key="test.id"
                    :class="{ 'active': test.id === currentTest }"
                    @click="selectTest(test.id)"
                >
                    <img :src="test.icon" :alt="test.name" class="test-icon" />
                    <span>{{ test.name }}</span>
                </li>
            </ul>
        </div>
        
        <div 
            v-if="isOpen" 
            class="menu-backdrop" 
            @click="emit('update:is-open', false)"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTestList } from '@/composables/useTestList';
import { ref } from 'vue';

const router = useRouter();
const { testList } = useTestList();
const currentTest = ref(testList.value[0]?.id || 'premier22-23');

const selectTest = (testId: string) => {
    const test = testList.value.find(t => t.id === testId);
    if (test) {
        currentTest.value = testId;
        router.push(test.path);
        emit('update:is-open', false);
    }
};

const props = defineProps<{
    isOpen: boolean;
}>();

const emit = defineEmits<{
    'update:is-open': [value: boolean];
}>();

const toggleMenu = () => {
    emit('update:is-open', !props.isOpen);
};
</script>

<style scoped>
.menu-container {
    position: relative;
    z-index: 1000;
}

.menu-trigger {
    position: relative;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
}

.menu-trigger:hover {
    background-color: rgba(189, 85, 182, 0.1);
}

.hamburger-box {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
    width: 20px;
    height: 2px;
    background-color: #bd55b6;
    position: absolute;
    transition: all 0.3s;
    border-radius: 2px;
}

.hamburger-inner::before {
    top: -6px;
}

.hamburger-inner::after {
    bottom: -6px;
}

.hamburger-inner.is-active {
    transform: rotate(45deg);
}

.hamburger-inner.is-active::before {
    transform: rotate(90deg);
    top: 0;
}

.hamburger-inner.is-active::after {
    transform: rotate(90deg);
    bottom: 0;
}

.menu-content {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    height: 100vh;
    background: white;
    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
    transition: left 0.3s ease;
    z-index: 1000;
}

.menu-content.is-open {
    left: 0;
}

.menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 999;
}

.menu-title {
    padding: 20px;
    margin: 0;
    color: #333;
    border-bottom: 1px solid #eee;
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-list li {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    cursor: pointer;
    transition: background 0.2s;
}

.menu-list li:hover {
    background: #fdf2ff;
}

.menu-list li.active {
    background: #fdf2ff;
    border-left: 4px solid #bd55b6;
}

.test-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
}
</style> 