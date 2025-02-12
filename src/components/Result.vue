<template>
    <div class="result-container">
        <h2 class="result-title">팀 성향 분석 결과</h2>
        <div class="result-cards">
            <div 
                v-for="(result, index) in resultList" 
                :key="result.label"
                class="result-card"
                :class="{ 'top-result': index === 0 }"
                :style="{ '--delay': `${index * 0.2}s` }"
            >
                <div class="card-header">
                    <img 
                        class="team-emblem"
                        :src="`/club/${currentTest.id}/${result.label}.png`"
                        :alt="result.label"
                    />
                    <span class="team-name">{{ result.label }}</span>
                    <span class="percent">
                        <span class="percent-number">{{ Math.round(result.percent) }}</span>%
                    </span>
                </div>
                <div class="progress-bar">
                    <div 
                        class="progress" 
                        :style="{ '--width': `${result.percent}%` }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useTestList } from '@/composables/useTestList';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
interface Props {
    resultList: Array<{ label: string; percent: number }>;
}
const props = defineProps<Props>();
const { getCurrentTest } = useTestList();
const route = useRoute();
const currentTest = computed(() => getCurrentTest(route.path));
</script>

<style scoped>
.result-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

.result-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

.result-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.result-card {
    background: white;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    animation: slideIn 0.5s ease-out forwards;
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateY(20px);
}

.top-result {
    background: #fdf2ff;
    border: 2px solid #bd55b6;
    transform: scale(1.02);
}

.card-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.team-emblem {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.team-name {
    flex: 1;
    font-weight: bold;
    color: #333;
}

.percent {
    font-weight: bold;
    color: #bd55b6;
    font-size: 1.1rem;
}

.progress-bar {
    background: #f0f0f0;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: #bd55b6;
    border-radius: 4px;
    width: 0;
    animation: progressFill 1.2s ease-out forwards;
    animation-delay: calc(var(--delay) + 0.3s);
}

.top-result .progress {
    background: linear-gradient(90deg, #bd55b6, #ff8ad8);
}

.percent-number {
    display: inline-block;
    animation: countUp 1s ease-out forwards;
    animation-delay: calc(var(--delay) + 0.3s);
    opacity: 0;
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes progressFill {
    to {
        width: var(--width);
    }
}

@keyframes countUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
