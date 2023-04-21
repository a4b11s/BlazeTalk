import React, {useRef, useState} from 'react';

import {useSelector} from 'react-redux';

import ChatList from '../ChatList/ChatList';
import {IChat} from '../../models';

import {IRootState, useAppDispatch} from '../../store/store';
import {setChats} from '../../store/chatSlice';

import {useChatsDataBase} from '../../hooks/use-chat-db';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {IconButton} from '@mui/material';

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [isDeCollapsing, setIsDeCollapsing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState('15%');
    const asideRef = useRef<HTMLElement>(null);
    const {useSubChats} = useChatsDataBase();

    const chats = useSelector<IRootState>((state) => state.chat.chatList);

    useSubChats((data) => {
        dispatch(setChats(data));
    });

    const onCollapsing = () => {
        setIsCollapsing(true);
        setSidebarWidth('73px');
        asideRef.current!.ontransitionend = (e) => {
            if (!(e.propertyName === 'width')) return;
            setIsCollapsing(false);
            setIsCollapsed(true);
            asideRef.current!.ontransitionend = null;
        };
    };

    const onDeCollapsing = () => {
        setIsDeCollapsing(true);
        setSidebarWidth('15%');
        setIsCollapsed(false);
        asideRef.current!.ontransitionend = (e) => {
            if (!(e.propertyName === 'width')) return;
            setIsDeCollapsing(false);
            asideRef.current!.ontransitionend = null;
        };
    };

    return (
        <aside
            ref={asideRef}
            style={{width: sidebarWidth, borderRight: '0.5px solid rgb(200 200 200)'}}
            id="sidebar"
        >
            <ChatList isCollapsed={isCollapsed} chatList={chats as IChat[]}/>

            {(isCollapsed || isDeCollapsing) && (
                <IconButton onClick={onDeCollapsing} aria-label="collapse" color="primary">
                    <KeyboardDoubleArrowRightIcon fontSize="large"/>
                </IconButton>
            )}
            {(!isCollapsed || isCollapsing) && !isDeCollapsing && (
                <IconButton
                    sx={{width: '100%'}}
                    onClick={onCollapsing}
                    aria-label="collapse"
                    color="primary"
                >
                    <KeyboardDoubleArrowLeftIcon fontSize="large"/>
                </IconButton>
            )}
        </aside>
    );
};

export default Sidebar;
