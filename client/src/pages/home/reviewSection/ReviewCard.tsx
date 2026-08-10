import { RxAvatar } from 'react-icons/rx'

import type { Review } from '@/types/review.type'

type ReviewCardProps = {
	review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
	const formattedDate = new Date(review.date).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
	return (
		<div className='keen-slider__slide min-w-0'>
			<div className='box-border h-full w-full max-w-full px-15 py-15 pr-25'>
				<div className='flex min-w-0 flex-row items-center gap-5'>
					<div className='mt-3 shrink-0'>
						{review.imagePath ? (
							<img
								src={review.imagePath}
								alt={review.author}
								className='h-16 w-16 rounded-full'
							/>
						) : (
							<RxAvatar className='h-16 w-16' />
						)}
					</div>

					<div className='min-w-0'>
						<p className='text-head truncate text-[32px] font-bold'>
							{review.author}
						</p>
						<p className='text-head text-[24px] leading-none'>
							{formattedDate}
						</p>
					</div>
				</div>
				<div className='mb-5'>
					{[...Array(review.stars)].map((_, i) => (
						<span key={i} className='text-yellow-500 text-[32px]'>
							★
						</span>
					))}
					{[...Array(5 - review.stars)].map((_, i) => (
						<span key={i} className='text-gray-300 text-[32px]'>
							★
						</span>
					))}
				</div>
				<p className='text-head max-w-full overflow-hidden break-words text-2xl font-bold leading-snug'>
					{review.text}
				</p>
			</div>
		</div>
	)
}
