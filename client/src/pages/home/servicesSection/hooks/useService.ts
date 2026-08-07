import { useQuery } from '@tanstack/react-query'

import { ServiceService } from '@/services/service.service'

export const useServices = () => {
	const { data: services, isLoading } = useQuery({
		queryKey: ['services'],
		queryFn: () => ServiceService.getAll()
	})

	return { services: services ?? [], isLoading }
}

export const useServicesByCategoryId = (categoryId: number) => {
	const { data: services, isLoading } = useQuery({
		queryKey: ['services', 'category', categoryId],
		queryFn: () => ServiceService.getByCategoryId(categoryId)
	})
	return { services: services ?? [], isLoading }
}

export const useServiceBySlug = (slug: string) => {
	const { data: service, isLoading } = useQuery({
		queryKey: ['service', slug],
		queryFn: () => ServiceService.getBySlug(slug)
	})
	return { service: service ?? null, isLoading }
}
