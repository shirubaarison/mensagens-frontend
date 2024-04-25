import { createSlice } from '@reduxjs/toolkit'
import mensagensService from '../services/mensagensService'

const mensagemSlice = createSlice({
    name: 'mensagem',
    initialState: [],
    reducers: {
        adicionarMensagem(state, action) {
            state.push(action.payload) 
        },
        setMensagens(state, action) {
            return action.payload
        },
        deleteMensagem(state, action) {
            return state.filter(mensagem => mensagem.id !== action.payload)
        }
    }
})

export const { adicionarMensagem, setMensagens, deleteMensagem } = mensagemSlice.actions

export const inicializarMensagens = () => {
    return async dispatch => {
        const mensagens = await mensagensService.getAll()
        dispatch(setMensagens(mensagens))
    }
}

export const enviarMensagem = (mensagem) => {
    return async dispatch => {
        const response = await mensagensService.enviarMensagem({ mensagem })
        dispatch(adicionarMensagem(response))
        dispatch({ type: 'socket/send', payload: response })
    }
}

export const deletarMensagem = (id) => {
    return async dispatch => {
        await mensagensService.deletarMensagem(id)
        dispatch(deleteMensagem(id))
    }
}

export const getMensagens = state => state.mensagens

export default mensagemSlice.reducer