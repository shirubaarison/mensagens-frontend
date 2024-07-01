import { adicionarMensagem } from "../reducers/mensagemReducer"

export const socketMiddleware = (socket) => (params) => (next) => (action) => {
    const { dispatch } = params
    const { type, payload } = action

    switch (type) {
    case 'socket/connect':
        socket.connect('ws://localhost:3002')
        // socket.connect('ws://mensagens.onrender.com')

        socket.on('open', () => { console.log('conexão estabelecida com websocket')})
        socket.on('message', (data) => { 
            const mensagem = JSON.parse(data.data)
            dispatch(adicionarMensagem(mensagem))
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