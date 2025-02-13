<template>
    <ins
        class="kakao_ad_area"
        style="display: none"
        :data-ad-unit="adUnit"
        :data-ad-width="width"
        :data-ad-height="height"
    ></ins>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

interface Props {
    adUnit: string;
    width?: number;
    height?: number;
}

const props = withDefaults(defineProps<Props>(), {
    width: 320,
    height: 50
});

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
