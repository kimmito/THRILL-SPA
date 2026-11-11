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
		label: (
			<span className='text-lg font-semibold tracking-wide text-neutral-800'>
				{category.name}
			</span>
		),
		children: <ServicePicker categoryId={category.id} />
	}))

	if (isLoading || isError || isEmpty) {
		return null
	}

	return (
		<div className='mt-10'>
			<h1 className='mb-7 text-3xl uppercase text-base'>
				{!activeCategory
					? 'Выберите категорию'
					: `Выберите услугу из категории ${activeCategory.name}`}
			</h1>

			<Collapse
				onChange={key => handleCollapseChange(key)}
				accordion
				items={items}
				size='large'
				className='uppercase [&_.ant-collapse-header]:items-center! [&_.ant-collapse-header]:border! [&_.ant-collapse-header]:border-neutral-200! [&_.ant-collapse-header]:bg-white! [&_.ant-collapse-header]:px-5! [&_.ant-collapse-header]:py-4! [&_.ant-collapse-header]:shadow-sm! [&_.ant-collapse-header]:transition-all! [&_.ant-collapse-header]:duration-200! [&_.ant-collapse-header:hover]:border-neutral-300! [&_.ant-collapse-header]:mb-3 [&_.ant-collapse-header:hover]:bg-neutral-50! [&_.ant-collapse-header:hover]:shadow-md! [&_.ant-collapse-item]:mb-3! [&_.ant-collapse-item]:overflow-hidden! [&_.ant-collapse-item]:border-none! [&_.ant-collapse-item-active_.ant-collapse-header]:border-neutral-800! [&_.ant-collapse-item-active_.ant-collapse-header]:bg-base/70! [&_.ant-collapse-item-active_.ant-collapse-header_span]:text-white! [&_.ant-collapse-item-active_.ant-collapse-header_.ant-collapse-arrow]:text-white! [&_.ant-collapse-item-active_.ant-collapse-header_.ant-collapse-arrow]:mr-1! [&_.ant-collapse-content]:rounded-b-xl! [&_.ant-collapse-content]:border! [&_.ant-collapse-content]:border-t-0! [&_.ant-collapse-content]:border-neutral-200! [&_.ant-collapse-content-box]:px-5! [&_.ant-collapse-content-box]:py-5! [&_.ant-collapse-arrow]:flex! [&_.ant-collapse-arrow]:items-center! [&_.ant-collapse-arrow]:text-base! [&_.ant-collapse-arrow]:mr-1! [&_.ant-collapse-arrow]:text-neutral-500! [&_.ant-collapse-expand-icon]:flex! [&_.ant-collapse-expand-icon]:items-center! [&_.ant-collapse-expand-icon]:self-center!'
			/>
		</div>
	)
}
