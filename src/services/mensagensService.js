import axios from 'axios'

const baseUrl = '/api/mensagens'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)

    return response.data
}

const enviarMensagem = async (mensagemObj) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, mensagemObj, config)

    return response.data
}

const deletarMensagem = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)

    return response.data
}

const deletarTudo = async () => {
    await axios.post(`${baseUrl}/reset`)
}

export default { getAll, enviarMensagem, deletarMensagem, deletarTudo, setToken }