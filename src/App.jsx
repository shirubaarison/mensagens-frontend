import { useState, useEffect, useRef } from 'react'
import DeliciasLogo from './assets/delicias.png'
import 'bootstrap/dist/css/bootstrap.css'

import Mensagens from './components/Mensagens'
import MensagemForm from './components/MensagemForm'
import mensagensService from './services/mensagensService'

import Menu from './components/Menu'

// TODO: melhorar essa merda
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
  const [ user, setUser ] = useState('')

  const ws = useRef(null)

  useEffect(() => {
    const usuarioJSON = window.localStorage.getItem('usuarioMensagensApp')
    let usuario
    if (usuarioJSON) {
      usuario = JSON.parse(usuarioJSON)
      setUser(usuario)
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
      const newMessage = {...message, id: tempId}

      // ver se o newMessage causa o bug, acho que nao (precisa de ID)
      setMensagens((prevMensagens) => [...prevMensagens, newMessage])
    }
  }, [])

  const submitMensagem = async (men) => {
    const menString = JSON.stringify(men)
    const parsedString = JSON.parse(menString)
    if (parsedString.mensagem === '') return

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

  const deletarUsername = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // buggy code
  const deletarTudo = async () => {
    try {
      // ele tira o autor ai precisa refazer o nome dnv (?)
      await mensagensService.deletarTudo() 
      setMensagens([]) 
      setUser('') // lol, assim funciona pois é obrigatorio digitar dnv 
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='main'>
      <BigLogo /> 
      <div className='container'>
        <Mensagens mensagens={mensagens} deleteMensagem={deleteMensagem} usuario={user} />
        <MensagemForm submitMensagem={submitMensagem} usuario={user} setUsuario={setUser}/>
        <Menu deletarUsername={deletarUsername} usuario={user} deletarTudo={deletarTudo}/>
      </div>
    </div>
  )
}

export default App
