import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import MessageList from '../components/MessageList/MessageList';
import MessageInput from '../components/MessageInput/MessageInput';
import {IMessage, IUser} from '../models';
import {useUser} from '../hooks/use-user';
import {IRootState, useAppDispatch} from '../store/store';
import {addMessages} from '../store/messageSlice';
import {useMessageDataBase} from '../hooks/use-message-db';
import {subscribeBD} from "../services/firebaseApi";

import {Box} from '@mui/material';

const ChatPage = () => {
    const {chatId} = useParams();
    const {uid} = useUser();
    const dispatch = useAppDispatch();
    const messages = useSelector<IRootState>((state) => state.message.messages);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const {sendMessage, useSubMessage} = useMessageDataBase();

    useSubMessage(chatId!, (messages) => {
        dispatch(addMessages(messages));
    });

    useEffect(() => {
        subscribeBD('users/', (users) => {
            setUsers(users);
        }, (data) => {
            const mappedData: IUser[] = Object.keys(data).map((item) => {
                // @ts-ignore
                return data[item];
            });
            return mappedData
        })
    }, []);

    const onMessageSend = (text: string) => {
        sendMessage(chatId!, uid!, text);
    };

    const wrapperStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    }

    return (
        <Box sx={wrapperStyle}>
            {messages && users ? (
                <MessageList users={users} messageArray={messages as IMessage[]}/>
            ) : (
                <Box height="70vh" flexGrow={1} bgcolor="rgba(230,251,255,0.3)"/>
            )}
            <MessageInput onSend={onMessageSend}/>
        </Box>
    );
};

export default ChatPage;
