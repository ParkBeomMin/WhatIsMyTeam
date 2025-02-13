<template>
    <div class="result-page">
        <Loading v-if="isLoading" />
        <div v-else class="content">
            <div class="image-container">
                <img 
                    class="team-logo" 
                    :src="`/club/${currentTest.id}/${teamName}.png`" 
                    :alt="teamName"
                />
                <img 
                    class="uploaded-image" 
                    :src="uploadedImage" 
                    alt="uploaded image"
                />
            </div>
            
            <Result :resultList="resultList" />
            <KakaoBanner adUnit="DAN-fv15w1zjxuQBqcl0" :width="250" :height="250" />
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
import RecommendBanner from '@/components/RecommendBanner.vue';
import Loading from '@/components/Loading.vue';
import { useTestList } from '@/composables/useTestList';
import { computed, ref, onMounted } from 'vue';
import pako from 'pako';
import copy from "copy-to-clipboard";
import Swal from "sweetalert2";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useHead } from '@vueuse/head';
import KakaoBanner from '@/components/KakaoBanner.vue';
const route = useRoute();
const router = useRouter();
const { getCurrentTest } = useTestList();
const currentTest = computed(() => getCurrentTest(route.path));

const teamName = ref('');
const resultList = ref([]);
const uploadedImage = ref('');
const isLoading = ref(true);

onMounted(async () => {
    const { id } = route.query;
    
    if (!id) {
        router.push('/');
        return;
    }
    
    try {
        isLoading.value = true;
        const db = getFirestore();
        const docRef = doc(db, `${import.meta.env.VITE_FIRESTORE_COLLECTION_NAME}-${currentTest.value.id}`, id as string);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            throw new Error('결과를 찾을 수 없습니다');
        }
        
        const data = docSnap.data();
        
        // 모든 데이터를 준비한 후에 한번에 화면에 표시
        const promises = [
            // 결과 데이터 복원
            (async () => {
                const resultsCompressed = new Uint8Array(atob(data.results).split('').map(c => c.charCodeAt(0)));
                const resultsDecompressed = new TextDecoder().decode(pako.inflate(resultsCompressed));
                const minimizedResults = JSON.parse(resultsDecompressed);
                resultList.value = minimizedResults.map((r: any) => ({
                    label: r.l,
                    percent: r.p
                }));
            })(),
            // 이미지 데이터 복원
            (async () => {
                const imageCompressed = new Uint8Array(atob(data.image).split('').map(c => c.charCodeAt(0)));
                const imageDecompressed = new TextDecoder().decode(pako.inflate(imageCompressed));
                uploadedImage.value = imageDecompressed;
            })()
        ];
        
        await Promise.all(promises);
        teamName.value = data.team;
        
        // 메타 태그 업데이트
        useHead({
            title: `${teamName.value} - 나의 축구팀 테스트 결과`,
            meta: [
                {
                    property: 'og:title',
                    content: `나의 축구팀은 ${teamName.value}입니다!`
                },
                {
                    property: 'og:description',
                    content: `내 성향과 가장 잘 맞는 축구팀을 찾아보세요!`
                },
                {
                    property: 'og:image',
                    content: `/club/${currentTest.value.id}/${teamName.value}.png`
                },
                {
                    property: 'og:url',
                    content: window.location.href
                }
            ]
        });
    } catch (error) {
        console.error('데이터 복원 중 오류:', error);
        router.push('/');
    } finally {
        isLoading.value = false;
    }
});

const shareResult = async () => {
    try {
        if (navigator.share) {
            
            await navigator.share({
                title: '나의 축구팀 테스트 결과',
                text: `내 성향과 맞는 축구팀은 ${teamName.value}입니다!`,
                url: window.location.href,
            });
        } else {
            copy(window.location.href);
            Swal.fire({
                html: '링크가 복사되었습니다!',
            });
        }
    } catch (error) {
        console.error('공유 중 오류 발생:', error);
        const shareUrl = window.location.href;
        copy(shareUrl);
        Swal.fire({
            html: '링크가 복사되었습니다!',
        });
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
    background: white;
}

.content {
    flex: 1;
    padding: 20px;
    padding-bottom: 80px;
    text-align: center;
    background: white;
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
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 40px;
}

.share-btn, .retry-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background: #bd55b6;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    min-width: 140px;
    transition: all 0.2s;
}

.share-btn:hover, .retry-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.retry-btn {
    background: #666;
}
</style> 