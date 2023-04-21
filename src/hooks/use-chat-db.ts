import {useEffect} from 'react';

import {sendToDataBase, subscribeBD} from '../services/firebaseDBApi';
import {IChat} from '../models';

const defaultMappingDataFunction = (data: any) => {
    return Object.keys(data).map((item) => {
        return data[item as any];
    });
};

export const useSubChats = (
    callback: (data: any) => void,
    mappingDataFunction: (data: any) => typeof data = defaultMappingDataFunction
) => {
    useEffect(
        () => {
            return subscribeBD('chats/', callback, mappingDataFunction);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
};

export const addNewChat = (newChat: any) => {
    const unqChatId = Date.now().toString();
    const chat: IChat = {
        uid: unqChatId,
        lastMessage: 'empty',
        ...newChat,
    };
    sendToDataBase(`chats/${unqChatId}`, chat);
};
export const useChatsDataBase = () => {
    return {
        useSubChats,
        addNewChat,
    };
};
