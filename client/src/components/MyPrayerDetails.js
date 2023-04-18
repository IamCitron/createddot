import { usePrayersContext } from "../hooks/usePrayersContext"

// format date package
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MyPrayerDetails = ({prayer}) => {
    const { dispatch } = usePrayersContext()
    
    const handleClick = async () => {
        const response = await fetch('/api/prayers/' + prayer._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_PRAYER', payload: json})
        }
    }

    const prayerComplete = async () => {

    }

    const addPrayer = async () => {

    }

    return (
        <div className="prayer-details">
            <div className="prayer-details-contents">
                <div className="prayer-details-title">
                    <h4>{prayer.title}</h4>
                    {/* <p>TIME CREATED: {formatDistanceToNow(new Date(prayer.createdAt), { addSuffix: true })}</p> */}
                </div>
                <div className="prayer-details-content">
                    <p>{prayer.content}</p>
                </div>
            </div>
            <div className="prayer-details-buttons">
                <button className='material-symbols-outlined' onClick={handleClick} value='delete'>delete</button>
                <button className='material-symbols-outlined' onClick={prayerComplete}>done</button>
                <button className='material-symbols-outlined' onClick={addPrayer}>record_voice_over</button>
                <countbutton>0</countbutton>
            </div>
        </div>
    )
}

export default MyPrayerDetails