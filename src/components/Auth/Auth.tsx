import React from 'react';

import {sendToDataBase} from "../../services/firebaseApi";

import {useAppDispatch} from '../../store/store';
import {addUser} from '../../store/userSlice';

import {useAuth} from '../../hooks/use-auth';

import {Button} from '@mui/material';

interface IProps {
    onAuth?: () => void;
}

const Auth = (props: IProps) => {
    const dispatch = useAppDispatch();
    const {
        onAuth = () => {
        }
    } = props;
    const {auth} = useAuth();

    const handleGoogleAuth = () => {
        auth((user) => {
            sendToDataBase('user/', user)
            dispatch(addUser(user));
        });
        onAuth();
    };
    return <Button onClick={handleGoogleAuth}>Login with google</Button>;
};

export default Auth;
