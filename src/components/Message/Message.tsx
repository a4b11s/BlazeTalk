import React, { useEffect, useRef } from 'react';

import { Avatar, Box, Paper, Typography } from '@mui/material';

interface IProps {
	author: {
		displayName: string;
		photoURL: string;
	};
	message: { text: string };
	isAuthor: boolean;
	isScrollTo: boolean;
}

const Message = (props: IProps) => {
	const { message, isAuthor, author, isScrollTo } = props;
	const { text } = message;
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current && isScrollTo) {
			ref.current.scrollIntoView();
		}
	}, [ref, isScrollTo]);

	const wrapperStyles = {
		borderRadius: `30px 30px ${isAuthor ? '0 30px' : '30px 0'};`,
		alignSelf: isAuthor ? 'flex-end' : 'flex-start',
		width: '35%',
		padding: 2,
		m: 3,
	};
	if (!message.text.trim()) return null;
	if (!author.displayName) return null;

	return (
		<Paper data-testid="message-wrapper" ref={ref} sx={wrapperStyles}>
			<Box display="flex" alignItems="center">
				<Avatar src={author.photoURL} />
				<Typography ml={1} color={'secondary.main'} fontWeight={500} variant="h6">
					{author.displayName}
				</Typography>
			</Box>
			<Typography data-testid="message-text" padding={1} variant="body1">
				{text}
			</Typography>
		</Paper>
	);
};

export default Message;
