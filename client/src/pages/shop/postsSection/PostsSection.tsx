import type { CarouselRef } from 'antd/es/carousel'
import { useRef } from 'react'

import { Loader } from '@/components/ui/Loader'

import { PostsSlider } from './PostsSlider'
import { usePosts } from './usePosts'

const PostsSection = () => {
	const { posts, isLoading } = usePosts()

	const carouselRef = useRef<CarouselRef>(null)

	return (
		<div id='posts' className='relative my-30'>
			{isLoading ? (
				<div className='flex h-[250px] items-center justify-center'>
					<Loader />
				</div>
			) : (
				<PostsSlider posts={posts} carouselRef={carouselRef} />
			)}
		</div>
	)
}

export default PostsSection
