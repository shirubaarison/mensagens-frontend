import Mensagens from './Mensagens'
import MensagemForm from './MensagemForm'
import Menu from './Menu'
import { useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const UsuariosConectados = () => {
  const usuariosConectados = useSelector(getUsers)
  
  return (
    <div className='usuariosConectados'>
      <h4>Usuários conectados</h4>
      <ul>
        {usuariosConectados.map(u => <li key={u}>{u}</li>)}
      </ul>
    </div>
  )
}


const Chat = () => {  
  return (
    <div className='main'>
        <Menu />
        <div className='container'>
          <div className='conjunto'>
            <div className='principal'>
              <Mensagens />
              <MensagemForm />
            </div>
            <div className='barraLateral'>
              <UsuariosConectados />
            </div>
          </div>
          
        </div>
      </div>
    )
}

export default Chat