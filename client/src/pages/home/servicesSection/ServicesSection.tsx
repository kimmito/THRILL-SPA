import { useEffect, useMemo, useState } from 'react'

import { AppButton } from '@/components/ui/AppButton'

import { categories } from '@/data/categories'
import { useServiceConnectorLine } from '@/pages/home/servicesSection/useServiceConnectorLine'

const PRICE_HASH_PREFIX = 'services-price-'

export const ServicesSection = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		categories.length > 0 ? categories[0].id : null
	)
	const categoryIds = useMemo(() => categories.map(category => category.id), [])
	const { sectionRef, tabsRef, priceRef, buttonRefs, line } =
		useServiceConnectorLine({ selectedCategory, categoryIds })

	useEffect(() => {
		const applyPriceHash = () => {
			const hash = window.location.hash.replace('#', '')
			const categoryId = hash.startsWith(PRICE_HASH_PREFIX)
				? hash.slice(PRICE_HASH_PREFIX.length)
				: null
			const category = categories.find(item => item.id === categoryId)

			if (category) {
				setSelectedCategory(category.id)
			}

			if (category || hash === 'services-price') {
				requestAnimationFrame(() => {
					sectionRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					})
				})
			}
		}

		applyPriceHash()
		window.addEventListener('hashchange', applyPriceHash)

		return () => {
			window.removeEventListener('hashchange', applyPriceHash)
		}
	}, [priceRef, sectionRef])

	return (
		<section
			id='services'
			className='relative mt-16 before:absolute before:inset-0 before:bg-[url("/src/assets/images/group1.png")] before:overflow-visible before:pb-120 before:-mb-120 before:bg-position-[right_top_3rem] before:bg-no-repeat before:content-[""] before:opacity-80 before:mix-blend-overlay'
		>
			<div ref={sectionRef} className='relative max-w-400 mx-auto px-4'>
				<h2 className='text-head uppercase font-bold text-8xl text-end mb-26'>
					Услуги
				</h2>
				<div
					ref={tabsRef}
					role='tablist'
					aria-label='Выбор услуги'
					className='w-full mx-auto flex justify-between mb-10 gap-4'
				>
					{categories.map(category => (
						<div
							key={category.id}
							ref={node => {
								buttonRefs.current[category.id] = node
							}}
						>
							<AppButton
								role='tab'
								aria-selected={selectedCategory === category.id}
								onClick={() => setSelectedCategory(category.id)}
								appVariant={
									selectedCategory === category.id ? 'active' : 'primary'
								}
								className='px-20 text-head py-6 text-2xl! hover:bg-transparent hover:text-accent! hover:border-accent hover:opacity-75'
							>
								{category.name}
							</AppButton>
						</div>
					))}
				</div>
				<div id='services-price' ref={priceRef} className='mt-30'>
					<table className='w-1/2 mb-18 ml-10 border-collapse [&_td]:border-b [&_td]:border-line/35 [&_td]:py-5 [&_td:last-child]:pl-8 [&_td:last-child]:text-right [&_tr:last-child_td]:border-b-0'>
						<tbody>
							<tr>
								<td className='text-2xl max-w-100'>Маникюр</td>
								<td className='text-[32px] font-bold text-center'>1500 ₽</td>
							</tr>
							<tr>
								<td className='text-2xl max-w-100'>Маникюр</td>
								<td className='text-[32px] font-bold text-center'>2000 ₽</td>
							</tr>
							<tr>
								<td className='text-2xl max-w-100'>Маникюр</td>
								<td className='text-[32px] font-bold text-center'>2000 ₽</td>
							</tr>
							<tr>
								<td className='text-2xl max-w-100'>Маникюр</td>
								<td className='text-[32px] font-bold text-center'>2000 ₽</td>
							</tr>
							<tr>
								<td className='text-2xl max-w-100'>Маникюр</td>
								<td className='text-[32px] font-bold text-center'>2000 ₽</td>
							</tr>
						</tbody>
					</table>
					<div className='flex flex-row gap-3 ml-10 w-1/2 *:flex *:px-20 *:py-6 *:text-2xl'>
						<AppButton
							className='flex-2 hover:bg-transparent hover:text-accent! hover:border-accent'
							appVariant='primary'
						>
							Онлайн-запись
						</AppButton>
						<AppButton className='flex-1' appVariant='outline'>
							Портфолио
						</AppButton>
					</div>
				</div>

				{line ? (
					<div className='pointer-events-none absolute inset-0'>
						<div
							className='absolute bg-accent'
							style={{
								left: `${line.railX}px`,
								top: `${line.railTop}px`,
								width: '1px',
								height: `${line.railHeight}px`
							}}
						/>
						{line.hasConnector ? (
							<>
								<div
									className='absolute bg-accent'
									style={{
										left: `${line.branchLeft}px`,
										top: `${line.branchY}px`,
										width: `${line.branchWidth}px`,
										height: '1px'
									}}
								/>
								<div
									className='absolute bg-accent'
									style={{
										left: `${line.linkX}px`,
										top: `${line.linkTop}px`,
										width: '1px',
										height: `${line.linkHeight}px`
									}}
								/>
							</>
						) : null}
					</div>
				) : null}
			</div>
		</section>
	)
}
