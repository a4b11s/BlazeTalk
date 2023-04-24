import { useEffect } from 'react';

import { sendTransaction, subscribeBD } from '../services/firebaseDBApi';
import { IMessage } from '../models';
import { uploadFileArray } from '../services/firebaseStorageApi';

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

export const sendMessage = async (
	chatId: string,
	userUid: string,
	text: string,
	images?: Array<File>
) => {
	const unqMessageId = Date.now().toString();
	let imagesPathArray: Array<string> = [];

	if (images) {
		await uploadFileArray(`chats/${chatId}/${userUid}/`, images).then(
			(result) => {
				imagesPathArray = result;
			}
		);
	}

	const newMessage: IMessage = {
		chatUid: chatId!,
		uid: unqMessageId,
		text,
		author: { uid: userUid! },
	};

	if (imagesPathArray.length) {
		newMessage.images = imagesPathArray;
	}

	return sendTransaction({
		[`messages/${chatId}/${unqMessageId}`]: newMessage,
		[`chats/${chatId}/lastMessage`]: text === '' ? 'images' : newMessage.text,
	});
};

export const useMessageDataBase = () => {
	return { useSubMessage, sendMessage };
};
