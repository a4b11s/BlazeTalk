import { createSlice } from '@reduxjs/toolkit';

import { IChat } from '../models';

interface IState {
	chatList: Array<IChat>;
}

const initialState: IState = {
	chatList: [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setChats: (state, action) => {
			state.chatList = action.payload;
		},
	},
});

export const { setChats } = chatSlice.actions;
