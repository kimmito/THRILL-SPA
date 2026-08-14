import { useQuery } from '@tanstack/react-query'

import { ShopItemService } from '@/services/shop/shop-item.service'

export const useShopItems = () => {
	const { data: shopItems, isLoading: isItemsLoading } = useQuery({
		queryKey: ['shopItems'],
		queryFn: ShopItemService.getAll
	})
	return { shopItems, isItemsLoading }
}

export const useShopItemsByCategoryId = (categoryId: number | null) => {
	const { data: filteredShopItems, isLoading: isFilteredItemsLoading } =
		useQuery({
			queryKey: ['shopItems', 'category', categoryId],
			queryFn: () => ShopItemService.getByCategoryId(categoryId || 0),
			enabled: !!categoryId && categoryId > 0
		})

	return { filteredShopItems, isFilteredItemsLoading }
}

export const useShopItemBySlug = (slug: string) => {
	const { data: shopItem, isLoading: isShopItemLoading } = useQuery({
		queryKey: ['shopItem', slug],
		queryFn: async () => {
			const result = await ShopItemService.getBySlug(slug)
			return result
		},
		enabled: !!slug && slug.length > 0
	})

	return { shopItem, isShopItemLoading }
}
