import { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppButton } from '@/components/AppButton'
import type { RootState } from '@/store/store'

import { categories } from '@/data/categories'
import { offers } from '@/data/offers'
import { services } from '@/data/services'
import { setCategory, setService } from '@/features/priceTabs/priceTabsSlice'

export const ServicesSection = forwardRef<HTMLDivElement>((_, ref) => {
	const category = useSelector((state: RootState) => state.priceTabs.category)
	const service = useSelector((state: RootState) => state.priceTabs.service)
	const dispatch = useDispatch()

	return (
		<section ref={ref} className='mt-16'>
			<h2 className='text-6xl text-center mb-16 text-copy'>
				Давайте наведем красоту
			</h2>
			<div
				role='tablist'
				aria-label='Выбор категории услуг'
				className='max-w-3/4 w-full	mx-auto flex justify-center gap-10 mb-10'
			>
				{categories.map(cat => (
					<AppButton
						key={cat.id}
						role='tab'
						aria-selected={category === cat.id}
						onClick={() => dispatch(setCategory(cat.id))}
						appVariant={category === cat.id ? 'active' : 'outline'}
						className='px-16 py-5 text-lg'
					>
						{cat.name}
					</AppButton>
				))}
			</div>
			<div
				role='tablist'
				aria-label='Выбор услуги'
				className='max-w-4/5 w-full mx-auto flex justify-center gap-10 mb-10'
			>
				{category === 'offers'
					? offers.map(offer => (
							<AppButton
								key={offer.id}
								role='tab'
								aria-selected={service === offer.id}
								onClick={() => dispatch(setService(offer.id))}
								appVariant={offer.id === service ? 'active' : 'outline'}
								className='px-16 py-5 text-lg'
							>
								{offer.name}
							</AppButton>
						))
					: services
							.filter(s => s.categoryId === category)
							.map(s => (
								<AppButton
									key={s.id}
									role='tab'
									aria-selected={service === s.id}
									onClick={() => dispatch(setService(s.id))}
									appVariant={s.id === service ? 'active' : 'outline'}
									className='px-16 py-5 text-lg'
								>
									{s.name}
								</AppButton>
							))}
			</div>
		</section>
	)
})
