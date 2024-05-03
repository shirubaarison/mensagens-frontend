import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.css'

import mensagensService from './services/mensagensService'
import loginService from './services/loginService'
import SignForm from './components/SignForm'
import Chat from './components/Chat'

import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { inicializarMensagens } from './reducers/mensagemReducer'
import { enviarNotificacao } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(inicializarMensagens())
    dispatch({ type: 'socket/connect' })
  }, [dispatch])

  const isTokenExpired = token => {
    if (!token) return true
    try {
      const decoded = jwtDecode(token)
      return decoded.exp < Date.now() / 1000
    } catch (error) {
      return true
    }
  }

  // Verificar se o usuário já existe
  useEffect(() => {
    const usuarioJSON = window.localStorage.getItem('usuarioMensagensApp')
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON)
      setUser(usuario)
      mensagensService.setToken(usuario.token)

      const isExpired = isTokenExpired(usuario.token)
      if (isExpired) {
        window.localStorage.clear()
        setUser(null)
        
        dispatch(enviarNotificacao('token expirado, entre dnv', 5))
      }
    }
  }, [dispatch])


  const handleLogin = async (loginObj) => {
    try {
        const user = await loginService.login(loginObj)

        window.localStorage.setItem(
            'usuarioMensagensApp', JSON.stringify(user)
        )

        mensagensService.setToken(user.token)
        setUser(user)

        dispatch(enviarNotificacao('Logado com sucesso :)', 5))
    } catch (exception) {
      dispatch(enviarNotificacao('Errou a senha e/ou nome', 5))
    }
  }

  const handleSign = async (regObj) => {
    try {
        await loginService.register(regObj)
        handleLogin(regObj)
    } catch (exception) {
      handleLogin(regObj)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    dispatch(enviarNotificacao('Deslogado com sucesso', 5))
  }

  if (user) {
    return (
    <div className='main'>
      <Notification />
      <Chat user={user} logout={logout}/>
    </div>
  )
  } else {
    return(
      <div className='bemvindo'>
          <Notification />
          <SignForm handleSign={handleSign} />
      </div>
    )
  }
}

export default App