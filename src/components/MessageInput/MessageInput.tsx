import React, { FormEvent, useState } from 'react';

import FileInput from '../FileInput/FileInput';
import ImageList from '../ImageList/ImageList';

import { Box, CircularProgress, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface IProps {
	onSend: (message: string, imageArray?: Array<File>) => void;
	isSending?: boolean;
}

interface IImage {
	blobUrl: string;
	file: File;
	uid: symbol;
}

const MessageInput = (props: IProps) => {
	const { onSend, isSending } = props;
	const [messageText, setMessageText] = useState('');
	const [messageImages, setMessageImages] = useState<
		Array<IImage> | undefined
	>();

	const onMessageTextChange = (event: any) => {
		setMessageText(event.target.value);
	};

	const onFileUploaded = (FileList: FileList) => {
		const FileArray = Array.from(FileList);
		const imageArray: Array<IImage> = [];

		FileArray.forEach((file) => {
			let blob = new Blob([file], {
				type: 'application/image',
			});
			imageArray.push({
				blobUrl: URL.createObjectURL(blob),
				file,
				uid: Symbol(file.name),
			});
		});

		setMessageImages((prevState) => {
			if (!prevState) return imageArray;
			return [...prevState, ...imageArray];
		});
	};

	const onImageDelete = (uid: symbol) => {
		setMessageImages((prevState) => {
			if (!prevState) return undefined;

			const deletingImageIndex = prevState?.findIndex(
				(image) => image.uid === uid
			);

			return [
				...prevState.slice(0, deletingImageIndex),
				...prevState.slice(deletingImageIndex + 1),
			];
		});
	};

	const onSendBtnClick = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (messageImages) {
			const messageFile: Array<File> = messageImages?.map((image) => image.file);
			onSend(messageText, messageFile);
			setMessageImages(undefined);
		} else {
			onSend(messageText);
		}

		setMessageText('');
	};

	return (
		<Box px="2%">
			<ImageList onDeleteButtonClick={onImageDelete} images={messageImages} />
			<Box py={1}>
				<form style={{ height: '100%', display: 'flex' }} onSubmit={onSendBtnClick}>
					<TextField
						autoFocus
						sx={{ flexGrow: 1 }}
						value={messageText}
						label="Message"
						variant="outlined"
						onChange={onMessageTextChange}
					/>
					<FileInput multiple accept="image/*" onFileUploaded={onFileUploaded} />
					<IconButton
						sx={{ position: 'relative' }}
						disabled={messageText.trim() === '' && messageImages === undefined}
						type="submit"
						aria-label="send"
						color="secondary"
					>
						{isSending && (
							<CircularProgress size={50} sx={{ position: 'absolute' }} />
						)}
						<SendIcon fontSize="large" />
					</IconButton>
				</form>
			</Box>
		</Box>
	);
};

export default MessageInput;
