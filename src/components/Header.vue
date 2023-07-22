<template>
    <header>
        <button class="share-btn" @click="share"><IconShare /></button>
        <button
            class="money-btn"
            @click="setIsShowMoneyLayer({ isShow: true })"
        >
            <IconMoney />
        </button>
        <MoneyLayer v-if="moneyLayerData.isShow" />
    </header>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import copy from "copy-to-clipboard";
import IconShare from "../components/icons/IconShare.vue";
import IconMoney from "../components/icons/IconMoney.vue";
import MoneyLayer from "../components/Layer/Money.vue";
import { useMoneyLayer } from "../composables/useLayer";
const { moneyLayerData, setIsShowMoneyLayer } = useMoneyLayer();

const { title } = defineProps<{ title: string }>();

const share = () => {
    copy(`${window.location}`);
    Swal.fire({
        html: "클립보드에 복사된 링크로<br>친구들에게 공유해보세요!",
    });
};
</script>

<style scoped>
@import "../assets/css/Header.css";
</style>
