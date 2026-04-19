import { Button } from 'antd'
import { AiFillInstagram } from 'react-icons/ai'
import { FaPhoneAlt, FaTelegramPlane, FaVk } from 'react-icons/fa'

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
	return (
		<header className='w-full h-14 bg-transparent fixed top-0 left-0 z-1000'>
			<div className='container mx-auto h-full flex items-center justify-end'>
				<div className='flex space-x-2'>
					{socialLinks.map(link => (
						<Button
							key={link.href}
							type='text'
							href={link.href}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={link.label}
							icon={link.icon}
							className='rounded-full! bg-white! text-black/50 hover:text-primary!'
						/>
					))}
					<Button
						type='primary'
						href='tel:+79615177332'
						icon={<FaPhoneAlt size={16} className='relative top-0.5' />}
						className='phone-btn bg-primary! border-primary! rounded-xl hover:bg-primary/90!'
					>
						+7 (961) 517-73-32
					</Button>
				</div>
			</div>
		</header>
	)
}

export default Header
