<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
// import { loadScript } from "vue-plugin-load-script";
// loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js")
//       loadScript("https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js")
</script>

<template>
    <Header />
    <div class="container">
        <h1>내가 프리미어리거라면...</h1>
        <RouterView />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 480px;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
    flex: 1;
}
</style>
