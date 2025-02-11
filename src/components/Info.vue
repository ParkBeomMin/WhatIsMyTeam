<template>
    <div class="info-container">
        <div class="info-box">
            <h2 class="info-title">나와 어울리는 축구팀 찾기 🎯</h2>
            <div class="test-info">
                <img :src="currentTest.icon" :alt="currentTest.name" class="league-icon" />
                <span class="league-text">{{ currentTest.name }} 기반</span>
            </div>
            <div class="info-steps">
                <div class="step">
                    <span class="step-number">1</span>
                    <p>자신의 사진을 업로드해주세요</p>
                </div>
                <div class="step">
                    <span class="step-number">2</span>
                    <p>AI가 당신의 이미지를 분석합니다</p>
                </div>
                <div class="step">
                    <span class="step-number">3</span>
                    <p>당신과 가장 잘 어울리는 축구팀을 찾아드립니다</p>
                </div>
            </div>
            <div class="info-footer">
                <p class="info-note">* 업로드된 사진은 따로 저장되지 않으니 안심하세요!</p>
                <button class="more-tests" @click="openMenu">
                    다른 리그 테스트 보기
                    <span class="arrow">→</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useTestList } from '@/composables/useTestList';
import { computed } from 'vue';
import { useHamburgerMenu } from '../composables/useHamburgerMenu';

const route = useRoute();
const { getCurrentTest } = useTestList();
const currentTest = computed(() => getCurrentTest(route.path));

const { openMenu } = useHamburgerMenu();
</script>

<style scoped>
.info-container {
    padding: 20px;
    margin-top: 20px;
}

.info-box {
    background: #fdf2ff;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
}

.info-title {
    color: #333;
    font-size: 1.3rem;
    margin: 0 0 24px 0;
    font-weight: 600;
}

.info-steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
}

.step {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    padding: 12px 16px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.step-number {
    background: #bd55b6;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
}

.step p {
    margin: 0;
    text-align: left;
    font-size: 0.95rem;
    color: #333;
    line-height: 1.4;
}

.info-note {
    color: #666;
    font-size: 0.85rem;
    margin: 0;
    font-style: italic;
}

.test-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
    background: white;
    padding: 8px 16px;
    border-radius: 20px;
    display: inline-flex;
}

.league-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.league-text {
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;
}

.info-footer {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
}

.more-tests {
    background: none;
    border: none;
    color: #bd55b6;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    border-radius: 20px;
    transition: background-color 0.2s;
}

.more-tests:hover {
    background-color: rgba(189, 85, 182, 0.1);
}

.arrow {
    font-size: 1.1em;
    transition: transform 0.2s;
}

.more-tests:hover .arrow {
    transform: translateX(4px);
}
</style>
