<template>
    <div class="file-upload">
        <ClubBanner />

        <!-- <button
            v-if="!predictState.myTeam"
            class="file-upload-btn"
            type="button"
            @click="openFileUpload"
        >
            Add Image
        </button> -->

        <div class="upload-container">
            <input
                ref="file"
                type="file"
                @change="readURL($event)"
                accept="image/*"
                class="hidden"
            />
            
            <div class="file-upload-content">
                <div 
                    class="image-container" 
                    @click="openFileUpload"
                    :class="{ 'has-image': uploadState.imgSrc }"
                >
                    <img
                        v-show="predictState.myTeam"
                        class="my-team"
                        :src="`/club/${predictState.myTeam}.png`"
                        :alt="predictState.myTeam"
                    />
                    <img
                        v-show="uploadState.isShowImagUploadContent"
                        ref="imgEl"
                        class="file-upload-image"
                        :src="uploadState.imgSrc"
                        alt="your image"
                    />
                    <div v-if="!uploadState.imgSrc" class="upload-placeholder">
                        <div class="upload-icon">📸</div>
                        <p>클릭하여 사진 업로드</p>
                        <span class="upload-hint">얼굴이 잘 나온 사진을 사용해주세요</span>
                    </div>
                </div>
                <button 
                    v-if="uploadState.imgSrc"
                    type="button" 
                    @click="predict" 
                    class="predict-button"
                >
                    {{ predictState.buttonText }}
                </button>
            </div>
            <Info @openMenu="openHamburgerMenu" v-if="predictState.classPrediction.length == 0" />
        </div>

        <ClubBanner slideType="right" />
    </div>

    <Loading v-if="predictState.isLoading" />

    <!-- Copyright (c) 2022 by Aaron Vanston (https://codepen.io/aaronvanston/pen/yNYOXR)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 -->
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { toRaw } from "vue";
import Result from "@/components/Result.vue";
import Loading from "@/components/Loading.vue";
import ClubBanner from "@/components/ClubBanner.vue";
import Info from "../components/Info.vue";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useRouter, useRoute } from 'vue-router';
import Header from "@/components/Header.vue";
import { useTestList } from '@/composables/useTestList';
const analytics = getAnalytics();
const router = useRouter();
const route = useRoute();
const { getCurrentTest } = useTestList();
const currentTest = computed(() => getCurrentTest(route.path));

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// URL 변수를 반응형으로 변경
const modelUrl = computed(() => currentTest.value.modelUrl);

const predictState = reactive({
    model: "" as any,
    labelContainer: "",
    maxPredictions: 0,
    classPrediction: [] as any[],
    isLoading: false,
    myTeam: "",
    buttonText: "확인 해보기",
});

const headerRef = ref();

onMounted(async () => {
    await init();
});

// Load the image model and setup the webcam
const init = async () => {
    const modelURL = modelUrl.value + "model.json";
    const metadataURL = modelUrl.value + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    predictState.model = await tmImage.load(modelURL, metadataURL);
    predictState.maxPredictions = (predictState.model as any).getTotalClasses();

    console.log("predictState.model", predictState.model);
    console.log("predictState.maxPredictions", predictState.maxPredictions);

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    // webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    // await webcam.setup(); // request access to the webcam
    // await webcam.play();
    // window.requestAnimationFrame(loop);

    // append elements to the DOM
    // document.getElementById("webcam-container").appendChild(webcam.canvas);
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) { // and class labels
    //     labelContainer.appendChild(document.createElement("div"));
    // }
};

// run the webcam image through the image model
const predict = async () => {
    if (!uploadState.imgSrc) {
        alert("사진을 업로드 해주세요!");
        return;
    }
    if (predictState.classPrediction.length > 0) {
        location.reload();
        return;
    }
    logEvent(analytics, "predict", { name: "predict" });

    predictState.isLoading = true;
    await init();

    const rawModel = toRaw(predictState.model);
    const prediction = await (rawModel as any).predict(imgEl.value, false);

    for (let i = 0; i < predictState.maxPredictions; i++) {
        const percent = prediction[i].probability.toFixed(2) * 100;
        if (percent > 0) {
            predictState.classPrediction.push({
                label: prediction[i].className,
                percent,
            });
        }
    }
    predictState.isLoading = false;
    predictState.classPrediction.sort((a, b) => b.percent - a.percent);
    
    const teamName = predictState.classPrediction[0].label;
    const encodedResults = encodeURIComponent(JSON.stringify(predictState.classPrediction));
    const encodedImage = encodeURIComponent(uploadState.imgSrc);
    
    router.push(`/result/${teamName}/${encodedResults}/${encodedImage}`);
};

