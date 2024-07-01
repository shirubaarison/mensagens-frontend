import { useState } from 'react'
import { register } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerSubmit = (event) => {
        event.preventDefault()
        
        dispatch(register({
            username: username,
            password: password
        }))

        setUsername('')
        setPassword('')
        navigate('/')
    }
    return (
        <div className='parent container d-flex justify-content-center align-items-center h-100'>
            <form onSubmit={registerSubmit} className='inputLogin'>
                <h1 style={{padding: '10px', margin: '10px', textAlign: 'center'}}>Registrar</h1>
                <div className="form-group px-4 mt-3">
                    <label htmlFor="username">Nome de usuário</label>
                    <input type="text" value={username} className="form-control" name="Username" id="username" onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div className="form-group px-4 mt-3">
                    <label htmlFor="username">Senha</label>
                    <input type="password" value={password} className="form-control" name="Password" id="password" onChange={({ target }) => setPassword(target.value)} />
                </div>
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary btn-block" id="register-button">Registrar</button>
                </div>
            </form>
        </div>
    )
}

export default SignForm