<template>
    <ul>
        <li v-for="(result, i) in resultList" :key="`result-${i}`">
            <span class="result-label">{{ result.label }}</span>
            <div class="result-percent-wrap">
                <div
                    class="result-percent"
                    :style="`width: ${result.percent}%; background-color: black`"
                ></div>
            </div>
            <span class="result-percent-text"
                >{{ Math.round(result.percent) }}%</span
            >
        </li>
    </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
    resultList: Array<{ label: string; percent: number }>;
}
const props = defineProps<Props>();
</script>

<style scoped>
li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
}

.result-label {
    width: 30%;
    margin-left: 16px;
}

.result-percent-text {
    width: 15%;
    text-align: end;
    margin-right: 16px;
}

.result-percent-wrap {
    width: 55%;
    height: 16px;
    background-color: white;
}

.result-percent {
    height: 100%;
}
</style>
