import { useState } from 'react'
import { usePrayersContext } from '../hooks/usePrayersContext'

const PrayerForm = () => {
    const { dispatch } = usePrayersContext()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const prayer = {title, content}

        const response = await fetch('/api/prayers', {
            method: 'POST',
            body: JSON.stringify(prayer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setEmptyFields(json.emptyFields)
            setError(json.error)
        }
        if (response.ok) {
            setEmptyFields([])
            setTitle('')
            setContent('')
            setError(null)
            console.log('new prayer added', json)
            dispatch({type: 'CREATE_PRAYER', payload: json})
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3 className='h3'>Add a New Prayer</h3>

            <label className='label'>Prayer Title</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''}/>
            <label className='label'>Content</label>
            <input type='text' onChange={(e) => setContent(e.target.value)} value={content} className={emptyFields.includes('content') ? 'error' : ''}/>

            <button>Add Prayer</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default PrayerForm