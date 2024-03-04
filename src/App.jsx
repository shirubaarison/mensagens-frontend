import { useState, useEffect } from 'react'
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

  useEffect(() => {
    mensagensService.getAll().then(mensagens => setMensagens(mensagens) )
  }, [])

  const submitMensagem = async (men) => {
    try {
      const response = await mensagensService.enviarMensagem(men)
      setMensagens(mensagens.concat(response))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='main'>
      <BigLogo />
      <h1>Bem vindo!!</h1>
      <Mensagens mensagens={mensagens} submitMensagem={submitMensagem} />
    </div>
  )
}

export default App
