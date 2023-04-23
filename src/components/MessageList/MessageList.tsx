import React from 'react';

import Message from '../Message/Message';
import { IMessage, IUser } from '../../models';

import { useUser } from '../../hooks/use-user';

import classes from './MessageList.module.css';

import { Box } from '@mui/material';

interface IProps {
	messageArray: IMessage[] | null;
	users: IUser[] | null;
}

const MessageList = (props: IProps) => {
	const { messageArray, users } = props;
	const { uid } = useUser();

	if (!messageArray || !users) return <Box className={classes.wrapper} />;

	return (
		<Box className={classes.wrapper}>
			{messageArray.map((item, index) => {
				const user: IUser = users.find((user) => user.uid === item.author.uid)!;

				return (
					<Message
						isScrollTo={index === messageArray.length - 1}
						key={item.uid}
						author={user}
						message={item}
						isAuthor={uid === item.author.uid}
					/>
				);
			})}
		</Box>
	);
};

export default MessageList;
