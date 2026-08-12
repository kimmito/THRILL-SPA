import { Loader } from '@/components/ui/Loader'
import { AppButton } from '@/components/ui/appButton/AppButton'

import { ShopItemCard } from './shop-item/ShopItemCard'
import { useShopItems } from './shop-item/useShopItems'
import { useShopCategory } from './useShopCategory'

const CatalogSection = () => {
	const { shopCategories, isCategoriesLoading } = useShopCategory()
	const { shopItems, isItemsLoading } = useShopItems()
	return (
		<div id='catalog' className="mb-30">
			<div className='w-full flex flex-row gap-4 items-center ml-[11vw] mb-20'>
				<h2 className='text-head block font-bold text-7xl uppercase'>
					Магазин
				</h2>
				{isCategoriesLoading && <p>Загрузка категорий...</p>}
				<nav>
					<ul className='flex flex-row gap-10 ml-8'>
						{shopCategories?.map(category => (
							<li key={category.id}>
								<AppButton
									appVariant='link'
									className='underline text-[#605792]! text-2xl! uppercase hover:text-accent!'
								>
									{category.name}
								</AppButton>
							</li>
						))}
					</ul>
				</nav>
			</div>
			{isItemsLoading && <Loader />}
			<div className='w-[1440px] mx-auto grid grid-cols-3 gap-20'>
				{shopItems?.map(item => (
					<ShopItemCard key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}

export default CatalogSection
