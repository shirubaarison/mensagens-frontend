import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const MensagemForm = ({ submitMensagem, usuario, setUsuario }) => {
    const [ mensagem, setMensagem ] = useState('')
    const [ username, setUsername ] = useState(usuario)
    const [ showUsername, setShowUsername ] = useState(true)

    useEffect(() => {
      if (usuario) {
        setShowUsername(false)
        setUsername(usuario)
      }
      else setShowUsername(true)
    }, [usuario])

    const addMensagem = (event) => {
        event.preventDefault()

        if (mensagem !== '' || username !== '') {
            submitMensagem({
                mensagem: mensagem,
                autor: username
            })
            
            window.localStorage.setItem(
              'usuarioMensagensApp', JSON.stringify(usuario)
            )
            
            setMensagem('')
            setShowUsername(false)
            setUsuario(username)
        }
    }

    return (
    <div className='container p-2 inputMensagem'>
      <form className="input-group mb-3" onSubmit={addMensagem}>
      {!showUsername && 
        <>    
          <input type="text" autoFocus className="form-control" placeholder="Mensagem" value={mensagem} onChange={({ target }) => setMensagem(target.value)}/>       
            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
              <img src="https://static.thenounproject.com/png/1268238-200.png" alt="Send" id="send-icon"/>
            </button>
        </>}
      {showUsername && 
        <>
          <input type="text" autoFocus className="form-control" placeholder="Nome" value={username} onChange={({ target }) => setUsername(target.value)}/>
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
              <img src="https://static.thenounproject.com/png/1268238-200.png" alt="Send" id="send-icon"/>
            </button>
        </>}
      </form>
    </div>
    )
}

MensagemForm.propTypes = {
    submitMensagem: PropTypes.func.isRequired,
    usuario: PropTypes.string,
    setUsuario: PropTypes.func.isRequired
}

export default MensagemForm