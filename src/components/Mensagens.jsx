import PropTypes from 'prop-types'

const Mensagem = ({ mensagem, deleteMensagem, autor, usuario }) => {

  const showDeleteButton = usuario.username === autor.username ? true : false

  return (  
    <>
        {!showDeleteButton &&
          <div className='m-2 d-flex justify-content-start'> 
        <span className='mensageDosOto'><strong>{autor.username}</strong>:{mensagem}</span></div>
        }
        {showDeleteButton &&
        <>
          <div className='m-2 d-flex justify-content-end align-items-center gap-2'> 
            <span className='suaMensagem'>{mensagem}</span>
            <button className='btn btn-danger btn-sm rounded-circle' id="delete-button" onClick={deleteMensagem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            </button>
          </div>
        </>
        }
    </>
    )
}

const Mensagens = ({ mensagens, deleteMensagem, usuario }) => {
  console.log(mensagens)
  return (
    <>
    <h1>Chat</h1>
    <div className='container chat'>
      <div className="row justify-content-center">
        <div className="col md-6">
          <div className="chat-container rounded p-3">
              {mensagens.map(mensagem => 
              <Mensagem key={mensagem.id} mensagem={mensagem.mensagem} autor={mensagem.user} usuario={usuario} deleteMensagem={() => deleteMensagem(mensagem.id)} />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

Mensagem.propTypes = {
  mensagem: PropTypes.string.isRequired,
  deleteMensagem: PropTypes.func.isRequired,
}

Mensagens.propTypes = {
  mensagens: PropTypes.array.isRequired,
  deleteMensagem: PropTypes.func.isRequired,
}

export default Mensagens