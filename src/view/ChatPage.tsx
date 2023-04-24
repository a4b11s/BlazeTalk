import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MessageList from '../components/MessageList/MessageList';
import MessageInput from '../components/MessageInput/MessageInput';
import { IMessage, IUser } from '../models';
import { useUser } from '../hooks/use-user';
import { IRootState, useAppDispatch } from '../store/store';
import { addMessages } from '../store/messageSlice';
import { useMessageDataBase } from '../hooks/use-message-db';
import { subscribeBD } from '../services/firebaseDBApi';

import classes from './ChatPage.module.css';

import { Box } from '@mui/material';

const ChatPage = () => {
	const { chatId } = useParams();
	const { uid } = useUser();
	const dispatch = useAppDispatch();
	const messages = useSelector<IRootState>((state) => state.message.messages);
	const [users, setUsers] = useState<IUser[] | null>(null);
	const { sendMessage, useSubMessage } = useMessageDataBase();

	useSubMessage(chatId!, (messages) => {
		dispatch(addMessages(messages));
	});

	useEffect(() => {
		subscribeBD(
			'users/',
			(users) => {
				setUsers(users);
			},
			(data) => {
				const mappedData: IUser[] = Object.keys(data).map((item) => {
					// @ts-ignore
					return data[item];
				});
				return mappedData;
			}
		);
	}, []);

	const onMessageSend = (text: string, imageArray?: Array<File>) => {
		if (!chatId || !uid) return;
		sendMessage(chatId, uid, text, imageArray);
	};

	return (
		<Box className={classes.wrapper}>
			<MessageList users={users} messageArray={messages as IMessage[]} />
			<MessageInput onSend={onMessageSend} />
		</Box>
	);
};

export default ChatPage;
