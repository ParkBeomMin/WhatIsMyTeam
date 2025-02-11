<template>
    <div class="layer-backdrop">
        <div class="layer-container">
            <div class="layer-header">
                <h3 class="layer-title">{{ title }}</h3>
                <button class="close-btn" @click="close">
                    <IconClose />
                </button>
            </div>
            <div class="layer-content">
                <slot />
            </div>
        </div>
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
.layer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.layer-container {
    background: white;
    border-radius: 20px;
    width: 90%;
    max-width: 420px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.layer-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: white;
    border-radius: 20px 20px 0 0;
}

.layer-title {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
}

.close-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.layer-content {
    overflow-y: auto;
}

@media (max-width: 480px) {
    .layer-container {
        width: 100%;
        height: 100%;
        border-radius: 0;
        max-height: 100vh;
    }

    .layer-header {
        border-radius: 0;
    }
}
</style>
