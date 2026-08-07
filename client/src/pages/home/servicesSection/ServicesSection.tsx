import { useEffect, useMemo, useState } from 'react'

import { ServicesConnectorLine } from './ServicesConnectorLine'
import { ServicesPriceTable } from './ServicesPriceTable'
import { ServicesTabs } from './ServicesTabs'
import { useCategory } from './hooks/useCategory'
import { useServiceConnectorLine } from '@/pages/home/servicesSection/useServiceConnectorLine'

export const ServicesSection = () => {
	const { categories } = useCategory()
	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		categories.length > 0 ? categories[0].id : null
	)
	const categoryIds = useMemo(
		() => categories.map(category => category.id),
		[categories]
	)
	const { sectionRef, tabsRef, priceRef, buttonRefs, line } =
		useServiceConnectorLine({ selectedCategory, categoryIds })

	useEffect(() => {
		const applyPriceHash = () => {
			const hash = window.location.hash.replace('#', '')
			const category = categories.find(item => item.slug === hash) ?? null

			if (category) {
				setSelectedCategory(category.id)
				requestAnimationFrame(() => {
					sectionRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					})
					window.history.replaceState(
						null,
						'',
						`${window.location.pathname}${window.location.search}`
					)
				})
				return
			}

			if (!category && categories.length > 0) {
				setSelectedCategory(prev => prev ?? categories[0].id)
			}
		}

		applyPriceHash()
		window.addEventListener('hashchange', applyPriceHash)

		return () => {
			window.removeEventListener('hashchange', applyPriceHash)
		}
	}, [categories, sectionRef])

	return (
		<section
			id='services'
			className='relative pt-27 before:absolute before:inset-0 before:bg-[url("/src/assets/images/group1.png")] before:overflow-visible before:pb-120 before:-mb-120 before:bg-position-[right_top_3rem] before:bg-no-repeat before:content-[""] before:opacity-80 before:mix-blend-overlay'
		>
			<div ref={sectionRef} className='relative max-w-400 mx-auto px-4'>
				<h2 className='text-head uppercase font-bold text-8xl text-end mb-14 mr-9'>
					Услуги
				</h2>
				<ServicesTabs
					ref={tabsRef}
					categories={categories}
					buttonRefs={buttonRefs}
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
				/>
				<ServicesPriceTable ref={priceRef} categoryId={selectedCategory} />
				<ServicesConnectorLine line={line} />
			</div>
		</section>
	)
}
