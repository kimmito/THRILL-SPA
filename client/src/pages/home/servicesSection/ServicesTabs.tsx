import { AppButton } from '@/components/ui/appButton/AppButton'

import type { Category } from '@/types/category.type'

type ServicesTabsProps = {
	ref: React.Ref<HTMLDivElement>
	categories: Category[]
	selectedCategory: number | null
	onSelectCategory: (categoryId: number) => void
	buttonRefs: React.RefObject<Record<number, HTMLDivElement | null>>
}

export const ServicesTabs = ({
	ref,
	categories,
	selectedCategory,
	onSelectCategory,
	buttonRefs
}: ServicesTabsProps) => {
	return (
		<div
			ref={ref}
			role='tablist'
			aria-label='Выбор услуги'
			className='w-371 mx-auto flex justify-between mb-10'
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
						onClick={() => onSelectCategory(category.id)}
						appVariant={selectedCategory === category.id ? 'active' : 'primary'}
						className='px-20 text-head py-6 text-2xl! hover:bg-transparent hover:text-accent! hover:border-accent hover:opacity-75'
					>
						{category.name}
					</AppButton>
				</div>
			))}
		</div>
	)
}
