import PropTypes from 'prop-types'

const Notification = ( { notification }) => {
    if (!notification) return null

    return (
        <div className='notification alert alert-success'>
            {notification}
        </div>
    )
}

Notification.propTypes = {
    notification: PropTypes.string
}

export default Notification