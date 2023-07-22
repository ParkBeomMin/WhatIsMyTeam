<template>
    <div class="layer-container">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="close"><IconClose /></button>
        <slot />
    </div>
</template>

<script setup lang="ts">
import IconClose from "../icons/IconClose.vue";
const { title = "" } = defineProps({
    title: String,
});

const emit = defineEmits<{ (e: "close"): void }>();

const close = () => {
    emit("close");
};
</script>

<style scoped>
@import "../../assets/css/Layer.css";
</style>
