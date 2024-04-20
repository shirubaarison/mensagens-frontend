import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginSubmit = (event) => {
        event.preventDefault()
        
        handleLogin({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }
    return (
    <div className='container p-2'>
        <form onSubmit={loginSubmit} className='inputLogin'>
            <div className="form-group px-4 mt-3">
                <label htmlFor="username">Username</label>
                <input type="text" value={username} className="form-control" name="Username" id="username" placeholder="Enter username" onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div className="form-group px-4 mt-3">
                <label htmlFor="username">Password</label>
                <input type="password" value={password} className="form-control" name="Password" id="password" placeholder="Enter password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary btn-block" id="login-button">Login</button>
            </div>
        </form>
    </div>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
}

export default LoginForm