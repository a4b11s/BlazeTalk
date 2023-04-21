import {useEffect} from 'react';

import {sendTransaction, subscribeBD} from '../services/firebaseDBApi';
import {IMessage} from '../models';

const defaultMappingDataFunction = (data: any) => {
    return Object.keys(data).map((item) => {
        return data[item as any];
    });
};

export const useSubMessage = (
    chatId: string,
    callback: (data: any) => void,
    mappingDataFunction: (data: any) => typeof data = defaultMappingDataFunction
) => {
    useEffect(
        () => {
            return subscribeBD(`messages/${chatId}`, callback, mappingDataFunction);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [chatId]
    );
};

export const sendMessage = (chatId: string, userUid: string, text: string) => {
    const unqMessageId = Date.now().toString();
    const newMessage: IMessage = {
        chatUid: chatId!,
        uid: unqMessageId,
        text,
        author: {uid: userUid!},
    };
    sendTransaction({
        [`messages/${chatId}/${unqMessageId}`]: newMessage,
        [`chats/${chatId}/lastMessage`]: newMessage.text,
    });
};

export const useMessageDataBase = () => {
    return {useSubMessage, sendMessage};
};
