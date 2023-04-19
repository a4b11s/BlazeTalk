import React from 'react';

import Message from '../Message/Message';
import {IMessage, IUser} from '../../models';

import {useUser} from '../../hooks/use-user';

import {Box} from '@mui/material';

interface IProps {
    messageArray: IMessage[];
    users: IUser[];
}

const MessageList = (props: IProps) => {
    const {messageArray, users} = props;
    const {uid} = useUser();

    const wrapperStyle = {
        overflowY: 'scroll',
        bgcolor: "rgba(230,251,255,0.3)",
        display: "flex",
        flexDirection: "column",
        flexGrow: "flexGrow",
        height: "85vh"
    }
    return (
        <Box sx={wrapperStyle}>
            {messageArray.map((item, index) => {
                const user: IUser = users.find((user) => user.uid === item.author.uid)!;

                return (
                    <Message
                        isScrollTo={index === messageArray.length - 1}
                        key={item.uid}
                        author={user}
                        message={item}
                        isAuthor={uid === item.author.uid}
                    />
                );
            })}
        </Box>
    );
};

export default MessageList;
