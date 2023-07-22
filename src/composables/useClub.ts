import { reactive } from "vue";

export const useClub = () => {
    const clubList = reactive([
        "Arsenal",
        "Aston-Villa",
        "Bournemouth",
        "Brentford",
        "Brighton-and-Hove-Albion",
        "Chelsea",
        "Crystal-Palace",
        "Everton",
        "Fulham",
        "Leeds-United",
        "Leicester-City",
        "Liverpool",
        "Manchester-City",
        "Manchester-United",
        "Newcastle-United",
        "Nottingham-Forest",
        "Southampton",
        "Tottenham-Hotspur",
        "West-Ham-United",
        "Wolverhampton-Wanderers",
    ]);

    return { clubList };
};
