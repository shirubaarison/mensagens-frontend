import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const getRandomNumber = () => {
  const magicNum = 10339
  const num = Math.floor(Math.random() * magicNum)

  return num
}


const MensagemForm = ({ submitMensagem }) => {
    const [ mensagem, setMensagem ] = useState('')
    const [ nome, setNome ] = useState('')
    const [ showUsername, setShowUsername ] = useState(true)

    useEffect(() => {
      const usuarioJSON = window.localStorage.getItem('usuarioMensagensApp')
      if (usuarioJSON) { 
        const usuario = JSON.parse(usuarioJSON)
        setNome(usuario)
        setShowUsername(false)
      }
    }, [])

    const addMensagem = (event) => {
        event.preventDefault()
        
        let randomUser = `anonymous${getRandomNumber()}`
        if (nome === '') {
          setNome(randomUser)
        }

        if (mensagem !== '') {
            submitMensagem({
                mensagem: mensagem,
                autor: nome !== '' ? nome : randomUser
            })
            
            window.localStorage.setItem(
              'usuarioMensagensApp', JSON.stringify(nome)
          )

            setMensagem('')
            setShowUsername(false)
        }
    }

    return (
    <div className='container p-2 inputMensagem'>
      <form className="input-group mb-3" onSubmit={addMensagem}>
          <input type="text" className="form-control" placeholder="Mensagem" value={mensagem} onChange={({ target }) => setMensagem(target.value)}/>
          {showUsername && <input type="text" className="form-control" placeholder="Nome" value={nome} onChange={({ target }) => setNome(target.value)}/>}
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Enviar</button>
      </form>
    </div>
    )
}

MensagemForm.propTypes = {
    submitMensagem: PropTypes.func.isRequired
}

export default MensagemForm