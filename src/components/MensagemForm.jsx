import PropTypes from 'prop-types'
import { useState } from 'react'

const MensagemForm = ({ submitMensagem }) => {
    const [ mensagem, setMensagem ] = useState('')

    const addMensagem = (event) => {
        event.preventDefault()

        submitMensagem({
            mensagem: mensagem,
        })
        
        setMensagem('')
        }

    return (
    <div className='container p-2 inputMensagem'>
      <form className="input-group mb-3" onSubmit={addMensagem}>   
          <input type="text" autoFocus className="form-control" placeholder="Mensagem" value={mensagem} onChange={({ target }) => setMensagem(target.value)}/>       
            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
              <img src="https://static.thenounproject.com/png/1268238-200.png" alt="Send" id="send-icon"/>
            </button>
      </form>
    </div>
    )
}

MensagemForm.propTypes = {
    submitMensagem: PropTypes.func.isRequired,
}

export default MensagemForm