import PropTypes from 'prop-types'

const Menu = ({ deletarUsername, usuario, deletarTudo}) => {        
    const showAdmOP = usuario === 'alysson' ? true : false

    const divClass = `container gap-2 d-flex justify-content-center p-2 mt-2`

    if (showAdmOP) {
        return (
            <div className={divClass}>
                <button className='btn btn-secondary btn-sm mr-2' onClick={deletarUsername}>trocar username</button>
                <button className='btn btn-secondary btn-sm' onClick={deletarTudo}>deletar mensagens</button>
            </div>
        )
    } else {
        return (
            <div className={divClass}>
                <button className='btn btn-secondary btn-sm' onClick={deletarUsername}>trocar username</button>
            </div>
        )
    }
}

Menu.propTypes = {
    deletarUsername: PropTypes.func.isRequired,
    usuario: PropTypes.string,
    deletarTudo: PropTypes.func,
}

export default Menu