import { createSlice } from '@reduxjs/toolkit'
import mensagensService from '../services/mensagensService'
import { enviarNotificacao } from './notificationReducer'
import loginService from '../services/loginService'
import { jwtDecode } from 'jwt-decode'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        reset() {
            return null
        }
    }
})

export const { setUser, reset } = userSlice.actions

export const isTokenExpired = token => {
    if (!token) return true
    
    try {
      const decoded = jwtDecode(token)
      
      return decoded.exp < Date.now() / 1000
    } catch (error) {
      return true
    }
  }

export const inicializarUser = () => {
    return async dispatch => {
        const usuarioJSON = window.localStorage.getItem('usuarioMensagensApp')
        if (usuarioJSON) {
            const usuario = JSON.parse(usuarioJSON)
            const isExpired = isTokenExpired(usuario.token)
            if(isExpired) {
                window.localStorage.removeItem('usuarioMensagensApp')

                dispatch(enviarNotificacao('token expirado, entre dnv', 5))
            } else {
                dispatch(setUser(usuario))
                mensagensService.setToken(usuario.token)
                dispatch({ type: 'socket/send', payload: { novoUser: usuario.username }})
            }
        }
    }
}

export const logout = (user) => {
    return async dispatch => {
        window.localStorage.removeItem('usuarioMensagensApp')
        dispatch(reset())
        dispatch(enviarNotificacao('Você saiu da conta', 5))
        dispatch({ type: 'socket/send', payload: { saiuUser: user.username }})
    }
}

export const login = loginObj => {
    return async dispatch => {
        try {
            const response = await loginService.login(loginObj)
            window.localStorage.setItem(
                'usuarioMensagensApp', JSON.stringify(response)
            )

            mensagensService.setToken(response.token)
            dispatch(setUser(response))
            dispatch(enviarNotificacao('Logado com sucesso :)', 5))
            dispatch({ type: 'socket/send', payload: { novoUser: loginObj.username } })
        } catch (err) {
            dispatch(enviarNotificacao('Errou a senha e/ou nome', 5))
        }
    }
}

export const register = userObj => {
    return async dispatch => {
        try {
            await loginService.register(userObj)
            login(userObj)
            dispatch(enviarNotificacao('Sucesso', 5))
        } catch (err) {
            dispatch(enviarNotificacao('algo deu errado', 5))
        }
    }
}

export const getUser = state => state.user

export default userSlice.reducer