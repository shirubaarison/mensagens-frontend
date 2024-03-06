import { useState, useEffect, useRef } from 'react'
import DeliciasLogo from './assets/delicias.png'
import 'bootstrap/dist/css/bootstrap.css'

import Mensagens from './components/Mensagens'
import mensagensService from './services/mensagensService'

const BigLogo = () => {
  return (
    <div className='mainLogo'>
      <img src={DeliciasLogo}></img>
      <div className='semicircle'>
      </div>
    </div>
  )
}

const App = () => {
  const [ mensagens, setMensagens ] = useState([])
  const ws = useRef(null)

  useEffect(() => {
    mensagensService.getAll().then(mensagens => setMensagens(mensagens));
    
    ws.current = new WebSocket('wss://mensagens.onrender.com:')
    ws.current.onopen = () => console.log("ws opened")
    ws.current.onclose = () => console.log("ws closed")

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
      const newMessage = {...message, id: tempId}
      // ver se o newMessage causa o bug, acho que nao
      setMensagens((prevMensagens) => [...prevMensagens, newMessage])
    }
  }, [])

  const submitMensagem = async (men) => {
    const menString = JSON.stringify(men)
    
    try {
      if (ws.current && menString.trim() !== '') {
        ws.current.send(menString)
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

  return (
    <div className='main'>
      <BigLogo />
      <Mensagens mensagens={mensagens} submitMensagem={submitMensagem} deleteMensagem={deleteMensagem} />
    </div>
  )
}

export default App
