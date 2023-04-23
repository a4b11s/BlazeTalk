import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

const Layout = () => {
	return (
		<>
			<header id="header">
				<Header />
			</header>
			<Sidebar />
			<main id="main">
				<Outlet />
			</main>

			<footer id="footer">
				<Footer />
			</footer>
		</>
	);
};

export default Layout;

//
