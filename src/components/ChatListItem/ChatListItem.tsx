import React, { useEffect, useState } from 'react';

import { IChat } from '../../models';
import { getFileUrl } from '../../services/firebaseStorageApi';

import { Alert, Avatar, Box, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IProps {
	chat: IChat;
	onListItemClick?: (chatId: string) => void;
	isSelected: boolean;
	isCollapsed?: boolean;
}

const ChatListItem = (props: IProps) => {
	const {
		chat,
		isSelected,
		onListItemClick = () => {},
		isCollapsed = false,
	} = props;

	const theme = useTheme();
	const [avatarUrl, setAvatarUrl] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (!chat.chatAvatar) return;
		try {
			getFileUrl(chat.chatAvatar).then((url) => {
				setAvatarUrl(url);
			});
		} catch (e: any) {
			setError(e.message);
		}
	}, [chat]);

	const wrapperStyle = {
		ml: '1px',
		pl: isSelected ? '13px' : '16px',
		borderLeft: isSelected ? `3px solid ${theme.palette.primary.main}` : '',
		width: '100%',
		cursor: 'pointer',
	};
	const infoStyle = {
		paddingLeft: isCollapsed ? 0 : 2,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		width: isCollapsed ? '0%' : '100%',
	};

	return (
		<>
			{error && <Alert severity="error">{error}</Alert>}
			<ListItem
				data-testid="wrapper"
				sx={wrapperStyle}
				onClick={() => {
					onListItemClick(chat.uid);
				}}
				key={chat.uid + 'li'}
			>
				<Avatar src={avatarUrl} />
				<Box sx={infoStyle}>
					<Typography variant="subtitle1">{chat.name}</Typography>
					<Typography variant="subtitle2" color="gray">
						{chat.lastMessage.length > 20
							? chat.lastMessage.slice(0, 20) + '...'
							: chat.lastMessage}
					</Typography>
				</Box>
			</ListItem>
		</>
	);
};

export default ChatListItem;
