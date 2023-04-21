import {createSlice} from '@reduxjs/toolkit';

import {IMessage} from '../models';

interface IState {
    messages: Array<IMessage> | null;
}

const initialState: IState = {
    messages: null,
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export const {addMessages} = messageSlice.actions;
