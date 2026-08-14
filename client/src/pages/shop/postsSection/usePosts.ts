import { useQuery } from '@tanstack/react-query'

import { PostService } from '@/services/shop/post.service'

export const usePosts = () => {
	const { data: posts, isLoading } = useQuery({
		queryKey: ['posts'],
		queryFn: () => PostService.getAll()
	})
	return { posts, isLoading }
}
