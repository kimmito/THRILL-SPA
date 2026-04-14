import { Link } from 'react-router'

const Header = () => {
	return (
		<header className='w-full h-14 bg-gray-500'>
			<nav className='container mx-auto h-full flex items-center justify-between'>
				<ul className='flex space-x-10 text-white [&>li]:border-b [&>li]:border-gray-300'>
					<li>
						<Link to='/'>Главная</Link>
					</li>
					<li>
						<Link to='/profile'>Профиль</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
