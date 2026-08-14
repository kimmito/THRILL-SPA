import type { ShopPost } from '@/types/shop/shop-post.type'

interface PostsSlideProps {
	post: ShopPost
}

export const PostsSlide = ({ post }: PostsSlideProps) => {
	return (
		<div className='flex flex-row justify-center items-center gap-4 mx-auto select-none mt-5'>

			<div className='bg-[#5F5F5F] pl-30 pt-7 pb-10 min-w-[700px] bg-cover bg-center bg-no-repeat' >
				<h3 className='text-[44px] text-head'>{post.title}</h3>
				<p className='text-2xl text-head'>{post.description}</p>
			</div>

		</div>
	)
}
