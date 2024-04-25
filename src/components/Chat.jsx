import Mensagens from './Mensagens'
import MensagemForm from './MensagemForm'
import Menu from './Menu'

import PropTypes from 'prop-types'

const Chat = ({ user, logout }) => {
    return (
    <div className='main'>
        <div className='container'>
          <Menu logout={logout} />
          <Mensagens usuario={user} />
          <MensagemForm />
        </div>
      </div>
    )
}

Chat.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
}

export default Chat