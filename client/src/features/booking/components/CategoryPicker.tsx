import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useBooking } from '../context/useBooking'

import { ServicePicker } from './ServicePicker'
import { useCategory } from '@/pages/home/servicesSection/hooks/useCategory'

export const CategoryPicker = () => {
	const { categories, isLoading, isError } = useCategory()
	const { closeBooking } = useBooking()
	const [activeCategoryId, setActiveCategoryId] = useState<
		number | string | null
	>(null)

	const handleCollapseChange = (activeKeys: string | string[]) => {
		const key = Array.isArray(activeKeys) ? activeKeys[0] : activeKeys
		setActiveCategoryId(key ?? null)
	}

	const activeCategory = categories.find(
		category => String(category.id) === String(activeCategoryId)
	)
	const isEmpty = !isLoading && !isError && categories.length === 0

	useEffect(() => {
		if (!isEmpty) {
			return
		}

		toast.error('Категорий не найдено')
		closeBooking()
	}, [closeBooking, isEmpty])

	const items: CollapseProps['items'] = categories.map(category => ({
		key: category.id,
		label: category.name,
		children: <ServicePicker categoryId={category.id} />
	}))

	if (isLoading || isError || isEmpty) {
		return null
	}

	return (
		<div>
			<h1 className='text-4xl text-base uppercase mb-10'>
				{!activeCategory
					? 'Выберите категорию'
					: `Выберите услугу из категории ${activeCategory.name}`}
			</h1>
			<Collapse
				onChange={key => handleCollapseChange(key)}
				styles={{
					title: {
						fontSize: '24px',
						marginTop: '-6px',
						color: 'black'
					}
				}}
				className='uppercase'
				accordion
				items={items}
				size='large'
			/>
		</div>
	)
}
