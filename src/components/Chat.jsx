import Mensagens from './Mensagens'
import MensagemForm from './MensagemForm'
import Menu from './Menu'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../reducers/userReducer'

const Chat = () => {
  const user = useSelector(getUser)
  
  const padding = {
    paddingRight: 5
  }
  
  if(user) {
    return (
      <div className='main'>
          <div className='container'>
            <Menu />
            <Mensagens usuario={user} />
            <MensagemForm />
          </div>
        </div>
      )
  }
  else {
    return (
      <div>
        <Link to='/login' style={padding}>login</Link>
        <Link to='/register' style={padding}>register</Link>
      </div>
    )
  }
  
}

export default Chat