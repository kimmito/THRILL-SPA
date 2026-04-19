import { Outlet } from 'react-router'

import Footer from './Footer'
import Header from './Header'
import { ServicesRefProvider } from '@/contexts/ServicesRefProvider'

export const Layout = () => {
	return (
		<ServicesRefProvider>
			<div className='flex flex-col min-h-screen pt-14'>
				<Header />
				<main className='w-full max-w-350 mx-auto px-4 mb-10'>
					<Outlet />
				</main>
				<Footer />
			</div>
		</ServicesRefProvider>
	)
}
