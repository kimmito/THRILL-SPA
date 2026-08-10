import { useQuery } from '@tanstack/react-query'

import { ReviewsService } from '@/services/reviews.service'

export const useReviews = () => {
	const { data: reviews, isLoading } = useQuery({
		queryKey: ['reviews'],
		queryFn: ReviewsService.getAll
	})
	return { reviews: reviews || [], isLoading }
}
