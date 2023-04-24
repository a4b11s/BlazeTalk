import React, { useEffect, useRef, useState } from 'react';

import { getFileUrl } from '../../services/firebaseStorageApi';

import {
	Avatar,
	Box,
	ImageList,
	ImageListItem,
	Paper,
	Typography,
} from '@mui/material';

interface IProps {
	author: {
		displayName: string;
		photoURL: string;
	};
	message: { text: string; images?: Array<string> };
	isAuthor: boolean;
	isScrollTo: boolean;
}

const Message = (props: IProps) => {
	const { message, isAuthor, author, isScrollTo } = props;
	const { text, images } = message;
	const ref = useRef<HTMLDivElement>(null);
	const [imageArray, setImageArray] = useState<Array<string | undefined>>();

	useEffect(() => {
		if (ref.current && isScrollTo) {
			ref.current.scrollIntoView();
		}
	}, [ref, isScrollTo]);

	useEffect(() => {
		if (!images) return;
		try {
			getFileUrl(images[0]).then((url) => {
				setImageArray([url]);
			});
		} catch (e: any) {
			// setError(e.message);
		}
	}, [images]);

	const wrapperStyles = {
		borderRadius: `30px 30px ${isAuthor ? '0 30px' : '30px 0'};`,
		alignSelf: isAuthor ? 'flex-end' : 'flex-start',
		width: '35%',
		padding: 2,
		m: 3,
	};
	if (!message.text.trim() && !images?.length) return null;
	if (!author.displayName) return null;

	return (
		<Paper data-testid="message-wrapper" ref={ref} sx={wrapperStyles}>
			<Box display="flex" alignItems="center">
				<Avatar src={author.photoURL} />
				<Typography ml={1} color={'secondary.main'} fontWeight={500} variant="h6">
					{author.displayName}
				</Typography>
			</Box>
			<Typography
				sx={{ lineBreak: 'anywhere' }}
				data-testid="message-text"
				padding={1}
				variant="body1"
			>
				{text}
			</Typography>
			{imageArray && (
				<ImageList sx={{ height: 'fit-content' }} cols={4}>
					{imageArray?.map((img, index) => {
						return (
							<ImageListItem sx={{ height: 'fit-content' }} key={img}>
								<img height="150px" src={img} alt={`attachment #${index}`} />
							</ImageListItem>
						);
					})}
				</ImageList>
			)}
		</Paper>
	);
};

export default Message;
