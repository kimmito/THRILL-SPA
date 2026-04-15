import { Button } from 'antd'
import { AiFillInstagram } from 'react-icons/ai'
import { FaVk } from 'react-icons/fa'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'

const Header = () => {
	return (
		<header className='w-full h-14 bg-transparent fixed top-0 left-0 z-1000'>
			<div className='container mx-auto h-full flex items-center justify-end'>
				<div className='flex space-x-2'>
					<Button
						type='text'
						href='https://instagram.com'
						target='_blank'
						rel='noopener noreferrer'
						icon={<AiFillInstagram size={20} className='relative top-0.5'/>}
						className='rounded-full! bg-white! text-black/50 hover:text-primary!'
					/>
					<Button
						type='text'
						href='https://vk.com'
						target='_blank'
						rel='noopener noreferrer'
						icon={<FaVk size={20} className='relative top-0.5'/>}
						className='rounded-full! bg-white! text-black/50 hover:text-primary!'
					/>
					<Button
						type='text'
						href='https://telegram.com'
						target='_blank'
						rel='noopener noreferrer'
						icon={<FaTelegramPlane size={20} className='relative top-0.5'/>}
						className='rounded-full! bg-white! text-black/50 hover:text-primary!'
					/>
					<Button
						type='primary'
						href='tel:+79615177332'
						icon={<FaPhoneAlt size={16} className='relative top-0.5'/>}
						className='bg-primary! border-primary! rounded-xl hover:bg-primary/90!'
					>
						+7 (961) 517-73-32
					</Button>
				</div>
			</div>
		</header>
	)
}

export default Header
