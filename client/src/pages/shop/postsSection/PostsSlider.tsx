import { Carousel } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'
import { useState } from 'react'

import { GoChevronLeft, GoChevronRight  } from "react-icons/go";
import type { ShopPost } from '@/types/shop/shop-post.type'

import { PostsSlide } from './PostsSlide'

interface IPostsSlider {
	posts: ShopPost[] | undefined
	carouselRef: React.RefObject<CarouselRef | null>
}

export const PostsSlider = ({ posts, carouselRef }: IPostsSlider) => {
	const [currentSlide, setCurrentSlide] = useState(0)

	const goToSlide = (index: number) => {
		carouselRef.current?.goTo(index)
		setCurrentSlide(index)
	}

	const settings = {
		autoplay: true,
		autoplaySpeed: 5000,
		dots: false,
		arrows: true,
		draggable: true,
		infinite: true,
		speed: 1000,

		centerMode: true,
		centerPadding: '25%',
		slidesToShow: 1,
		slidesToScroll: 1,

		pauseOnHover: true,
		pauseOnFocus: true,

		beforeChange: (_: number, next: number) => {
			setCurrentSlide(next)
		},
		afterChange: (current: number) => {
			setCurrentSlide(current)
		}
	}

	if (!posts || posts.length === 0) {
		return null
	}
	if (posts.length === 1) {
		return (
			<div>
				<PostsSlide post={posts[0]} />
			</div>
		)
	}

	return (
		<div>
			<div className='relative'>
				<GoChevronLeft	
					className='text-[100px] absolute left-[430px] top-[52px] z-10 cursor-pointer hover:text-accent transition-colors'
					onClick={() => carouselRef.current?.prev()}
				/>
				<Carousel ref={carouselRef} {...settings}>
					{posts.map(post => (
						<PostsSlide key={post.id} post={post} />
					))}
				</Carousel>
				<GoChevronRight
					className='text-[100px] absolute right-[430px] top-[52px] z-10 cursor-pointer hover:text-accent transition-colors'
					onClick={() => carouselRef.current?.next()}
				/>
			</div>

			<div className='flex justify-center mt-10'>
				{posts.map((_, index) => {
					const isActive = currentSlide === index
					return (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-4 h-4 mx-2 transition-all duration-300 cursor-pointer ${
								isActive
									? 'bg-accent scale-110'
									: 'bg-[#5F5F5F] hover:bg-accent hover:opacity-70'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					)
				})}
			</div>
		</div>
	)
}
