import React from 'react';

import classes from './ImageList.module.css';

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

	return (
		<Box className={classes.listWrapper}>
			{images.map((img, index) => {
				const { uid, blobUrl } = img;
				return (
					<Box className={classes.itemWrapper} key={blobUrl}>
						<img height="100%" src={blobUrl} alt={`#${index}`} />
						{onDeleteButtonClick && (
							<Box
								onClick={() => {
									onDeleteButtonClick(uid);
								}}
								className={classes.badge}
								sx={{ bgcolor: theme.palette.secondary.main }}
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
