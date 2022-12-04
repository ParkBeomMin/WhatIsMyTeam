<template>
  <main>
    <div class="file-upload">
  <button class="file-upload-btn" type="button" @click="openFileUpload">Add Image</button>

  <div v-show="uploadState.isShowImagUploadWrap" class="image-upload-wrap">
    <input ref="file" class="file-upload-input" type='file' @change="readURL($event);" accept="image/*" />
    <div class="drag-text">
      <h3>Drag and drop a file or select add Image</h3>
    </div>
  </div>
  <div v-show="uploadState.isShowImagUploadContent" class="file-upload-content">
    <img ref="imgEl"  class="file-upload-image" :src="uploadState.imgSrc" alt="your image" />
    <div class="image-title-wrap">
      <button type="button" @click="predict" class="remove-image"> <span class="image-title">Predict</span></button>
    </div>
  </div>
</div>
  </main>
  <!-- Copyright (c) 2022 by Aaron Vanston (https://codepen.io/aaronvanston/pen/yNYOXR)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 -->
</template>


<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/MxcfXMg36/";

    const predictState = reactive({
      model: '', 
      labelContainer: '', 
      maxPredictions: 0
    })

    onMounted(async () => {
      await init()
    })

    // Load the image model and setup the webcam
    const init  = async() => {
      
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        predictState.model = await tmImage.load(modelURL, metadataURL);
        predictState.maxPredictions = (predictState.model as any).getTotalClasses();

        console.log('predictState.model', predictState.model);
        console.log('predictState.maxPredictions', predictState.maxPredictions);
        

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
    }


    // run the webcam image through the image model
    const predict = async() => {
      await init()
        // predict can take in an image, video or canvas html element

        // Wait for the sprite sheet to load
        // image.onload = () => {
        //   Promise.all([
        //     // Cut out two sprites from the sprite sheet
        //     createImageBitmap(image, 0, 0, 32, 32),
        //     createImageBitmap(image, 32, 0, 32, 32)
        //   ]).then((sprites) => {
        //     // Draw each sprite onto the canvas
        //     ctx.drawImage(sprites[0], 0, 0);
        //     ctx.drawImage(sprites[1], 32, 32);
        //   });
        // }

        
        const prediction = await (predictState.model as any).predict(imgEl.value, false);
        // for (let i = 0; i < predictState.maxPredictions; i++) {
        //     const classPrediction =
        //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        //     console.log('classPrediction =>', classPrediction);
            
        //     // labelContainer.childNodes[i].innerHTML = classPrediction;
        // }
    }

    const file = ref()
    const imgEl = ref()
    const openFileUpload = () => {
      (file.value as HTMLInputElement).click()
    }


    const uploadState = reactive({
      isShowImagUploadWrap: true,
      isShowImagUploadContent: false,
      imgSrc: '',
    })

    const readURL = (event: Event) => {
      const input = (event.target as HTMLInputElement)
      if (input.files && input.files[0]) {

    const reader = new FileReader();

    reader.onload = function(e: Event) {
      uploadState.isShowImagUploadWrap = false

      console.log('e.target => ', e.target );
      
      
      uploadState.imgSrc = (e.target as FileReader)?.result as string
      
      uploadState.isShowImagUploadContent = true

      // $('.image-title').html(input.files[0].name);
      
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

const removeUpload = () => {
  // $('.file-upload-input').replaceWith($('.file-upload-input').clone());

  uploadState.isShowImagUploadContent = false 
       uploadState.isShowImagUploadWrap = true
}
// $('.image-upload-wrap').bind('dragover', function () {
// 		$('.image-upload-wrap').addClass('image-dropping');
// 	});
// 	$('.image-upload-wrap').bind('dragleave', function () {
// 		$('.image-upload-wrap').removeClass('image-dropping');
// });

</script>

<style scoped>
body {
  font-family: sans-serif;
  background-color: #eeeeee;
}

.file-upload {
  background-color: #ffffff;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.file-upload-btn {
  width: 100%;
  margin: 0;
  color: #fff;
  background: #1FB264;
  border: none;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 4px solid #15824B;
  transition: all .2s ease;
  outline: none;
  text-transform: uppercase;
  font-weight: 700;
}

.file-upload-btn:hover {
  background: #1AA059;
  color: #ffffff;
  transition: all .2s ease;
  cursor: pointer;
}

.file-upload-btn:active {
  border: 0;
  transition: all .2s ease;
}

.file-upload-content {
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
  border: 4px dashed #1FB264;
  position: relative;
}

.image-dropping,
.image-upload-wrap:hover {
  background-color: #1FB264;
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
  color: #15824B;
  padding: 60px 0;
}

.file-upload-image {
  max-height: 200px;
  max-width: 200px;
  margin: auto;
  padding: 20px;
}

.remove-image {
  width: 200px;
  margin: 0;
  color: #fff;
  background: #cd4535;
  border: none;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 4px solid #b02818;
  transition: all .2s ease;
  outline: none;
  text-transform: uppercase;
  font-weight: 700;
}

.remove-image:hover {
  background: #c13b2a;
  color: #ffffff;
  transition: all .2s ease;
  cursor: pointer;
}

.remove-image:active {
  border: 0;
  transition: all .2s ease;
}</style>

