import axios from 'axios'

const baseUrl = '/api/users/usuariosConectados'

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)

    return response.data
}

export default { getAllUsers }