import { useState, useEffect, useRef } from 'react'
import { jwtDecode } from "jwt-decode"
import 'bootstrap/dist/css/bootstrap.css'

import mensagensService from './services/mensagensService'
import loginService from './services/loginService'
import SignForm from './components/SignForm'
import Chat from './components/Chat'

import Notification from './components/Notification'

const App = () => {
  const [ mensagens, setMensagens ] = useState([])
  const [ user, setUser ] = useState(null)

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

  const ws = useRef(null)

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

  // Pegar mensagens e criar a conexão websocket
  useEffect(() => {
    mensagensService.getAll().then(mensagens => setMensagens(mensagens));
    
    // ws.current = new WebSocket('wss://mensagens.onrender.com') // para render.com build
    ws.current = new WebSocket('ws://localhost:3002')
    
    ws.current.onopen = () => console.log("ws conexao estabelecida")
    ws.current.onclose = () => console.log('ws fechado')
    
    const wsCurrent = ws.current
    return () => {
      wsCurrent.close()
    }
  }, [])

  // Receber mensagens do websocket
  useEffect(() => {
    if (!ws.current) return
  
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      const tempId = Date.now().toString()
      // obs: gambiarra (id)
      const newMessage = {
        ...message, 
        id: tempId,
        user: {
          id: tempId,
          username: message.username,
        }
      }
      setMensagens((prevMensagens) => [...prevMensagens, newMessage])
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

  const submitMensagem = async (men) => {
    try {
      const menString = JSON.stringify(men)
      const parsedString = JSON.parse(menString)

      if (parsedString.mensagem === '') return

      if (ws.current && menString.trim() !== '') {
        const sendPkg = JSON.stringify({
          mensagem: men.mensagem,
          username: user.username
        })
        ws.current.send(sendPkg)
      }

      const response = await mensagensService.enviarMensagem(men)
      setMensagens(mensagens.concat(response))

    } catch (error) {
      console.log(error)
    }
  }

  const deleteMensagem = async (id) => {
    try {
      await mensagensService.deletarMensagem(id)

      setMensagens(mensagens.filter(m => m.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)

    notificar('sucesso')
  }

  if (user) {
    return (
    <>
      <Notification notification={notification} />
      <Chat mensagens={mensagens} deleteMensagem={deleteMensagem} user={user} submitMensagem={submitMensagem} logout={logout}/>
    </>
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