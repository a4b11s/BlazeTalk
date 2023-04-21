import React, {useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import AddNewChat from '../AddNewChat/AddNewChat';
import {IChat} from '../../models';
import ChatListItem from '../ChatListItem/ChatListItem';

import {useChatsDataBase} from '../../hooks/use-chat-db';


import {Button, List} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
    chatList: IChat[];
    isCollapsed?: boolean;
}

const ChatList = (props: IProps) => {
    const navigate = useNavigate();
    const {chatId} = useParams();
    const {chatList, isCollapsed = false} = props;
    const [isAddingNewChat, setIsAddingNewChat] = useState(false);
    const {addNewChat} = useChatsDataBase();
    const onListItemClick = (uid: string) => {
        navigate(uid);
    };

    const onAddingModalClose = () => {
        setIsAddingNewChat(false);
    };
    const onAddingBtnClick = () => {
        setIsAddingNewChat(true);
    };
    const onAddComplete = (newChat: any) => {
        addNewChat(newChat);
    };
    return (
        <>
            <AddNewChat
                onAddComplete={onAddComplete}
                isAddingNewChat={isAddingNewChat}
                onAddingModalClose={onAddingModalClose}
            />
            <List sx={{width: '100%'}}>
                {chatList && chatList.map((chat) => {
                    return (
                        <ChatListItem
                            key={chat.uid}
                            isCollapsed={isCollapsed}
                            onListItemClick={onListItemClick}
                            chat={chat}
                            isSelected={chat.uid === chatId}
                        />
                    );
                })}
                <Button
                    onClick={onAddingBtnClick}
                    startIcon={<AddIcon fontSize="large"/>}
                    fullWidth
                >
                    {isCollapsed ? '' : 'Add new chat'}
                </Button>
            </List>
        </>
    );
};

export default ChatList;
