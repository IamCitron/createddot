import { PrayerContext } from "../context/PrayerContext";
import { useContext } from "react";

export const usePrayersContext = () => {
    const context = useContext(PrayerContext)

    if (!context) {
        throw Error('usePrayersContext must be used inside a PrayerContextProvider')
    }

    return context
}