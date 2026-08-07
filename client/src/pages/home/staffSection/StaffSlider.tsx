import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'

import type { Staff } from '@/types/staff.type'

import { StaffSlide } from './StaffSlide'

export const StaffSlider = ({ staff }: { staff: Staff[] }) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const isSliderEnabled = staff.length > 3

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		loop: isSliderEnabled,
		drag: isSliderEnabled,
		slides: {
			perView: isSliderEnabled ? 3.5 : staff.length,
			origin: 'center',
			spacing: 48
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel)
		}
	})
	return (
		<StaffSlide
			sliderRef={sliderRef}
			instanceRef={instanceRef}
			currentSlide={currentSlide}
			staff={staff}
		/>
	)
}
