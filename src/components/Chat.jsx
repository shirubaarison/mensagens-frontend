import Mensagens from './Mensagens'
import MensagemForm from './MensagemForm'
import Menu from './Menu'
import { useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const Chat = () => {  
  const usuariosConectados = useSelector(getUsers)
  
  return (
    <div className='main'>
        <div className='container'>
          <Menu />
          <Mensagens />
          <MensagemForm />
          <h2>Usuários conectados</h2>
          {usuariosConectados.map(u => <h1 key={u}>{u}</h1>)}
        </div>
      </div>
    )
}

export default Chat