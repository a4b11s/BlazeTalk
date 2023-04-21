import {IUser} from '../models';
import {ICredential, loginWithCredential, loginWithGoogle, signInWithCredential,} from '../services/authApi';

export const useAuth = () => {
    const auth = (
        cb: (user: IUser) => void,
        credential?: ICredential,
        reject: (error: string) => void = () => {
        }
    ) => {
        if (credential) {
            loginWithCredential(credential, cb, reject);
        } else {
            loginWithGoogle(cb, reject);
        }
    };
    const signIn = (
        cb: (user: IUser) => void,
        credential: ICredential,
        reject: (error: string) => void = () => {
        }
    ) => {
        signInWithCredential(credential, cb, reject);
    };

    return {
        signIn,
        auth,
    };
};
