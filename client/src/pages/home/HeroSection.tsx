import type { RefObject } from 'react'
import { useNavigate } from 'react-router'

import { AppButton } from '@/components/AppButton'

import heroImage from '@/assets/images/hero.jpg'

import { categories } from '@/data/categories'

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
		<section className='flex h-[92vh] max-w-350 mx-auto px-4 mt-10 items-center justify-between gap-20'>
			<div className='flex w-1/3 mx-20 text-center items-center justify-center flex-col '>
				<nav className='w-full mb-8'>
					<ul className='flex justify-center gap-10 mb-10 w-full'>
						{links.map(link => (
							<li key={link.label}>
								<AppButton appVariant='outline' className='text-[16px]! p-5!'>
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
					{categories.map(category => (
						<li key={category.name}>
							<span className='lowercase'>{category.name}</span>
						</li>
					))}
				</ul>
				<div className='mt-12 mb-18 flex gap-10 justify-center'>
					<AppButton
						appVariant='primary'
						className='w-75 py-6 text-2xl! hover:text-accent! hover:border-accent hover:bg-transparent'
					>
						Онлайн-запись
					</AppButton>
					<AppButton
						appVariant='primary'
						className='w-75 py-6 text-2xl! hover:text-accent! hover:border-accent hover:bg-transparent'
						onClick={() => navigate('/shop')}
					>
						Магазин
					</AppButton>
				</div>
				<div className='flex flex-col gap-2'>
					<AppButton appVariant='link' className='text-xl'>
						Войти в аккаунт
					</AppButton>
					<AppButton appVariant='link' className='text-xl'>
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
