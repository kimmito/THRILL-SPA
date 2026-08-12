import type { ShopCategory } from '@/types/shop/shop-category.type'

import { getShopCategoryUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const ShopCategoryService = {
	async getAll() {
		return request<ShopCategory[]>({
			url: getShopCategoryUrl(''),
			method: 'GET'
		})
	}
}
