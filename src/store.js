import { configureStore } from '@reduxjs/toolkit'
import mensagemReducer from './reducers/mensagemReducer'
import { socketMiddleware } from './middleware/socketMiddleware'
import { Socket } from './utils/Socket'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        mensagens: mensagemReducer,
        notificacao: notificationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(new Socket())),
})

export default store