import PropTypes from 'prop-types'
import MensagemForm from './MensagemForm'

const Mensagem = ({ mensagem, autor }) => {
    return (
      <div className='m-2'>    
        <strong>{autor}</strong>: {mensagem}
      </div>
    )
}

const Mensagens = ({ mensagens, submitMensagem }) => {
  return (
    <div className="container p-5 m-2">
      <div className="row justify-content-center">
        <div className="col md-6">
          <div className="chat-container border rounded p-3">
              {mensagens.map(mensagem => 
              <Mensagem key={mensagem.id} mensagem={mensagem.mensagem} autor={mensagem.autor}/>
            )}
          </div>
          <MensagemForm submitMensagem={submitMensagem}/>
        </div>
      </div>
    </div>
  )
}

Mensagem.propTypes = {
  mensagem: PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired
}

Mensagens.propTypes = {
  mensagens: PropTypes.array.isRequired,
  submitMensagem: PropTypes.func.isRequired
}

export default Mensagens