import { useQuery } from '@tanstack/react-query'

import { ShopItemService } from '@/services/shop/shop-item.service'

export const useShopItems = () => {
	const { data: shopItems, isLoading: isItemsLoading } = useQuery({
		queryKey: ['shopItems'],
		queryFn: ShopItemService.getAll
	})
	return { shopItems, isItemsLoading }
}
