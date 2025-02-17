import { ref } from 'vue'

export interface Test {
    id: string;
    name: string;
    icon: string;
    path: string;
    modelUrl: string;
    clubList: string[];
}

const testList = ref<Test[]>([
    {
        id: 'premier24-25',
        name: '24-25 프리미어리그',
        icon: '/pl-logo.png',
        path: '/premier24-25',
        modelUrl: 'https://teachablemachine.withgoogle.com/models/OIOdAuUHz/',
        clubList: ['Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton & Hove Albion', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Ipswich Town', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United', 'Newcastle United', 'Nottingham Forest', 'Southampton', 'Tottenham Hotspur', 'West Ham United', 'Wolverhampton Wanderers']
    },
    {
        id: 'premier22-23',
        name: '22-23 프리미어리그',
        icon: '/pl-logo.png',
        path: '/premier22-23',
        modelUrl: 'https://teachablemachine.withgoogle.com/models/IqnP46vPV/',
        clubList: ['Arsenal', 'Aston-Villa', 'Bournemouth', 'Brentford', 'Brighton-and-Hove-Albion', 'Chelsea', 'Crystal-Palace', 'Everton', 'Fulham', 'Leeds-United', 'Leicester-City', 'Liverpool', 'Manchester-City', 'Manchester-United', 'Newcastle-United', 'Nottingham-Forest', 'Southampton', 'Tottenham-Hotspur', 'West-Ham-United', 'Wolverhampton-Wanderers']
    },
    {
        id: 'kickgoal-G-league',
        name: '골때녀 G-리그',
        icon: '/kickgoal-logo.png',
        path: '/kickgoal-G-league',
        modelUrl: 'https://teachablemachine.withgoogle.com/models/v1pv-vpbX/',
        clubList: ['FC개벤져스', 'FC국대패밀리', 'FC불나비', 'FC액셔니스타', 'FC탑걸']
    },
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