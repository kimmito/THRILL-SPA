import { useState } from 'react'

import thrillFrame from '@/assets/svg/thrill.svg'
import OffersCarousel from './OffersCarousel'
import { tempOffers as offers } from '@/data/offers'

const OffersSection = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const activeOffer = offers[activeIndex] ?? offers[0]

	return (
		<section className='relative mt-62 mb-32 px-4 overflow-visible' id='offers'>
			<div className='relative mx-auto min-h-180 max-w-420 p-[12%] lg:min-h-230'>
				<h2 className='inline-block text-head text-8xl font-bold relative -mt-120 -top-13 max-w-140 z-1'>
					<span key={activeOffer?.id} className='offers-title-animated inline-block'>
						{activeOffer?.title}
					</span>
				</h2>
				<img
					src={thrillFrame}
					alt=''
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 h-full w-full select-none object-fill opacity-100 mix-blend-multiply'
				/>

				<div className='relative z-10 min-h-180 mx-20 sm:min-h-130 lg:min-h-145'>
					<OffersCarousel
						offers={offers}
						activeIndex={activeIndex}
						onOfferSelect={setActiveIndex}
					/>
				</div>
			</div>
		</section>
	)
}

export default OffersSection
