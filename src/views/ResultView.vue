<template>
    <div class="result-page">
        <div class="content">
            <div class="image-container">
                <img 
                    class="team-logo" 
                    :src="`/club/${teamName}.png`" 
                    :alt="teamName"
                />
                <img 
                    class="uploaded-image" 
                    :src="uploadedImage" 
                    alt="uploaded image"
                />
            </div>
            
            <Result :resultList="resultList" />
            
            <div class="share-buttons">
                <button @click="shareResult" class="share-btn">결과 공유하기</button>
                <button @click="goToHome" class="retry-btn">다시 테스트하기</button>
            </div>
        </div>
        <RecommendBanner />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Result from '@/components/Result.vue';
import Header from '@/components/Header.vue';
import RecommendBanner from '@/components/RecommendBanner.vue';

const route = useRoute();
const router = useRouter();

const teamName = route.params.teamName as string;
const resultList = JSON.parse(decodeURIComponent(route.params.results as string));
const uploadedImage = decodeURIComponent(route.params.image as string);

const shareResult = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: '나의 축구팀 테스트 결과',
            text: `내 성향과 맞는 축구팀은 ${teamName}입니다!`,
            url: shareUrl
        });
    } else {
        navigator.clipboard.writeText(shareUrl);
        alert('링크가 복사되었습니다!');
    }
};

const goToHome = () => {
    router.push('/');
};
</script>

<style scoped>
.result-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;
    padding: 20px;
    padding-bottom: 100px; /* 배너 높이보다 큰 여백 */
    text-align: center;
}

.image-container {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 20px auto;
}

.uploaded-image {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border: #bd55b6 1px solid;
    border-radius: 15px;
}

.team-logo {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 50px;
    height: 50px;
    z-index: 1;
    animation-name: myTeam;
    animation-duration: 2s;
}

@-webkit-keyframes myTeam {
    0% {
        left: -100px;
        transform: scale(2);
        opacity: 0;
    }
    100% {
        left: 16px;
        transform: scale(1);
        opacity: 1;
    }
}

.share-buttons {
    margin-top: 30px;
}

.share-btn, .retry-btn {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background: #bd55b6;
    color: white;
    cursor: pointer;
}

.retry-btn {
    background: #666;
}
</style> 