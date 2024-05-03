import { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginSubmit = (event) => {
        event.preventDefault()
        
        dispatch(login({
            username: username,
            password: password
        }))

        setUsername('')
        setPassword('')
        navigate('/')
    }
    return (
        <div className='container p-2'>
        <form onSubmit={loginSubmit} className='inputLogin'>
            <div className="form-group px-4 mt-3">
                <label htmlFor="username">Username</label>
                <input type="text" value={username} className="form-control" name="Username" id="username" onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div className="form-group px-4 mt-3">
                <label htmlFor="username">Senha</label>
                <input type="password" value={password} className="form-control" name="Password" id="password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary btn-block" id="login-button">Entrar</button>
            </div>
        </form>
        </div>
    )
}

export default LoginForm