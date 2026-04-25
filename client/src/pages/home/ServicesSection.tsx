import { forwardRef, useCallback, useMemo, useState } from 'react'
import type { RefObject } from 'react'

import { AppButton } from '@/components/AppButton'
import { categories } from '@/data/categories'
import { useServiceConnectorLine } from '@/pages/home/hooks/useServiceConnectorLine'

export const ServicesSection = forwardRef<HTMLDivElement>((_, ref) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		categories.length > 0 ? categories[0].id : null
	)
	const categoryIds = useMemo(() => categories.map(category => category.id), [])
	const { sectionRef, tabsRef, priceRef, buttonRefs, line } =
		useServiceConnectorLine({ selectedCategory, categoryIds })
	const setSectionRef = useCallback(
		(node: HTMLDivElement | null) => {
			sectionRef.current = node
			if (typeof ref === 'function') {
				ref(node)
				return
			}
			if (ref) {
				;(ref as RefObject<HTMLDivElement | null>).current = node
			}
		},
		[ref, sectionRef]
	)

	return (
		<section className='mt-16 max-w-400 mx-auto px-4 mb-100'>
			<div ref={setSectionRef} className='relative'>
				<h2 className='text-[#E8E8E8] uppercase font-bold text-8xl text-end mb-26'>
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
								appVariant={selectedCategory === category.id ? 'active' : 'primary'}
								className='px-16 py-5 text-2xl! hover:bg-transparent hover:text-accent! hover:border-accent hover:opacity-75'
							>
								{category.name}
							</AppButton>
						</div>
					))}
				</div>
				<div ref={priceRef} className='bg-panel w-1/2 h-100 mt-50'>
					{selectedCategory ? (
						<p className='text-base text-2xl p-10'>
							Прайс категории {categories.find(cat => cat.id === selectedCategory)?.name}
						</p>
					) : null}
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
})
