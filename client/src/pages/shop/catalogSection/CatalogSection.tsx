import { useState } from 'react'

import { Loader } from '@/components/ui/Loader'
import { AppButton } from '@/components/ui/appButton/AppButton'

import { ShopItemEl } from './shop-item/ShopItemEl'
import {
	useShopItems,
	useShopItemsByCategoryId
} from './shop-item/useShopItems'
import { useShopCategory } from './useShopCategory'

const CatalogSection = () => {
	const { shopCategories, isCategoriesLoading } = useShopCategory()

	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)

	const { shopItems, isItemsLoading } = useShopItems()
	const { filteredShopItems, isFilteredItemsLoading } =
		useShopItemsByCategoryId(activeCategoryId || 0)

	const displayedShopItems = activeCategoryId ? filteredShopItems : shopItems
	const displayedLoading = activeCategoryId
		? isFilteredItemsLoading
		: isItemsLoading

	const handleCategoryClick = (categoryId: number | null) => {
		setActiveCategoryId(categoryId)
	}
	return (
		<div id='catalog' className='mb-30'>
			<div className='w-full flex flex-row gap-4 items-center ml-[11vw] mb-20'>
				<h2 className='text-head block font-bold text-7xl uppercase'>
					Магазин
				</h2>
				{isCategoriesLoading && (
					<p className='text-xl ml-8'>Загрузка категорий...</p>
				)}
				<nav>
					<ul className='flex flex-row gap-10 ml-8'>
						<li className='cursor-pointer'>
							<AppButton
								appVariant='link'
								onClick={() => handleCategoryClick(null)}
								className={`underline text-[#605792]! text-2xl! uppercase hover:text-accent! ${activeCategoryId === null ? 'text-accent!' : ''}`}
							>
								Все товары
							</AppButton>
						</li>
						{shopCategories?.map(category => (
							<li
								key={category.id}
								onClick={() => handleCategoryClick(category.id)}
								className='cursor-pointer'
							>
								<AppButton
									appVariant='link'
									className={`underline text-[#605792]! text-2xl! uppercase hover:text-accent! ${activeCategoryId === category.id ? 'text-accent!' : ''}`}
								>
									{category.name}
								</AppButton>
							</li>
						))}
					</ul>
				</nav>
			</div>
			{displayedLoading && <Loader />}

			{!displayedLoading && displayedShopItems?.length === 0 && (
				<div className='text-center text-2xl text-gray-500 py-20'>
					Нет товаров в этой категории
				</div>
			)}

			<div className='w-[1440px] mx-auto grid grid-cols-3 gap-20'>
				{displayedShopItems?.map(item => (
					<ShopItemEl key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}

export default CatalogSection
