import { useQuery } from '@tanstack/react-query'

import { OffersService } from '@/services/offers.service'

export const useOffers = () => {
	const { data: offers, isLoading } = useQuery({
		queryKey: ['offers'],
		queryFn: () => OffersService.getAll()
	})

	return { offers: offers ?? [], isLoading }
}
