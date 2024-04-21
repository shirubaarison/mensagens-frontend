import Mensagens from './Mensagens'
import MensagemForm from './MensagemForm'
import Menu from './Menu'

import PropTypes from 'prop-types'

const Chat = ({ mensagens, deleteMensagem, user, submitMensagem, logout }) => {
    return (
    <div className='main'>
        <div className='container'>
          <Menu logout={logout} />
          <Mensagens mensagens={mensagens} deleteMensagem={deleteMensagem} usuario={user} />
          <MensagemForm submitMensagem={submitMensagem}/>
        </div>
      </div>
    )
}

Chat.propTypes = {
    mensagens: PropTypes.array,
    deleteMensagem: PropTypes.func,
    user: PropTypes.object,
    submitMensagem: PropTypes.func,
    logout: PropTypes.func
}

export default Chat