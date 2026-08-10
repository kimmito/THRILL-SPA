import { Loader } from '@/components/ui/Loader'

import posingImage from '@/assets/images/posing.jpg'

import { ReviewSlider } from './ReviewSlider'
import { useReviews } from './useReview'

const ReviewsSection = () => {
	const { reviews, isLoading } = useReviews()

	return (
		<section className='mt-20 flex flex-row items-center'>
			<h2 className='w-1/8 color-head font-bold text-center text-[96px] [writing-mode:vertical-rl] rotate-180 flex items-end justify-center'>
				Отзывы
			</h2>
			{isLoading ? <Loader /> : <ReviewSlider reviews={reviews} />}

			<img src={posingImage} className='w-3/8 shrink-0 object-contain' alt='' />
		</section>
	)
}
export default ReviewsSection
