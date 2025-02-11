<template>
    <a :href="url" class="layer-money-btn" target="_blank" rel="noopener noreferrer">
        <span class="btn-text">{{ text }}</span>
    </a>
</template>

<script setup lang="ts">
defineProps<{
    text: string;
    url: string;
}>();
</script>

<style scoped>
.layer-money-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 12px;
    background: white;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: all 0.2s;
    width: 100%;
}

.layer-money-btn:hover {
    border-color: #bd55b6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(189, 85, 182, 0.15);
}

.btn-text {
    font-size: 1rem;
}

@media (min-width: 480px) {
    .layer-money-btn {
        padding: 20px;
    }
}
</style>
