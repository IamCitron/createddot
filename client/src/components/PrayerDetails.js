import { usePrayersContext } from "../hooks/usePrayersContext"

// format date package
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PrayerDetails = ({prayer}) => {
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

    return (
        <div className="prayer-details">
            <h4>{prayer.title}</h4>
            <p><strong>CONTENT: </strong>{prayer.content}</p>
            <p>TIME CREATED: {formatDistanceToNow(new Date(prayer.createdAt), { addSuffix: true })}</p>
            <br/>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default PrayerDetails