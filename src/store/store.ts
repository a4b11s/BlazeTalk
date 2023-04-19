import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { chatSlice } from './chatSlice';
import { messageSlice } from './messageSlice';

const rootReducer = combineReducers({
	user: userSlice.reducer,
	chat: chatSlice.reducer,
	message: messageSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
