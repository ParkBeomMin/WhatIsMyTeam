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

        <div class="wrap">
            <div v-show="false" class="image-upload-wrap">
                <input
                    ref="file"
                    class="file-upload-input"
                    type="file"
                    @change="readURL($event)"
                    accept="image/*"
                />
            </div>
            <div class="file-upload-content">
                <div class="image-container" @click="openFileUpload">
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
                </div>
                <div class="image-title-wrap">
                    <button type="button" @click="predict" class="remove-image">
                        <span class="image-title">{{
                            predictState.buttonText
                        }}</span>
                    </button>
                </div>
            </div>
            <Info v-if="predictState.classPrediction.length == 0" />
        </div>

        <Result
            :resultList="(predictState.classPrediction as Array<{label: string, percent: number}>)"
        />
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
import { onMounted, reactive, ref } from "vue";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { toRaw } from "vue";
import Result from "@/components/Result.vue";
import Loading from "@/components/Loading.vue";
import ClubBanner from "@/components/ClubBanner.vue";
import Info from "../components/Info.vue";
import { getAnalytics, logEvent } from "firebase/analytics";
const analytics = getAnalytics();
// import { array } from '@tensorflow/tfjs-data';

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/IqnP46vPV/";

const predictState = reactive({
    model: "" as any,
    labelContainer: "",
    maxPredictions: 0,
    classPrediction: [] as any[],
    isLoading: false,
    myTeam: "",
    buttonText: "확인 해보기",
});

onMounted(async () => {
    await init();
});

// Load the image model and setup the webcam
const init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

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
    // predict can take in an image, video or canvas html element

    const rawModel = toRaw(predictState.model);
    const prediction = await (rawModel as any).predict(imgEl.value, false);
    console.log("prediction => ", prediction);

    for (let i = 0; i < predictState.maxPredictions; i++) {
        const percent = prediction[i].probability.toFixed(2) * 100;
        if (percent > 0) {
            predictState.classPrediction.push({
                label: prediction[i].className,
                percent,
            });
        }
        // labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    predictState.isLoading = false;
    predictState.classPrediction.sort((a, b) => b.percent - a.percent);
    console.log("classPrediction =>", predictState.classPrediction);

    predictState.myTeam = predictState.classPrediction[0].label;
    predictState.buttonText = "다시 하기";
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

.wrap {
    flex: 1;
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
    height: 200px;
    width: 200px;
    margin: auto;
    object-fit: contain;
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
    z-index: 1;
    position: absolute;
    top: 16px;
    width: 50px;
    height: 50px;
    left: 16px;

    animation-name: myTeam;
    animation-duration: 2s;
}

.image-container,
.file-upload-image {
    width: fit-content;
    margin: auto;
    height: 200px;
    width: 200px;
    border: #bd55b6 1px solid;
    border-radius: 15px;
    margin-bottom: 8px;
}

/* 키프레임 이름 = 애니메이션 이름 */
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
</style>
