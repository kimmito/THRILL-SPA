import type { RepeatVisitOffer } from '@/data/offers'

type RepeatVisitDiscountSlideProps = {
	offer: RepeatVisitOffer
}

const RepeatVisitDiscountSlide = ({ offer }: RepeatVisitDiscountSlideProps) => {
	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<ul className='list-disc pl-5 text-lg'>
				{offer.items.map((item) => (
					<li key={item.id} className='mb-2'>
						{item.title}: {item.value}
					</li>
				))}
			</ul>
		</div>
	)
}

export default RepeatVisitDiscountSlide
