import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import 'bootstrap/dist/css/bootstrap.css'

import mensagensService from './services/mensagensService'
import loginService from './services/loginService'
import SignForm from './components/SignForm'
import Chat from './components/Chat'

import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { inicializarMensagens } from './reducers/mensagemReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(inicializarMensagens())
  }, [dispatch])

  
  useEffect(() => {
    dispatch({ type: 'socket/connect' })
  }, [dispatch])

  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const notificar = (mensagem) => {
    setNotification(mensagem)
  
    setTimeout(() => {
        setNotification(null)
    }, 5000)
  } 

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
        notificar('token expirado, entre dnv')
      }
    }
  }, [])


  const handleLogin = async (loginObj) => {
    try {
        const user = await loginService.login(loginObj)

        window.localStorage.setItem(
            'usuarioMensagensApp', JSON.stringify(user)
        )

        mensagensService.setToken(user.token)
        setUser(user)

        notificar('sucesso')

    } catch (exception) {
      notificar('errou a senha e/ou nome')
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

    notificar('sucesso')
  }

  if (user) {
    return (
    <div className='main'>
      <Notification notification={notification} />
      <Chat user={user} logout={logout}/>
    </div>
  )
  } else {
    return(
      <div className='bemvindo'>
          <Notification notification={notification} />
          <SignForm handleSign={handleSign} />
      </div>
    )
  }
}

export default App