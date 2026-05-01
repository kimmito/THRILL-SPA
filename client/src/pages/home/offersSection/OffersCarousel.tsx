import { Carousel } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'
import { useCallback, useRef } from 'react'
import { IoChevronBack } from 'react-icons/io5'

import { AppButton } from '@/components/ui/AppButton'

import GiftCertificateSlide from './GiftCertificateSlide'
import RepeatVisitDiscountSlide from './RepeatVisitDiscountSlide'
import type { Offer } from '@/data/offers'

type OffersCarouselProps = {
	offers: Offer[]
	activeIndex: number
	onOfferSelect: (index: number) => void
}

const renderSlide = (offer: Offer) => {
	switch (offer.type) {
		case 'repeat-visit':
			return <RepeatVisitDiscountSlide offer={offer} />
		case 'gift-certificate':
			return <GiftCertificateSlide offer={offer} />
		default:
			return null
	}
}

const OffersCarousel = ({
	offers,
	activeIndex,
	onOfferSelect
}: OffersCarouselProps) => {
	const carouselRef = useRef<CarouselRef>(null)

	const handleBeforeChange = useCallback(
		(_current: number, next: number) => {
			onOfferSelect(next % offers.length)
		},
		[offers.length, onOfferSelect]
	)

	if (!offers.length) {
		return null
	}

	return (
		<div className='relative -mb-20'>
			<Carousel
				autoplay
				ref={carouselRef}
				accessibility={false}
				autoplaySpeed={10000}
				dots={false}
				draggable
				beforeChange={handleBeforeChange}
			>
				{offers.map((offer, index) => (
					<div
						key={offer.id}
						aria-hidden={index !== activeIndex}
						inert={index !== activeIndex}
					>
						{renderSlide(offer)}
					</div>
				))}
			</Carousel>

			<AppButton
				aria-label='Предыдущее предложение'
				appVariant='icon'
				className='group h-10! w-10! min-w-10! rounded-none! p-0! absolute bottom-17 left-17'
				onClick={() => carouselRef.current?.prev()}
			>
				<IoChevronBack className='text-xl text-line transition-colors duration-200 ease group-hover:text-accent' />
			</AppButton>

			<AppButton
				aria-label='Следующее предложение'
				appVariant='icon'
				className='group h-10! w-10! min-w-10! rounded-none! p-0! absolute bottom-17 right-17'
				onClick={() => carouselRef.current?.next()}
			>
				<IoChevronBack className='rotate-180 text-xl text-line transition-colors duration-200 ease group-hover:text-accent' />
			</AppButton>
		</div>
	)
}

export default OffersCarousel
