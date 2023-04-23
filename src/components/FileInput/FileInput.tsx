import React, { ChangeEvent, CSSProperties } from 'react';

import classes from './FileInput.module.css';

import AttachFileIcon from '@mui/icons-material/AttachFile';

interface IProps {
	multiple?: boolean;
	HTMLid?: string;
	className?: string;
	accept?: string;
	label?: string;
	style?: CSSProperties;
	onFileUploaded?: (FileList: FileList) => void;
}

const FileInput = (props: IProps) => {
	const {
		HTMLid,
		className,
		accept,
		label,
		style,
		multiple = false,
		onFileUploaded = () => {},
	} = props;

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files?.length) {
			onFileUploaded(e.target.files);
			e.target.value = '';
		}
	};

	return (
		<>
			<label style={style} className={classes.label} htmlFor={HTMLid}>
				<AttachFileIcon fontSize="large" color="primary" />
				<span>{label}</span>
				<input
					className={`${classes.input} ${className || ''}`}
					id={HTMLid}
					onChange={handleInputChange}
					type="file"
					multiple={multiple}
					accept={accept}
				/>
			</label>
		</>
	);
};

export default FileInput;
