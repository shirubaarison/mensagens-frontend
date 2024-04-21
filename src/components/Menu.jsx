import PropTypes from 'prop-types'

const Menu = ({ logout }) => {        
    const divClass = `container d-flex justify-content-end mb-2`

    return (
        <div className={divClass}>
            <button className='btn btn-secondary btn-sm' onClick={logout}>log out</button>
        </div>
    )
}

Menu.propTypes = {
    logout: PropTypes.func.isRequired,
    usuario: PropTypes.string,
    deletarTudo: PropTypes.func,
}

export default Menu