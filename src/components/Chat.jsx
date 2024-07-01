import Mensagens from './Mensagens'
import MensagemForm from './MensagemForm'
import Menu from './Menu'

const Chat = () => {  
  return (
    <div className='main'>
        <div className='container'>
          <Menu />
          <Mensagens />
          <MensagemForm />
        </div>
      </div>
    )
}

export default Chat