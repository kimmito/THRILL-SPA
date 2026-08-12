import { useEffect, useState } from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaPhoneAlt, FaTelegramPlane, FaVk } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router'

import { Navigation } from './Navigation'
import { AppButton } from './ui/appButton/AppButton'

const socialLinks = [
	{
		href: 'https://instagram.com',
		icon: <AiFillInstagram size={20} />,
		label: 'Instagram'
	},
	{
		href: 'https://vk.com',
		icon: <FaVk size={20} />,
		label: 'VK'
	},
	{
		href: 'https://telegram.com',
		icon: <FaTelegramPlane size={20} />,
		label: 'Telegram'
	}
]

const Header = () => {
	const [isHeroVisible, setIsHeroVisible] = useState(true)
	const { pathname } = useLocation()
	const isShopPage = pathname.startsWith('/shop')
	useEffect(() => {
		if (isShopPage) return
		const hero = document.getElementById('home')
		if (!hero) return

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsHeroVisible(!entry.isIntersecting)
			},
			{
				threshold: 0.1
			}
		)

		observer.observe(hero)
		return () => observer.disconnect()
	}, [isShopPage])
	const navigate = useNavigate()
	const handleLogoClick = () => {
		navigate('/')
		window.location.reload()
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	return (
		<header
			className={`w-full h-18 fixed top-0 left-0 z-1000 transition-color duration-200 ${isShopPage || isHeroVisible ? 'bg-base/90' : 'bg-transparent'}`}
		>
			<div className='container mx-auto h-full flex items-center justify-between px-6.5'>
				<div
					className={`${isShopPage || isHeroVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 flex items-center`}
				>
					<AppButton
						appVariant='link'
						className='flex flex-col items-center mb-3 group/logo no-underline!'
						onClick={() => {
							handleLogoClick()
						}}
					>
						<div>
							<p className='group-hover/logo:text-copy/70 transition-colors duration-300 font-title text-[36px] uppercase text-copy'>
								Thrill
							</p>
							<p className='group-hover/logo:text-copy/80 transition-colors duration-300 text-[13px] tracking-wider leading-0 text-head'>
								Салон красоты в Краснодаре
							</p>
						</div>
					</AppButton>
					<AppButton
						appVariant='primary'
						className='text-lg! hover:text-accent! mx-7 px-7 py-4.5 hover:bg-transparent! shadow-lg '
					>
						Онлайн-запись
					</AppButton>
					<Navigation />
				</div>

				<div className='flex space-x-2 items-center'>
					{socialLinks.map(link => (
						<AppButton
							key={link.href}
							href={link.href}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={link.label}
							icon={link.icon}
							appVariant='icon'
							className='size-10! min-w-10! [&_.ant-btn-icon]:flex [&_.ant-btn-icon]:items-center [&_.ant-btn-icon]:justify-center'
						/>
					))}
					<AppButton
						href='tel:+79615177332'
						icon={<FaPhoneAlt size={18} />}
						appVariant='icon'
						className='w-full h-10! px-8 bg-button! text-[22px] hover:bg-transparent! hover:text-accent! hover:border-accent!'
					>
						+7 (961) 517-73-32
					</AppButton>
				</div>
			</div>
		</header>
	)
}

export default Header
