import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notificar(state, action) {
            return action.payload
        },
        resetar() {
            return null
        }
    }
})

export const { notificar, resetar } = notificationSlice.actions

export const enviarNotificacao = (texto, tempo) => {
    return async dispatch => {
        dispatch(notificar(texto))

        setTimeout(() => {
            dispatch(resetar())
        }, tempo * 1000);
    } 
}

export const getNotification = state => state.notificacao

export default notificationSlice.reducer