import { reactive } from "vue";

const moneyLayerData = reactive<{
    isShow: boolean;
    moneyList: Array<{ text: string; url: string }>;
}>({
    isShow: false,
    moneyList: [
        {
            text: "🍺",
            url: "https://qr.kakaopay.com/Ej7qeAGsJ7d006900",
        },
        {
            text: "☕️",
            url: "https://qr.kakaopay.com/Ej7qeAGsJ3e807242",
        },
        {
            text: "🍫",
            url: "https://qr.kakaopay.com/Ej7qeAGsJ1f402891",
        },
    ],
});
export const useMoneyLayer = () => {
    const setIsShowMoneyLayer = ({ isShow }: { isShow: boolean }) => {
        moneyLayerData.isShow = isShow;
    };

    return {
        moneyLayerData,
        setIsShowMoneyLayer,
    };
};
