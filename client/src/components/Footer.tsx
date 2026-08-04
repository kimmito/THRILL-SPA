import { Col, Row } from 'antd'
import { AiFillInstagram } from 'react-icons/ai'
import { FaTelegramPlane, FaVk } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router'

import { AppButton } from '@/components/ui/appButton/AppButton'

import { useCategory } from '@/pages/home/servicesSection/hooks/useCategory'

const Footer = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { categories } = useCategory()
	if (!categories || categories.length === 0) {
		return null
	}
	const staticFooterItems = [
		{
			key: 's0',
			label: categories[0].name,
			categorySlug: categories[0]?.slug,
			span: 6
		},
		{ key: 'about', label: 'О нас', span: 6, href: '#about' },
		{ key: 'services', label: 'Услуги', hash: 'services', span: 6 },
		{ key: 'portfolio', label: 'Портфолио', span: 6, href: '#portfolio' },

		{
			key: 's1',
			label: categories[1]?.name,
			categorySlug: categories[1]?.slug,
			span: 6
		},
		{ key: 'empty-18-0', label: null, span: 18 },

		{
			key: 's2',
			label: categories[2]?.name,
			categorySlug: categories[2]?.slug,
			span: 6
		},
		{ key: 'empty-18-1', label: null, span: 18 },

		{
			key: 's3',
			label: categories[3]?.name,
			categorySlug: categories[3]?.slug,
			span: 6
		}
	]

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
		<footer className='site-footer w-full  gap-20 bg-dark px-4 py-10 text-copy'>
			<div className='max-w-380 mx-auto justify-between flex'>
				<div className='flex items-center max-w-2/7'>
					<p className='text-[14px] tracking-wide text-copy/60 '>
						&copy; 2026 THRILL. Все права защищены. <br />
						Цены на нашем сайте не являются публичной офертой, актуальные цены
						можно узнать при записи.
					</p>
				</div>

				<div>
					<Row gutter={[10, 10]} className='font-semibold'>
						{footerItems.map(item => (
							<Col key={item.key} span={item.span}>
								{item.label ? (
									<AppButton
										appVariant='link'
										className='inline-block text-[16px]'
										href={item.href ? item.href : undefined}
										onClick={
											item.categorySlug
												? () => scrollToServices(item.categorySlug)
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
						/>
					</div>
				</div>
			</div>
		</footer>
	)
}
export default Footer
