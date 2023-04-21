import React, {useEffect} from 'react';

import {Route, Routes} from 'react-router-dom';

import './App.css';

import Layout from './Layout';
import ChatPage from './view/ChatPage';
import {useUser} from './hooks/use-user';
import Auth from './components/Auth/Auth';

function App() {
	const {isAuth} = useUser();

	useEffect(() => {
	}, []);
	return (
		<Routes>
			{isAuth ? (
				<Route path="/" element={<Layout/>}>
					<Route index={true} path="/:chatId" element={<ChatPage/>}/>
				</Route>
			) : (
				<Route path="*" element={<Auth/>}/>
			)}
		</Routes>
	);
}

export default App;
