import { useSelector } from 'react-redux'
import { getNotification } from '../reducers/notificationReducer'

const Notification = () => {
    const notification = useSelector(getNotification)
    
    if (!notification) return null

    return (
        <div className='notification alert alert-success'>
            {notification}
        </div>
    )
}

export default Notification