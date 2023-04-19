import { useSelector } from 'react-redux';

import { IRootState } from '../store/store';

export const useUser = () => {
	const user = useSelector((state: IRootState) => state.user.user);

	return { isAuth: user !== null, ...user };
};
