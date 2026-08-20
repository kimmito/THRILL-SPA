import { useMemo } from 'react'

import type { ShopItem } from '@/types/shop/shop-item.type'

import { useShopItemsByCategoryId } from './useShopItems'

export const useRelatedShopItems = (
	shopItem: ShopItem,
	excludeCurrent: boolean = true,
	limit: number = 3
) => {

  const categoryId = shopItem.shopCategoryId
	const { filteredShopItems, isFilteredItemsLoading } =
		useShopItemsByCategoryId(categoryId)

	const relatedItems = useMemo(() => {
		if (!filteredShopItems || !shopItem) return []

		if (excludeCurrent && shopItem) {
			return filteredShopItems
				.filter(item => item.id !== shopItem.id)
				.sort((a, b) => {
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
				})
				.slice(0, limit)
		}
		return filteredShopItems
	}, [filteredShopItems, shopItem, excludeCurrent, limit])

  console.log('relatedItems', relatedItems)
  console.log('isFilteredItemsLoading', isFilteredItemsLoading)
  console.log('shopItem', shopItem)
  console.log('categoryId', categoryId)
	return {
		relatedItems: relatedItems || [],
		isLoading: isFilteredItemsLoading || !shopItem
	}
}
