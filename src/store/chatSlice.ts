import {createSlice} from '@reduxjs/toolkit';

import {IChat} from '../models';

interface IState {
    chatList: Array<IChat>;
}

const initialState: IState = {
    chatList: [
        {
            uid: 'string',
            name: 'Some chat name1',
            chatAvatar:
                'https://lh3.googleusercontent.com/a/AGNmyxYOwq7vS7nFuhvGGUWrRxe98Nbi2n1PAb3clXMAd2w=s83-c-mo',
            lastMessage: 'someMessage',
        },
        {
            uid: 'string2',
            name: 'Some chat name2',
            chatAvatar:
                'https://lh3.googleusercontent.com/a/AGNmyxYOwq7vS7nFuhvGGUWrRxe98Nbi2n1PAb3clXMAd2w=s83-c-mo',
            lastMessage: 'someMessage',
        },
    ],
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

export const {setChats} = chatSlice.actions;
