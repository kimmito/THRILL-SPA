import { useEffect, useState } from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaPhoneAlt, FaTelegramPlane, FaVk } from 'react-icons/fa'

import { AppButton } from './ui/AppButton'

const socialLinks = [
	{
		href: 'https://instagram.com',
		icon: <AiFillInstagram size={20} className='relative top-0.5' />,
		label: 'Instagram'
	},
	{
		href: 'https://vk.com',
		icon: <FaVk size={20} className='relative top-0.5' />,
		label: 'VK'
	},
	{
		href: 'https://telegram.com',
		icon: <FaTelegramPlane size={20} className='relative top-0.5' />,
		label: 'Telegram'
	}
]

const Header = () => {
	const [isHeroVisible, setIsHeroVisible] = useState(true)
	useEffect(() => {
		const hero = document.getElementById('home')
		if (!hero) return

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsHeroVisible(entry.isIntersecting)
			},
			{
				threshold: 0.1
			}
		)

		observer.observe(hero)

		return () => observer.disconnect()
	}, [])
	const links = [
		{ href: '#about', label: 'О нас' },
		{ href: '#services', label: 'Услуги' },
		{ href: '#portfolio', label: 'Портфолио' }
	]
	return (
		<header
			className={`w-full h-18 fixed top-0 left-0 z-1000 transition-color duration-200 ${!isHeroVisible ? 'bg-base/70' : 'bg-transparent'}`}
		>
			<div className='container mx-auto h-full flex items-center justify-between px-4'>
				<div
					className={`${isHeroVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 flex items-center`}
				>
					<AppButton
						appVariant='link'
						className='flex flex-col items-center mb-3 group/logo'
					>
						<p className='group-hover/logo:text-copy/70 transition-colors duration-300 font-title text-[42px] uppercase text-copy'>
							Thrill
						</p>
						<p className='group-hover/logo:text-copy/80 transition-colors duration-300 text-[17px]  leading-0 text-head'>
							Салон красоты в Краснодаре
						</p>
					</AppButton>
					<AppButton
						appVariant='primary'
						className='text-xl! hover:text-accent! mx-7 px-8 py-5 hover:bg-transparent! shadow-lg '
					>
						Онлайн-запись
					</AppButton>
					<nav>
						<ul className='flex gap-2'>
							{links.map(link => (
								<li key={link.label}>
									<AppButton
										appVariant='outline'
										className='text-[16px]! p-5!'
										href={link.href}
									>
										{link.label}
									</AppButton>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className='flex space-x-2'>
					{socialLinks.map(link => (
						<AppButton
							key={link.href}
							href={link.href}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={link.label}
							icon={link.icon}
							appVariant='icon'
							className='w-19'
						/>
					))}
					<AppButton
						href='tel:+79615177332'
						icon={<FaPhoneAlt size={18} />}
						appVariant='icon'
						className='w-full bg-button! text-xl hover:bg-transparent!'
					>
						+7 (961) 517-73-32
					</AppButton>
				</div>
			</div>
		</header>
	)
}

export default Header
