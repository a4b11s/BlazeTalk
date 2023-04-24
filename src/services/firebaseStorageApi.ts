import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from './firebase';

export const uploadFile = (
	path: string,
	file: Blob | Uint8Array | ArrayBuffer
) => {
	const storageRef = ref(storage, path);
	return uploadBytes(storageRef, file);
};

export const uploadFileArray = (
	path: string,
	fileArray: Blob[] | Uint8Array[] | ArrayBuffer[]
): Promise<string[]> => {
	const file = fileArray.shift();
	const uid = Date.now();

	if (!file) {
		return new Promise((resolve) => {
			resolve([]);
		});
	}

	return uploadFile(path + uid, file).then(async (result) => {
		return [...(await uploadFileArray(path, fileArray)), result.ref.fullPath];
	});
};

export const getFileUrl = (path: string) => {
	const storageRef = ref(storage, path);
	return getDownloadURL(storageRef);
};

export const getFilesUrls = (pathArray: string[]): Promise<string[]> => {
	const path = pathArray.shift();

	if (!path) {
		return new Promise((resolve) => {
			resolve([]);
		});
	}

	const storageRef = ref(storage, path);

	return getDownloadURL(storageRef).then(async (url) => {
		return [...(await getFilesUrls(pathArray)), url];
	});
};
