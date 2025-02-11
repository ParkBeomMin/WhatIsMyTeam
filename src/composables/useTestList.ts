import { ref } from 'vue'

export interface Test {
    id: string;
    name: string;
    icon: string;
    path: string;
    modelUrl: string;
}

const testList = ref<Test[]>([
    {
        id: 'premier22-23',
        name: '22-23 프리미어리그',
        icon: '/icons/premier.png',
        path: '/',
        modelUrl: 'https://teachablemachine.withgoogle.com/models/IqnP46vPV/'
    },
    {
        id: 'premier23-24',
        name: '23-24 프리미어리그',
        icon: '/icons/premier.png',
        path: '/premier23-24',
        modelUrl: 'your-model-url-here'
    },
    {
        id: 'laliga23-24',
        name: '23-24 라리가',
        icon: '/icons/laliga.png',
        path: '/laliga',
        modelUrl: 'your-model-url-here'
    }
]);

export function useTestList() {
    const getCurrentTest = (path: string) => {
        return testList.value.find(test => test.path === path) || testList.value[0];
    };

    return {
        testList,
        getCurrentTest
    }
} 