import { ref, uploadBytes } from 'firebase/storage';

import { storage } from './firebase';

export const uploadFile = (
	path: string,
	file: Blob | Uint8Array | ArrayBuffer
) => {
	const storageRef = ref(storage, path);
	return uploadBytes(storageRef, file);
};