import React, { useEffect, useRef, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { getFilesUrls } from '../../services/firebaseStorageApi';

import {
	Alert,
	Avatar,
	Box,
	ImageList,
	ImageListItem,
	Paper,
	Skeleton,
	Typography,
} from '@mui/material';

interface IProps {
	author: {
		displayName: string;
		photoURL: string;
	};
	message: { text: string; images?: Array<string> };
	isAuthor: boolean;
	isLast: boolean;
}

const Message = (props: IProps) => {
	const { message, isAuthor, author, isLast } = props;
	const { text, images } = message;

	const scrollAnchorRef = useRef<HTMLDivElement>(null);

	const { ref: intersectionRef, inView } = useInView({
		threshold: 0,
	});

	const [imageArray, setImageArray] = useState<Array<string | undefined>>();
	const [isLoading, setIsLoading] = useState<boolean>();
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		if (scrollAnchorRef.current && isLast) {
			scrollAnchorRef.current.scrollIntoView(false);
		}
	}, [scrollAnchorRef, isLast, imageArray, isLoading]);

	useEffect(() => {
		if (!images?.length) return;
		if (imageArray) return;

		setError(undefined);
		setIsLoading(true);
		if (!inView) return;
		try {
			getFilesUrls([...images])
				.then((url) => {
					setImageArray(url);
					setIsLoading(false);
				})

				.catch((error) => {
					setError(error.message);
					setIsLoading(false);
				});
		} catch (error: any) {
			setError(error.message);
			setIsLoading(false);
		}
	}, [images, inView, imageArray]);

	const wrapperStyles = {
		borderRadius: `30px 30px ${isAuthor ? '0 30px' : '30px 0'};`,
		alignSelf: isAuthor ? 'flex-end' : 'flex-start',
		width: '35%',
		padding: 2,
		m: 3,
		position: 'relative',
	};
	if (!message.text.trim() && !images?.length) return null;
	if (!author.displayName) return null;
	return (
		<>
			<Paper
				ref={intersectionRef}
				data-testid="message-wrapper"
				sx={wrapperStyles}
			>
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
				{error ? (
					<Alert severity="error">{error}</Alert>
				) : isLoading ? (
					<Box display="flex" flexWrap="wrap">
						{[...Array(images?.length)].map((_, index) => (
							<Skeleton
								sx={{ m: '3px' }}
								key={index + 'skeleton'}
								variant="rectangular"
								height={150}
								width={100}
							/>
						))}
					</Box>
				) : (
					imageArray && (
						<ImageList sx={{ height: 'fit-content' }} cols={4}>
							{imageArray?.map((img, index) => {
								return (
									<ImageListItem sx={{ height: 'fit-content' }} key={img}>
										<img height="150px" src={img} alt={`attachment #${index}`} />
									</ImageListItem>
								);
							})}
						</ImageList>
					)
				)}

				<div
					style={{ height: 1, position: 'absolute', right: 0, left: 0, bottom: -20 }}
					ref={scrollAnchorRef}
				></div>
			</Paper>
		</>
	);
};

export default Message;
