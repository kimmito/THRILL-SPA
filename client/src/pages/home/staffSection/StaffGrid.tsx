import { StaffCard } from './StaffCard'
import type { Staff } from '@/types/staff.type'

type StaffGridProps = {
	staff: Staff[]
}

export const StaffGrid = ({ staff }: StaffGridProps) => {
	return (
		<div className='flex flex-wrap justify-center gap-8'>
			{staff.map(member => (
				<StaffCard
					key={member.id}
					member={member}
					className='w-full max-w-117.5 sm:w-[calc(50%-16px)] lg:w-[calc((100%-64px)/3)]'
				/>
			))}
		</div>
	)
}
