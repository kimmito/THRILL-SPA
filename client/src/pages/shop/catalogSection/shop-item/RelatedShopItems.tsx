import { Loader } from '@/components/ui/Loader'

import type { ShopItem } from '@/types/shop/shop-item.type'

import { ShopItemEl } from './ShopItemEl'
import { useRelatedShopItems } from './hooks/useRelatedShopItems'

export const RelatedShopItems = ({ item }: { item: ShopItem }) => {
	const { relatedItems, isLoading } = useRelatedShopItems(item, true, 3)

	return (
		<div className='w-[1440px] mx-auto mt-20'>
			<h2 className='text-5xl text-head my-10 ml-6'>Вам может понравиться</h2>
			{isLoading ? (
				<Loader />
			) : (
				<div className=' grid grid-cols-3 gap-20'>
					{relatedItems.map(relatedItem => (
						<ShopItemEl key={relatedItem.id} item={relatedItem} />
					))} 
				</div>
			)}
		</div>
	)
}
