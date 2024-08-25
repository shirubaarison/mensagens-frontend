import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from '../reducers/userReducer'

import styled from 'styled-components';

const Menu = () => {        
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    
    const adeus = () => {
        dispatch(logout(user))
        dispatch()
    }

    const NavbarContainer = styled.nav`
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    `

    const NavLinks = styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
        `

    const NavLink = styled.a`
        color: black;
        text-decoration: none;
        margin: 0 15px;
        font-size: 1rem;

        &:hover {
            color: #e400f0;
        };
        cursor: pointer;
        `
    
    return (    
        <NavbarContainer>
            {user && 
            <NavLinks>
                <NavLink onClick={adeus}>logout</NavLink>
            </NavLinks>
            }
        </NavbarContainer>
    )
}

export default Menu