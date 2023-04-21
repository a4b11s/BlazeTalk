import {createSlice} from '@reduxjs/toolkit';

import {IUser} from '../models';

interface IState {
    user: IUser | null;
}

const initialState: IState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
});

export const {addUser, removeUser} = userSlice.actions;
