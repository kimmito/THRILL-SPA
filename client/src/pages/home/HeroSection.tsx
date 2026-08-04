import type { RefObject } from 'react'
import { useNavigate } from 'react-router'

import { AppButton } from '@/components/ui/appButton/AppButton'

import heroImage from '@/assets/images/hero.jpg'
import { useCategory } from './servicesSection/hooks/useCategory'

export type HeroSectionProps = {
	servicesRef?: RefObject<HTMLDivElement | null> | null
}

export const HeroSection = () => {
	const links = [
		{ href: '#about', label: 'О нас' },
		{ href: '#services', label: 'Услуги' },
		{ href: '#portfolio', label: 'Портфолио' },
		{ href: '#map', label: 'Контакты' }
	]
	const navigate = useNavigate()
	const { categories } = useCategory()
	return (
		<section
			className='relative flex h-[92vh] max-w-375 mx-auto px-4 mt-10 items-center justify-between gap-20'
			id='home'
		>
			<div className='flex w-1/2 mx-20 text-center items-center justify-center flex-col '>
				<nav className='w-full mb-8'>
					<ul className='flex justify-between mb-10 w-full'>
						{links.map(link => (
							<li key={link.label}>
								<AppButton
									appVariant='outline'
									className='text-[16px]! py-5! px-7!'
									href={link.href}
								>
									{link.label}
								</AppButton>
							</li>
						))}
					</ul>
				</nav>
				<div className='flex flex-col items-center justify-center'>
					<h2 className='block text-3xl uppercase'>
						Салон красоты в Краснодаре
					</h2>
					<h1 className='block text-8xl font-title font-semibold uppercase tracking-widest'>
						Thrill
					</h1>
					<ul className='flex -mt-1 justify-center text-[23px] [&>li]:after:content-["|"] [&>li]:after:mx-4 [&>li]:last:after:content-[""] [&>li]:last:after:mx-0'>
						{categories.map(category => (
							<li key={category.name}>
								<span className='lowercase'>{category.name}</span>
							</li>
						))}
					</ul>
				</div>

				<div className='mt-12 mb-18 flex w-full justify-between'>
					<AppButton appVariant='primary' className='w-75 py-6 text-2xl!'>
						Онлайн-запись
					</AppButton>
					<AppButton
						appVariant='primary'
						className='w-75 py-6 text-2xl!'
						onClick={() => navigate('/shop')}
					>
						Магазин
					</AppButton>
				</div>
				<div className='flex flex-col gap-2'>
					<AppButton appVariant='link' className='px-2'>
						<span>Войти в аккаунт</span>
					</AppButton>
					<AppButton appVariant='link' className='px-2'>
						Зарегистрироваться
					</AppButton>
				</div>
			</div>
			<div>
				<img
					src={heroImage}
					alt='Салон красоты THRILL'
					className='-z-1 h-[99vh] object-cover relative right-0 -top-14 shadow-lg shadow-fuchsia-950/20 rounded-b-lg overflow-hidden w-full'
				/>
			</div>
		</section>
	)
}
