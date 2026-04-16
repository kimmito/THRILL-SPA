import { Outlet } from 'react-router'

import Footer from './Footer'
import Header from './Header'

export const Layout = () => {
	return (
		<div className='flex flex-col min-h-screen pt-14'>
			<Header />
			<main className='w-full max-w-300 mx-auto px-4 mb-10'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
