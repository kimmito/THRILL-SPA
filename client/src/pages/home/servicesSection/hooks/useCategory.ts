import { useQuery } from '@tanstack/react-query'

import { CategoryService } from '@/services/category.service'

export const useCategory = () => {
	const { data: categories } = useQuery({
		queryKey: ['category'],
		queryFn: () => CategoryService.getAll()
	})

	return { categories: categories ?? [] }
}
