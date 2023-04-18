import { useEffect } from "react"
import { usePrayersContext } from "../hooks/usePrayersContext"

// components
import PrayerDetails from '../components/PrayerDetails'
import PrayerForm from '../components/PrayerForm'
import MyPrayerDetails from '../components/MyPrayerDetails'

const Home = () => {
    const {prayers, dispatch} = usePrayersContext()

    useEffect(() => {
        const fetchPrayers = async () => {
            const res = await fetch('/api/prayers')
            const json = await res.json()

            if (res.ok) {
                dispatch({type: 'SET_PRAYERS', payload: json})
            }
        }

        fetchPrayers()
    }, [dispatch])

    return (
        <div className="home">
            <div className="prayers">
                <h3 className="h3">My Prayers</h3>
                {prayers && prayers.map((prayer) => (
                    <MyPrayerDetails key={prayer._id} prayer={prayer}/>
                ))}
                {/* {prayers && prayers.map((prayer) => (
                    <PrayerDetails key={prayer._id} prayer={prayer}/>
                ))} */}
            </div>
            <PrayerForm />
        </div>
    )
}

export default Home