import type { KeenSliderInstance } from 'keen-slider/react'
import type { RefObject } from 'react'
import { IoChevronBack } from 'react-icons/io5'

import { AppButton } from '@/components/ui/appButton/AppButton'

import type { Staff } from '@/types/staff.type'

import { StaffCard } from './StaffCard'

type StaffSlideProps = {
	currentSlide: number
	sliderRef: (node: HTMLDivElement | null) => void
	instanceRef: RefObject<KeenSliderInstance | null>
	staff: Staff[]
}

export const StaffSlide = ({
	currentSlide,
	sliderRef,
	instanceRef,
	staff
}: StaffSlideProps) => {
	
	const shouldDuplicateStaff = staff.length > 3 && staff.length < 6
	const sliderStaff = shouldDuplicateStaff ? [...staff, ...staff] : staff
	const activePerson = staff[currentSlide % staff.length]

	return (
		<>
			<div ref={sliderRef} className='keen-slider'>
				{sliderStaff.map((member, index) => {
					const originalIndex = index % staff.length

					return (
						<div
							key={`${member.id}-${index}`}
							className='keen-slider__slide w-[clamp(280px,24.5vw,470px)] min-w-[clamp(280px,24.5vw,470px)]'
						>
							<StaffCard
								member={member}
								isActive={currentSlide % staff.length === originalIndex}
								showCaption={false}
							/>
						</div>
					)
				})}
			</div>
			<div className='keep-slider-controls relative mt-10 flex items-center justify-center gap-16'>
				<AppButton
					aria-label='Предыдущий мастер'
					appVariant='icon'
					className='absolute bottom-1 left-1/8 h-10! w-10! min-w-10! rounded-none! p-0! lg:bottom-4 lg:left-2/7 2xl:left-3/8'
					onClick={() => instanceRef.current?.prev()}
				>
					<IoChevronBack className='text-line text-xl transition-colors' />
				</AppButton>
				<div className='text-center'>
					<div className='text-head text-[20px] lg:text-[32px]'>
						{activePerson.name}
					</div>
					<div className='text-head text-[14px] lg:text-[20px]'>
						{activePerson.role}
					</div>
				</div>
				<AppButton
					aria-label='Следующий мастер'
					appVariant='icon'
					className='group absolute right-1/8 bottom-1 h-10! w-10! min-w-10! rounded-none! p-0! lg:right-2/7 lg:bottom-4 2xl:right-3/8'
					onClick={() => instanceRef.current?.next()}
				>
					<IoChevronBack className='text-line rotate-180 text-xl ' />
				</AppButton>
			</div>
		</>
	)
}
