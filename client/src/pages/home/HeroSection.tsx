import type { RefObject } from 'react'
import { useNavigate } from 'react-router'

import { AppButton } from '@/components/AppButton'

import heroImage from '@/assets/images/hero.jpg'

import { services } from '@/data/services'

export type HeroSectionProps = {
	servicesRef?: RefObject<HTMLDivElement | null> | null
}

export const HeroSection = () => {
	const links = [
		{ href: '#', label: 'О нас' },
		{ href: '#', label: 'Услуги' },
		{ href: '#', label: 'Портфолио' },
		{ href: '#', label: 'Контакты' }
	]
	const navigate = useNavigate()
	return (
		<section className='flex'>
			<div className='flex w-1/2 mx-20 text-center items-center justify-center flex-col '>
				<nav className='w-full mb-8'>
					<ul className='flex justify-center gap-10 mb-10 w-full'>
						{links.map(link => (
							<li key={link.label}>
								<AppButton appVariant='outline' className='text-[20px]! p-6!'>
									{link.label}
								</AppButton>
							</li>
						))}
					</ul>
				</nav>
				<h2 className='text-3xl uppercase'>Салон красоты в Краснодаре</h2>
				<h1 className='text-8xl font-title font-semibold uppercase tracking-widest'>
					Thrill
				</h1>
				<ul className='flex mt-6 justify-center text-2xl [&>li]:after:content-["|"] [&>li]:after:mx-4 [&>li]:last:after:content-[""]'>
					{services.map(service => (
						<li key={service.name}>
							<span className='lowercase'>{service.name}</span>
						</li>
					))}
				</ul>
				<div className='mt-12 mb-18 flex gap-10 justify-center'>
					<AppButton
						appVariant='primary'
						className='w-75 py-6 text-3xl! hover:text-accent! hover:border-accent hover:bg-transparent'
					>
						Онлайн-запись
					</AppButton>
					<AppButton
						appVariant='primary'
						className='w-75 py-6 text-3xl! hover:text-accent! hover:border-accent hover:bg-transparent'
						onClick={() => navigate('/shop')}
					>
						Магазин
					</AppButton>
				</div>
				<div className='flex flex-col gap-2'>
					<AppButton appVariant='link' className='text-xl'>Войти в аккаунт</AppButton>
					<AppButton appVariant='link' className='text-xl'>Зарегистрироваться</AppButton>
				</div>
			</div>
			<div>
				<img
					src={heroImage}
					alt='Салон красоты THRILL'
					className='h-[90vh] relative right-0 -top-14 shadow-lg shadow-fuchsia-950/20 rounded-b-lg overflow-hidden w-full object-cover'
				/>
			</div>
		</section>
	)
}
