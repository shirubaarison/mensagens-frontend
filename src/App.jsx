import { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import Mensagens from './components/Mensagens'
import MensagemForm from './components/MensagemForm'
import mensagensService from './services/mensagensService'
import LoginForm from './components/LoginForm'
import loginService from './services/loginService'

// import Menu from './components/Menu'

const App = () => {
  const [ mensagens, setMensagens ] = useState([])
  const [ user, setUser ] = useState(null)

  const ws = useRef(null)

  useEffect(() => {
    const usuarioJSON = window.localStorage.getItem('usuarioMensagensApp')
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON)
      setUser(usuario)
      mensagensService.setToken(usuario.token)
    }
  }, [])

  useEffect(() => {
    mensagensService.getAll().then(mensagens => setMensagens(mensagens));
    
    // quando buildar use esse endereço de websocket
    // ws.current = new WebSocket('wss://mensagens.onrender.com')

    ws.current = new WebSocket('ws://localhost:3002')
    ws.current.onopen = () => console.log("ws conexao estabelecida")
    ws.current.onclose = () => console.log('ws fechado')
    
    const wsCurrent = ws.current
    return () => {
      wsCurrent.close()
    }
  }, [])

  useEffect(() => {
    if (!ws.current) return
  
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      const tempId = Date.now().toString()
      const newMessage = {
        ...message, 
        id: tempId,
        user: {
          id: user.id,
          username: message.username,
        }
      }

      console.log('received', newMessage)
      // ver se o newMessage causa o bug, acho que nao (precisa de ID)
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
    } catch (exception) {
        console.error(exception)
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

  if(user) {
    return (
      <div className='main'>
        <div className='container'>
          <Mensagens mensagens={mensagens} deleteMensagem={deleteMensagem} usuario={user} />
          <MensagemForm submitMensagem={submitMensagem}/>
        </div>
      </div>
  )} else {
    return(
      <LoginForm handleLogin={handleLogin}/>
    )
  }
}

export default App
