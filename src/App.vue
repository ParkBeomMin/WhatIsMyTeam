<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import KakaoBanner from "@/components/KakaoBanner.vue";

// import { loadScript } from "vue-plugin-load-script";
// loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js")
//       loadScript("https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js")
</script>

<template>
    <Header />
    <div class="container">
        <KakaoBanner adUnit="DAN-tUKHxfIs9UZbbjRi" :width="320" :height="50" />
        <RouterView />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex: 1;
}
</style>
