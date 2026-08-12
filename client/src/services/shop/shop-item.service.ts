import type { ShopItem } from '@/types/shop/shop-item.type'

import { getShopItemUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const ShopItemService = {
	async getAll() {
		return request<ShopItem[]>({
			url: getShopItemUrl(''),
			method: 'GET'
		})
	},

	async getByCategorySlug(categorySlug: string) {
		return request<ShopItem[]>({
			url: getShopItemUrl(`/by-category/${categorySlug}`),
			method: 'GET'
		})
	}
}
