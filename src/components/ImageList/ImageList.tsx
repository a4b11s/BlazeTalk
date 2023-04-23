import React from 'react';

import { Box, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface IProps {
	images:
		| {
				blobUrl: string;
				uid: symbol;
		  }[]
		| null;
	onDeleteButtonClick?: (uid: symbol) => void;
}

const ImageList = (props: IProps) => {
	const theme = useTheme();
	const { images, onDeleteButtonClick } = props;

	if (!images) return null;

	const badgeSx = {
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		borderRadius: '100%',
		position: 'absolute',
		top: '-7px',
		right: '-7px',
		bgcolor: theme.palette.secondary.main,
		width: '24px',
		height: '24px',
	};

	return (
		<Box display="flex" flexWrap="wrap" px="102px">
			{images.map((img, index) => {
				const { uid, blobUrl } = img;
				return (
					<Box
						my="6px"
						ml="12px"
						height="100px"
						width="fit-content"
						position="relative"
						key={blobUrl}
					>
						<img height="100%" src={blobUrl} alt={`#${index}`} />
						{onDeleteButtonClick && (
							<Box
								onClick={() => {
									onDeleteButtonClick(uid);
								}}
								sx={badgeSx}
							>
								<ClearIcon fontSize="small" color="inherit" />
							</Box>
						)}
					</Box>
				);
			})}
		</Box>
	);
};

export default ImageList;
