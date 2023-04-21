import React, {FormEvent, useState} from 'react';

import {Box, IconButton, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface IProps {
    onSend: (message: string) => void;
}

const MessageInput = (props: IProps) => {
    const {onSend} = props;
    const [messageText, setMessageText] = useState('');

    const onMessageTextChange = (event: any) => {
        setMessageText(event.target.value);
    };

    const onSendBtnClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSend(messageText);
        setMessageText('');
    };

    return (
        <Box px={8} py={1}>
            <form style={{height: '100%', display: 'flex'}} onSubmit={onSendBtnClick}>
                <TextField
                    autoFocus
                    sx={{flexGrow: 1}}
                    value={messageText}
                    label="Message"
                    variant="outlined"
                    onChange={onMessageTextChange}
                />
                <IconButton
                    disabled={messageText.trim() === ''}
                    type="submit"
                    aria-label="send"
                    color="secondary"
                >
                    <SendIcon fontSize="large"/>
                </IconButton>
            </form>
        </Box>
    );
};

export default MessageInput;
