import { useEffect } from 'react'

import SignForm from './components/SignForm'
import Chat from './components/Chat'

import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { inicializarMensagens } from './reducers/mensagemReducer'
import { Route, Routes } from 'react-router-dom'
import { inicializarUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(inicializarMensagens())
    dispatch(inicializarUser())
    dispatch({ type: 'socket/connect' })
  }, [dispatch])

    return (
      <>
        <div className='bemvindo'>
            <Notification />
            <Routes>
              <Route path='/' element={<Chat />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<SignForm />} />
            </Routes>

        </div>
      </>
    )
}

export default App