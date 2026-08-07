import { useQuery } from '@tanstack/react-query'

import { PortfolioService } from '@/services/portfolio.service'

export const usePortfolio = () => {
	const { data: portfolio, isLoading } = useQuery({
		queryKey: ['portfolio'],
		queryFn: () => PortfolioService.getAll()
	})
	return { portfolio: portfolio ?? [], isLoading }
}

export const usePortfolioBySection = (
	section: 'NAILS' | 'BROWS' | 'LASHES'
) => {
	const { data: portfolio, isLoading } = useQuery({
		queryKey: ['portfolio', section],
		queryFn: () => PortfolioService.getBySection(section)
	})
	return { portfolio: portfolio ?? [], isLoading }
}
