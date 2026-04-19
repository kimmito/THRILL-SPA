import { Button, Col, Row } from 'antd'
import { useContext } from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaTelegramPlane, FaVk } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import { useDispatch } from 'react-redux'

import { ServicesRefContext } from '@/contexts/servicesRefContext'
import { services } from '@/data/services'
import { setCategory, setService } from '@/features/priceTabs/priceTabsSlice'

const staticFooterItems = [
	{ key: 's0', label: services[0].name, serviceIndex: 0, span: 6 },
	{ key: 'works', label: 'Наши работы', span: 6 },
	{ key: 'price', label: 'Прайс', span: 6 },
	{ key: 'contacts', label: 'Контакты', span: 6 },

	{ key: 's1', label: services[1].name, serviceIndex: 1, span: 6 },
	{ key: 'gallery', label: 'Фотогалерея', span: 6 },
	{ key: 'empty-12', label: null, span: 12 },

	{ key: 's2', label: services[2].name, serviceIndex: 2, span: 6 },
	{ key: 'empty-18', label: null, span: 18 },

	{ key: 's3', label: services[3].name, serviceIndex: 3, span: 6 }
]

const Footer = () => {
	const ref = useContext(ServicesRefContext)
	const dispatch = useDispatch()
	const handleServiceClick = (serviceId: string, categoryId: string) => {
		dispatch(setCategory(categoryId))
		dispatch(setService(serviceId))
		ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	const footerItems = staticFooterItems
	const social = [
		{
			key: 'ig',
			href: 'https://instagram.com',
			icon: <AiFillInstagram size={20} className='relative top-0.5' />
		},
		{
			key: 'vk',
			href: 'https://vk.com',
			icon: <FaVk size={20} className='relative top-0.5' />
		},
		{
			key: 'tg',
			href: 'https://telegram.com',
			icon: <FaTelegramPlane size={20} className='relative top-0.5' />
		}
	]
	return (
		<footer className='site-footer bg-gray-800 text-white flex w-full justify-center py-10 gap-20 px-4'>
			<div className='w-1/5 flex items-center'>
				<p className='text-[14px] tracking-wide text-gray-400 '>
					&copy; 2026 THRILL. Все права защищены. <br />
					Цены на нашем сайте не являются публичной офертой, актуальные цены
					можно узнать при записи.
				</p>
			</div>

			<div>
				<Row gutter={[16, 16]} className='font-semibold'>
					{footerItems.map(item => (
						<Col key={item.key} span={item.span}>
							{item.label ? (
								<Button
									type='link'
									variant='link'
									size='medium'
									className='p-0 text-white/60 decoration-0 inline-block text-[16px] hover:text-white'
									onClick={
										item.serviceIndex !== undefined
											? () =>
													handleServiceClick(
														services[item.serviceIndex].id,
														services[item.serviceIndex].categoryId
													)
											: undefined
									}
								>
									{item.label}
								</Button>
							) : null}
						</Col>
					))}
				</Row>
			</div>
			<div>
				<div className='flex gap-3 bottom-1 mb-2 relative'>
					{social.map(s => (
						<Button
							key={s.key}
							type='text'
							href={s.href}
							target='_blank'
							rel='noopener noreferrer'
							icon={s.icon}
							className='rounded-full! bg-white! text-black/50 hover:text-primary!'
						/>
					))}
				</div>
				<div>
					<Button
						type='text'
						href='https://telegram.com'
						target='_blank'
						rel='noopener noreferrer'
						icon={<IoIosMail size={20} className='relative top-0.5' />}
						className='rounded-full! bg-white! text-black/50 hover:text-primary!'
					/>
				</div>
			</div>
		</footer>
	)
}
export default Footer
