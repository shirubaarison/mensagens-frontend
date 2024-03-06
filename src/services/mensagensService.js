import axios from 'axios'

const baseUrl = '/api/mensagens'

const getAll = async () => {
    const response = await axios.get(baseUrl)

    return response.data
}

const enviarMensagem = async (mensagemObj) => {
    const response = await axios.post(baseUrl, mensagemObj)

    return response.data
}

const deletarMensagem = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)

    return response.data
}

export default { getAll, enviarMensagem, deletarMensagem }