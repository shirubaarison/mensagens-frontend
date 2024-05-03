import { configureStore } from '@reduxjs/toolkit'
import mensagemReducer from './reducers/mensagemReducer'
import { socketMiddleware } from './middleware/socketMiddleware'
import { Socket } from './utils/Socket'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        mensagens: mensagemReducer,
        notificacao: notificationReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(new Socket())),
})

export default store