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
			<main id="main">
				<Sidebar />
				<section id="content">
					<Outlet />
				</section>
			</main>
			<footer id="footer">
				<Footer />
			</footer>
		</>
	);
};

export default Layout;

//
