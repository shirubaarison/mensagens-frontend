import { useState } from 'react'
import PropTypes from 'prop-types'

const RegisterForm = ({ handleRegister }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerSubmit = (event) => {
        event.preventDefault()
        
        handleRegister({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }
    return (
    <div className='container p-2'>
        <form onSubmit={registerSubmit} className='inputLogin'>
            <div className="form-group px-4 mt-3">
                <label htmlFor="username">Username</label>
                <input type="text" value={username} className="form-control" name="Username" id="username" onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div className="form-group px-4 mt-3">
                <label htmlFor="username">Senha</label>
                <input type="password" value={password} className="form-control" name="Password" id="password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary btn-block" id="login-button">Registrar</button>
            </div>
        </form>
    </div>
    )
}

RegisterForm.propTypes = {
    handleRegister: PropTypes.func.isRequired
}

export default RegisterForm