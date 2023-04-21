import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

import {IUser} from '../models';

import {auth} from './firebase';

export interface ICredential {
    email: string;
    password: string;
}

const userMappingFunction = (data: any) => {
    const user: IUser = data.user;
    const {uid, photoURL, email, displayName} = user
    return {uid, photoURL, email, displayName};
};

export const loginWithGoogle = (
    callback: (user: IUser) => void,
    reject: (error: string) => void
) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            callback(userMappingFunction(result));
        })
        .catch((error) => {
            reject(error);
        });
};

export const loginWithCredential = (
    credential: ICredential,
    callback: (user: IUser) => void,
    reject: (error: string) => void
) => {
    signInWithEmailAndPassword(auth, credential.email, credential.password)
        .then((result) => {
            callback(userMappingFunction(result));
        })
        .catch((error) => {
            reject(error.message);
        });
};

export const signInWithCredential = (
    credential: ICredential,
    callback: (user: IUser) => void,
    reject: (error: string) => void
) => {
    createUserWithEmailAndPassword(auth, credential.email, credential.password)
        .then((result) => {
            callback(userMappingFunction(result));
        })
        .catch((error) => {
            reject(error.message);
        });
};
