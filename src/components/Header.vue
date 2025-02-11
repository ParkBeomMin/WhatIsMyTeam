<template>
    <header>
        <HamburgerMenu :is-open="menuOpen" @update:is-open="menuOpen = $event" />
        <div class="right-buttons">
            <button class="share-btn" @click="share">
                <IconShare />
            </button>
            <button
                class="money-btn"
                @click="setIsShowMoneyLayer({ isShow: true })"
            >
                <IconMoney />
            </button>
        </div>
        <MoneyLayer v-if="moneyLayerData.isShow" />
    </header>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import copy from "copy-to-clipboard";
import IconShare from "../components/icons/IconShare.vue";
import IconMoney from "../components/icons/IconMoney.vue";
import MoneyLayer from "../components/Layer/Money.vue";
import HamburgerMenu from "./HamburgerMenu.vue";
import { useMoneyLayer } from "../composables/useLayer";
import { useHamburgerMenu } from '../composables/useHamburgerMenu';

const { moneyLayerData, setIsShowMoneyLayer } = useMoneyLayer();
const { menuOpen } = useHamburgerMenu();

const share = () => {
    copy(`${window.location}`);
    Swal.fire({
        html: "클립보드에 복사된 링크로<br>친구들에게 공유해보세요!",
    });
};

defineExpose({
    menuOpen
});
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: relative;
    z-index: 1000;
}

.right-buttons {
    display: flex;
    gap: 12px;
}

.share-btn,
.money-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.share-btn:hover,
.money-btn:hover {
    background-color: rgba(189, 85, 182, 0.1);
}

:deep(svg) {
    width: 24px;
    height: 24px;
}
</style>
