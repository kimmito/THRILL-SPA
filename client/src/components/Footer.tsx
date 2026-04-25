import { Col, Row } from 'antd'
import { AiFillInstagram } from 'react-icons/ai'
import { FaTelegramPlane, FaVk } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router'

import { AppButton } from '@/components/AppButton'

import { categories } from '@/data/categories'

const staticFooterItems = [
	{ key: 's0', label: categories[0].name, categoryId: categories[0].id, span: 6 },
	{ key: 'works', label: 'Наши работы', span: 6 },
	{ key: 'price', label: 'Прайс', hash: 'services-price', span: 6 },
	{ key: 'contacts', label: 'Контакты', span: 6 },

	{ key: 's1', label: categories[1].name, categoryId: categories[1].id, span: 6 },
	{ key: 'gallery', label: 'Фотогалерея', span: 6 },
	{ key: 'empty-12', label: null, span: 12 },

	{ key: 's2', label: categories[2].name, categoryId: categories[2].id, span: 6 },
	{ key: 'empty-18', label: null, span: 18 },

	{ key: 's3', label: categories[3].name, categoryId: categories[3].id, span: 6 }
]

const Footer = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const footerItems = staticFooterItems
	const scrollToServices = (hash: string) => {
		if (location.pathname !== '/') {
			navigate({ pathname: '/', hash })
			return
		}

		window.history.pushState(null, '', `#${hash}`)
		window.dispatchEvent(new HashChangeEvent('hashchange'))
	}
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
		<footer className='site-footer flex w-full justify-center gap-20 bg-base px-4 py-10 text-copy'>
			<div className='w-1/5 flex items-center'>
				<p className='text-[14px] tracking-wide text-copy/60 '>
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
								<AppButton
									appVariant='link'
									className='inline-block text-[16px]'
									onClick={
										item.categoryId
											? () => scrollToServices(`services-price-${item.categoryId}`)
											: item.hash
												? () => scrollToServices(item.hash)
											: undefined
									}
								>
									{item.label}
								</AppButton>
							) : null}
						</Col>
					))}
				</Row>
			</div>
			<div>
				<div className='flex gap-3 bottom-1 mb-2 relative'>
					{social.map(s => (
						<AppButton
							key={s.key}
							href={s.href}
							target='_blank'
							rel='noopener noreferrer'
							icon={s.icon}
							appVariant='icon'
							className='rounded-full'
						/>
					))}
				</div>
				<div>
					<AppButton
						href='https://telegram.com'
						target='_blank'
						rel='noopener noreferrer'
						icon={<IoIosMail size={20} className='relative top-0.5' />}
						appVariant='icon'
						className='rounded-full'
					/>
				</div>
			</div>
		</footer>
	)
}
export default Footer
