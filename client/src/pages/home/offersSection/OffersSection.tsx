import { useState } from 'react'

import { Loader } from '@/components/ui/Loader'

import thrillFrame from '@/assets/svg/thrill.svg'

import OffersCarousel from './OffersCarousel'
import './OffersSection.css'
import { useOffers } from './useOffers'

const OffersSection = () => {
	const { offers, isLoading } = useOffers()
	const [activeIndex, setActiveIndex] = useState(0)
	const activeOffer = offers[activeIndex] ?? offers[0]

	return (
		<section className='relative mt-50 mb-22 px-4 overflow-visible' id='offers'>
			<div className='relative mx-auto min-h-180 max-w-420 py-[8%] px-[15%] lg:min-h-230'>
				<h2 className='absolute inline-block text-head text-8xl font-bold  max-w-140 z-1 -top-20 left-23'>
					<p
						key={activeOffer?.id}
						className='offers-title-animated inline-block'
					>
						{activeOffer?.title}
					</p>
				</h2>
				<img
					src={thrillFrame}
					alt=''
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 h-full w-full select-none object-fill opacity-100 mix-blend-multiply'
				/>

				<div className='relative z-10 mx-20 sm:min-h-130 lg:min-h-145'>
					{isLoading ? (
						<div className='flex sm:min-h-130 lg:min-h-145 w-full items-center justify-center'>
							<Loader />
						</div>
					) : (
						<OffersCarousel
							offers={offers}
							activeIndex={activeIndex}
							onOfferSelect={setActiveIndex}
						/>
					)}
				</div>
			</div>
		</section>
	)
}

export default OffersSection
