<template>
    <LayerContainer
        title="개발자 밥 사주기🍚"
        @close="setIsShowMoneyLayer({ isShow: false })"
    >
        <div class="money-box">
            <LayerMoneyBtn
                v-for="(m, i) in moneyLayerData.moneyList"
                :key="`money-${i}`"
                :text="m.text"
                :url="m.url"
            />
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
@import "../../assets/css/LayerMoney.css";
</style>
