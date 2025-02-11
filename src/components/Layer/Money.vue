<template>
    <LayerContainer
        title="개발자 밥 사주기🍚"
        @close="setIsShowMoneyLayer({ isShow: false })"
    >
        <div class="money-content">
            <p class="money-description">
                더 나은 서비스를 위해<br>
                개발자에게 커피 한 잔의 힘을<br>
                선물해주세요! ☕️
            </p>
            <div class="money-box">
                <LayerMoneyBtn
                    v-for="(m, i) in moneyLayerData.moneyList"
                    :key="`money-${i}`"
                    :text="m.text"
                    :url="m.url"
                    class="money-btn"
                />
            </div>
            <p class="money-thanks">
                여러분의 후원이<br>
                더 좋은 서비스를 만드는<br>
                원동력이 됩니다 💝
            </p>
        </div>
    </LayerContainer>
</template>

<script setup lang="ts">
import LayerContainer from "./Container.vue";
import LayerMoneyBtn from "./MoneyBtn.vue";
import { useMoneyLayer } from "../../composables/useLayer";
const { moneyLayerData, setIsShowMoneyLayer } = useMoneyLayer();
</script>

<style scoped>
.money-content {
    padding: 16px;
    text-align: center;
}

.money-description {
    color: #333;
    font-size: 1rem;
    margin-bottom: 24px;
    line-height: 1.6;
    word-break: keep-all;
    font-weight: 500;
}

.money-box {
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr;
    margin-bottom: 24px;
}

.money-thanks {
    color: #bd55b6;
    font-size: 0.95rem;
    margin: 0;
    font-weight: 500;
    line-height: 1.6;
    word-break: keep-all;
    padding: 0 16px;
}

@media (min-width: 480px) {
    .money-content {
        padding: 24px;
    }

    .money-box {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        padding: 0 16px;
    }
}
</style>
