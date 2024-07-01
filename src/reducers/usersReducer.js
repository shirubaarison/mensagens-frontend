import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/usersService'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        adicionarUser(state, action) {
            state.push(action.payload)
        },
        removeUser(state, action) {
            return state.filter(user => user !== action.payload)
        }
    }
})

export const { setUsers, adicionarUser, removeUser } = usersSlice.actions

export const setUsersConnected = () => {
    return async dispatch => {
        const response = await usersService.getAllUsers()
        dispatch(setUsers(response))
    }
}

export const addNewUser = (user) => {
    return async dispatch => {
        dispatch(adicionarUser(user))
    }
}

export const logoutUser = (user) => {
    return async dispatch => {
        dispatch(removeUser(user))
    }
}

export const getUsers = state => state.users

export default usersSlice.reducer