import { useQuery } from '@tanstack/react-query'

import { CategoryService } from '@/services/category.service'

export const useCategory = () => {
	const { data: categories, isLoading, isError } = useQuery({
		queryKey: ['category'],
		queryFn: () => CategoryService.getAll()
	})

	return { categories: categories ?? [], isLoading, isError }
}
