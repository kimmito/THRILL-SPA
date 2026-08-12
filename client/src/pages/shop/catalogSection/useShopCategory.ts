import { useQuery } from '@tanstack/react-query'

import { ShopCategoryService } from '../../../services/shop/shop-category.service'

export const useShopCategory = () => {
	const { data: shopCategories, isLoading } = useQuery({
		queryKey: ['shopCategories'],
		queryFn: ShopCategoryService.getAll
	})
	return { shopCategories, isCategoriesLoading: isLoading }
}
