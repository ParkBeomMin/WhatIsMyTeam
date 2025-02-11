<template>
    <div class="result-container">
        <h2 class="result-title">팀 성향 분석 결과</h2>
        <div class="result-cards">
            <div 
                v-for="(result, index) in resultList" 
                :key="result.label"
                class="result-card"
                :class="{ 'top-result': index === 0 }"
            >
                <div class="card-header">
                    <img 
                        class="team-emblem" 
                        :src="`/club/${result.label}.png`" 
                        :alt="result.label"
                    />
                    <span class="team-name">{{ result.label }}</span>
                    <span class="percent">{{ Math.round(result.percent) }}%</span>
                </div>
                <div class="progress-bar">
                    <div 
                        class="progress" 
                        :style="{ width: `${result.percent}%` }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
    resultList: Array<{ label: string; percent: number }>;
}
const props = defineProps<Props>();
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
    transition: width 1s ease-in-out;
}

.top-result .progress {
    background: linear-gradient(90deg, #bd55b6, #ff8ad8);
}
</style>
