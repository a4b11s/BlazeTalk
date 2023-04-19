import React from 'react';

import { getDatabase, ref, set } from 'firebase/database';

import { app } from '../../services/firebase';

import { useAppDispatch } from '../../store/store';
import { addUser } from '../../store/userSlice';

import { useAuth } from '../../hooks/use-auth';

import { Button } from '@mui/material';

interface IProps {
	onAuth?: () => void;
}

const DataBase = getDatabase(app);

const Auth = (props: IProps) => {
	const dispatch = useAppDispatch();
	const { onAuth = () => {} } = props;
	const { auth } = useAuth();

	const handleGoogleAuth = () => {
		auth((user) => {
			dispatch(addUser(user));
			set(ref(DataBase, 'user/' + user.uid), user);
		});
		onAuth();
	};
	return <Button onClick={handleGoogleAuth}>Login with google</Button>;
};

export default Auth;