const file = ref();
const imgEl = ref();
const openFileUpload = () => {
    if (uploadState.imgSrc) {
        return;
    }
    (file.value as HTMLInputElement).click();
};

const uploadState = reactive({
    isShowImagUploadWrap: true,
    isShowImagUploadContent: false,
    imgSrc: "",
});

const readURL = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e: Event) {
            uploadState.isShowImagUploadWrap = false;

            console.log("e.target => ", e.target);

            uploadState.imgSrc = (e.target as FileReader)?.result as string;

            uploadState.isShowImagUploadContent = true;

            // $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
};

const removeUpload = () => {
    // $('.file-upload-input').replaceWith($('.file-upload-input').clone());

    uploadState.isShowImagUploadContent = false;
    uploadState.isShowImagUploadWrap = true;
};
// $('.image-upload-wrap').bind('dragover', function () {
// 		$('.image-upload-wrap').addClass('image-dropping');
// 	});
// 	$('.image-upload-wrap').bind('dragleave', function () {
// 		$('.image-upload-wrap').removeClass('image-dropping');
// });

const openHamburgerMenu = () => {
    headerRef.value?.openMenu();
};
</script>

<style scoped>
.file-upload {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    /* padding: 20px; */
    flex: 1;
}

.upload-container {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hidden {
    display: none;
}

.file-upload-btn {
    position: fixed;
    bottom: 10px;
    width: 100%;
    margin: 0;
    color: #fff;
    background: #bd55b6;
    border: none;
    padding: 10px;
    border-radius: 4px;
    border-bottom: 4px solid #bd55b6;
    transition: all 0.2s ease;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;
}

.file-upload-btn:hover {
    background: #b82cae;
    color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
}

.file-upload-btn:active {
    border: 0;
    transition: all 0.2s ease;
}

.file-upload-content {
    margin-top: 16px;
    text-align: center;
}

.file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
}

.image-upload-wrap {
    margin-top: 20px;
    position: relative;
}

.image-dropping,
.image-upload-wrap:hover {
    background-color: #bd55b6;
    border: 4px dashed #ffffff;
}

.image-title-wrap {
    padding: 0 15px 15px 15px;
    color: #222;
}

.drag-text {
    text-align: center;
}

.drag-text h3 {
    font-weight: 100;
    text-transform: uppercase;
    color: #bd55b6;
    padding: 60px 0;
}

.file-upload-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.remove-image {
    width: 200px;
    margin: 0;
    color: #fff;
    background: #bd55b6;
    border: none;
    padding: 10px;
    border-radius: 4px;
    border-bottom: 4px solid #bd55b6;
    transition: all 0.2s ease;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;
}

.remove-image:hover {
    background: #b82cae;
    color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
}

.remove-image:active {
    border: 0;
    transition: all 0.2s ease;
}

.my-team {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    object-fit: contain;
}

.image-container {
    width: 280px;
    height: 280px;
    border-radius: 20px;
    background: white;
    border: 2px dashed #ddd;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container:hover {
    border-color: #bd55b6;
    background: #fdf2ff;
}

.image-container.has-image {
    border-style: solid;
    border-color: #bd55b6;
}

.upload-placeholder {
    text-align: center;
    color: #666;
}

.upload-icon {
    font-size: 3rem;
    margin-bottom: 12px;
}

.upload-hint {
    display: block;
    font-size: 0.85rem;
    color: #999;
    margin-top: 8px;
}

.predict-button {
    margin-top: 20px;
    background: #bd55b6;
    color: white;
    border: none;
    padding: 12px 32px;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.predict-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(189, 85, 182, 0.3);
}
</style>
