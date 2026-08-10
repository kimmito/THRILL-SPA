import { useKeenSlider } from 'keen-slider/react'
import { IoChevronBack } from 'react-icons/io5'

import { AppButton } from '@/components/ui/appButton/AppButton'

import type { Review } from '@/types/review.type'

import { ReviewCard } from './ReviewCard'

export const ReviewSlider = ({ reviews }: { reviews: Review[] }) => {
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		loop: true,
		drag: true,
		slides: {
			perView: 1,
			origin: 'center',
			spacing: 48
		}
	})
	return (
		<div
			ref={sliderRef}
			className='keen-slider w-3/8 mr-0 bg-[#5F5F5F] h-[clamp(400px,60vh,700px)]! overflow-hidden relative'
		>
			{reviews.map(review => (
				<ReviewCard key={review.id} review={review} />
			))}
			<div className='keep-slider-controls absolute left-15 bottom-10 z-10 flex items-center gap-12'>
				<AppButton
					aria-label='Предыдущий отзыв'
					appVariant='icon'
					className='group h-12! w-12! min-w-12! rounded-none! text-button! border-button!'
					onClick={() => instanceRef.current?.prev()}
				>
					<IoChevronBack className='text-[28px] transition-colors duration-200 ease' />
				</AppButton>
				<AppButton
					aria-label='Следующий отзыв'
					appVariant='icon'
					className='group h-12! w-12! min-w-12! rounded-none!  text-button! border-button!'
					onClick={() => instanceRef.current?.next()}
				>
					<IoChevronBack className='rotate-180 text-[28px] transition-colors duration-200 ease' />
				</AppButton>
			</div>
		</div>
	)
}
