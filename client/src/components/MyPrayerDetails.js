import { usePrayersContext } from "../hooks/usePrayersContext"
import { useState } from "react"

// format date package
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MyPrayerDetails = ({prayer}) => {
    const [count, setCount] = useState(prayer.prayer_count)
    const { dispatch } = usePrayersContext()
    
    const deletePrayer = async () => {
        const response = await fetch('/api/prayers/' + prayer._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_PRAYER', payload: json})
        }
    }

    const updatePrayerStatus = async () => {
        await fetch('/api/prayers/' + prayer._id, {
            method: 'PATCH',
            body: JSON.stringify({
                "status": 'complete'
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
    }

    const updatePrayerCount = async () => {
        var response = await fetch('/api/prayers/' + prayer._id, {
            method: 'GET'
        })
        var current_prayer = await response.json()
        var new_count = current_prayer.prayer_count + 1

        await fetch('/api/prayers/' + prayer._id, {
            method: 'PATCH',
            body: JSON.stringify({
                "prayer_count": new_count
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })

        current_prayer.prayer_count = new_count
        
        setCount(new_count)
    }

    return (
        <div className="prayer-details">
            <div className="prayer-details-contents">
                <div className="prayer-details-title">
                    <h4>{prayer.title}</h4>
                </div>
                <div className="prayer-details-content">
                    <p>{prayer.content}</p>
                </div>
            </div>
            <div className="prayer-details-buttons">
                <button className='material-symbols-outlined' onClick={deletePrayer} value='delete'>delete</button>
                <button className='material-symbols-outlined' onClick={updatePrayerStatus}>done</button>
                <button className='material-symbols-outlined' onClick={updatePrayerCount}>record_voice_over</button>
                <div className="count_button">{count}</div>
            </div>
        </div>
    )
}

export default MyPrayerDetails