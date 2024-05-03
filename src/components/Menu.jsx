import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from '../reducers/userReducer'

const Menu = () => {        
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const adeus = () => {
        dispatch(logout())
    }

    const divClass = `container d-flex justify-content-end mb-2`

    return (
        <div>
            {user && 
                <div className={divClass}>
                    <button className='btn btn-secondary btn-sm' onClick={adeus}>log out</button>
                </div>
            }
        </div>
    )
}

export default Menu