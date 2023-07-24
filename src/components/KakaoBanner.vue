<template>
    <ins
        class="kakao_ad_area"
        style="display: none"
        data-ad-unit="DAN-tUKHxfIs9UZbbjRi"
        data-ad-width="320"
        data-ad-height="50"
    ></ins>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
    const script = "//t1.daumcdn.net/kas/static/ba.min.js";
    let tag = document.head.querySelector(`[src="${script}"`);
    if (!tag) {
        tag = document.createElement("script");
        tag.setAttribute("src", script);
        tag.setAttribute("type", "text/javascript");
        tag.setAttribute("async", "true");
        document.head.appendChild(tag);
    }
});
</script>
