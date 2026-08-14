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

	async getByCategoryId(categoryId: number) {
		return request<ShopItem[]>({
			url: getShopItemUrl(`/by-category/${categoryId}`),
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return request<ShopItem>({
			url: getShopItemUrl(`/${slug}`),
			method: 'GET'
		})
	}
}
