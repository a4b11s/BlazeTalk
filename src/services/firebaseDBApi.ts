import {onValue, ref, set, update} from 'firebase/database';

import {DataBase} from './firebase';

export const subscribeBD = (
    path: string,
    callback: (data: any) => void,
    dataMappingFunction: (data: any) => any
) => {
    return onValue(ref(DataBase, path), (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            callback(null);
            return;
        }

        const mappedData = dataMappingFunction(data);
        callback(mappedData);
    });
};

export const sendToDataBase = (path: string, data: any) => {
    set(ref(DataBase, path), data);
};

export const sendTransaction = (updates: {}) => {
    return update(ref(DataBase), updates);
};
