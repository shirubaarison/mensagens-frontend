import PropTypes from 'prop-types'

const Menu = ({ logout }) => {        
    const divClass = `container gap-2 d-flex justify-content-center p-2 mt-2`

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