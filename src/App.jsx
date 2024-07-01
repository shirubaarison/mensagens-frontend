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
    dispatch({ type: 'socket/connect' })
    // Isso é uma gambiarra pra esperar o WS conectar primeiro, o certo era esperar né...
    setTimeout(() => {
      dispatch(inicializarUser())
      dispatch(inicializarMensagens())
    }, 1000)
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