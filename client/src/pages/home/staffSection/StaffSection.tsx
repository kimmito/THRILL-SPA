
import { Loader } from '@/components/ui/Loader'

import { StaffGrid } from './StaffGrid'
import { useStaff } from './useStaff'
import { StaffSlider } from './StaffSlider'

const StaffSection = () => {
	const { staff, isLoading } = useStaff()

	return (
		<section id='staff' className='mb-10'>
			<h2 className='block text-head mb-10 max-w-370 mx-auto text-right text-[96px] font-bold uppercase'>
				Наши мастера
			</h2>
			{isLoading ? (
				<Loader />
			) : staff.length > 3 ? (
				<StaffSlider staff={staff} />
			) : (
				<StaffGrid staff={staff} />
			)}
		</section>
	)
}

export default StaffSection
