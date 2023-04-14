import React, { useState } from 'react';

import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	TextField,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface IProps {
	isAddingNewChat: boolean;
	onAddingModalClose: () => void;
	onAddComplete: (newChat: { name: string; chatAvatar: string }) => void;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewChat = (props: IProps) => {
	const { isAddingNewChat, onAddingModalClose, onAddComplete } = props;
	const [chatName, setChatName] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('');

	const onClickCreateBtn = () => {
		const newChat = { name: chatName, chatAvatar: avatarUrl };
		setChatName('');
		setAvatarUrl('');
		onAddComplete(newChat);
		onAddingModalClose();
	};
	return (
		<Dialog
			data-testid="wrapper"
			open={isAddingNewChat}
			TransitionComponent={Transition}
			keepMounted
			onClose={onAddingModalClose}
			aria-describedby="Adding new chat"
		>
			<DialogTitle>{'Adding new chat'}</DialogTitle>
			<DialogContent sx={{ width: '600px' }} dividers>
				<Box
					display="flex"
					flexDirection="column"
					alignContent="stretch"
					width="100%"
				>
					<TextField
						inputProps={{ 'data-testid': 'chat-name-input' }}
						value={chatName}
						onChange={(e) => {
							setChatName(e.target.value);
						}}
						id="Chat name"
						label="Chat name"
						type="text"
						variant="standard"
					/>
					<Box display="flex" height="100px" alignItems="center">
						<Avatar src={avatarUrl} data-testid="avatar" />
						<TextField
							inputProps={{ 'data-testid': 'avatar-url-input' }}
							value={avatarUrl}
							onChange={(e) => {
								setAvatarUrl(e.target.value);
							}}
							sx={{ flexGrow: 1, ml: 1 }}
							id="avatar-input"
							label="Chat avatar"
							type="text"
							variant="standard"
						/>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					data-testid="close-btn"
					color="error"
					variant="outlined"
					onClick={onAddingModalClose}
				>
					Close
				</Button>
				<Button
					data-testid="create-btn"
					disabled={chatName.trim().length <= 2}
					color="success"
					variant="outlined"
					onClick={onClickCreateBtn}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddNewChat;
