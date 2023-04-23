import { createContext, useReducer } from "react";

export const PrayerContext = createContext()

export const prayersReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PRAYERS':
            return {
                prayers: action.payload
            }
        case 'CREATE_PRAYER':
            console.log(JSON.stringify(action))
            return {
                prayers: [action.payload, ...state.prayers]
            }
        case 'DELETE_PRAYER':
            return {
                prayers: state.prayers.filter((p) => p._id !== action.payload._id )
            }
        case 'UPDATE_PRAYER_COUNT':
            return {
                prayers: state.prayers
            }
        case 'UPDATE_PRAYER_STATUS':
            return {
                prayers: state.prayers.filter((p) => p._id !== action.payload._id )
            }
        default:
            return state
    }
}

export const PrayerContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(prayersReducer, {
        prayers: null
    })


    return (
        <PrayerContext.Provider value={{...state, dispatch}}>
            { children }
        </PrayerContext.Provider>
    )
}