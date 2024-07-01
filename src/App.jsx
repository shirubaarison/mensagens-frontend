import { useEffect } from 'react'

import SignForm from './components/SignForm'
import Chat from './components/Chat'

import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { inicializarMensagens } from './reducers/mensagemReducer'
import { Route, Routes } from 'react-router-dom'
import { getUser, inicializarUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BemVindo from './components/BemVindo'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(getUser)

  useEffect(() => {
    dispatch(inicializarMensagens())
    dispatch(inicializarUser())
    dispatch({ type: 'socket/connect' })
  }, [dispatch])

  return (
    <>
      <Notification />
      <Routes>
        <Route path='/' element={user ? <Chat /> : <BemVindo />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<SignForm />} />
      </Routes>
    </>
  )
}

export default App