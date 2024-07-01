import { adicionarMensagem } from "../reducers/mensagemReducer"
import { addNewUser, logoutUser } from "../reducers/usersReducer"

export const socketMiddleware = (socket) => (params) => (next) => (action) => {
    const { dispatch } = params
    const { type, payload } = action
    
    switch (type) {
        case 'socket/connect':
            socket.connect('ws://localhost:3002')
            // socket.connect('wss://mensagens.onrender.com')

            socket.on('open', () => { console.log('conexão estabelecida com websocket')})
            socket.on('message', (data) => { 
                const mensagem = JSON.parse(data.data)
                console.log(mensagem)
                dispatch(adicionarMensagem(mensagem))
                if(mensagem.novoUser) {
                    dispatch(addNewUser(mensagem.novoUser))
                }
                if(mensagem.saiuUser) {
                    dispatch(logoutUser(mensagem.saiuUser))
                }
            })
            socket.on('close', () => { console.log('adeus') })
            break

        case 'socket/disconnect':
            socket.disconnect()
            break
        
        case 'socket/send':
            socket.send(payload)
            break
        
        default:
            break
        }

    return next(action)
}