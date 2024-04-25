import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { enviarMensagem } from '../reducers/mensagemReducer'

const MensagemForm = () => {
  const dispatch = useDispatch()
  
  const [ mensagem, setMensagem ] = useState('')

  const addMensagem = (event) => {
      event.preventDefault()

      dispatch(enviarMensagem(mensagem))
      setMensagem('')
  }

  return (
  <div className='inputMensagem'>
    <form className="input-group mb-3" onSubmit={addMensagem}>   
        <input type="text" autoFocus className="form-control" placeholder="Mensagem" value={mensagem} onChange={({ target }) => setMensagem(target.value)}/>       
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
            <img src="https://static.thenounproject.com/png/1268238-200.png" alt="Send" id="send-icon"/>
          </button>
    </form>
  </div>
  )
}

export default MensagemForm