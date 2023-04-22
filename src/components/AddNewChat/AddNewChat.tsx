import React, { useState } from 'react';

import FileInput from '../FileInput/FileInput';
import { uploadFile } from '../../services/firebaseStorageApi';

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
	const [chatName, setChatName] = useState<string>('');
	const [avatar, setAvatar] = useState<File>();
	const [avatarUrl, setAvatarUrl] = useState<string>();

	const onClickCreateBtn = () => {
		if (!avatar) return;
		uploadFile(`/chat_avatars/${avatar.name + Date.now()}`, avatar).then(
			(value) => {
				const newChat = { name: chatName, chatAvatar: value.ref.fullPath };
				setChatName('');
				setAvatar(undefined);
				setAvatarUrl('');
				onAddComplete(newChat);
				onAddingModalClose();
			}
		);
	};

	const onFileUpload = (FileList: FileList) => {
		const reader = new FileReader();
		reader.onload = () => {
			setAvatarUrl(reader.result as string);
		};
		reader.readAsDataURL(FileList[0]);
		setAvatar(FileList[0]);
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
						<FileInput onFileUploaded={onFileUpload} label="Upload avatar" />
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
