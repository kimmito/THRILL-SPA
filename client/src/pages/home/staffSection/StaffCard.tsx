import type { Staff } from '@/types/staff.type'

type StaffCardProps = {
	member: Staff
	isActive?: boolean
	showCaption?: boolean
	className?: string
}

export const StaffCard = ({
	member,
	isActive = true,
	showCaption = true,
	className = ''
}: StaffCardProps) => {
	return (
		<article className={`text-center ${className}`}>
			<img
				src={member.photoPath}
				alt={member.name}
				className={`aspect-6/7 w-full object-cover transition-opacity duration-300 ease ${
					isActive ? 'opacity-100' : 'opacity-50'
				}`}
			/>
			{showCaption ? (
				<div className='mt-5'>
					<h3 className='text-head text-[24px] leading-tight lg:text-[32px]'>
						{member.name}
					</h3>
					<p className='text-copy mt-1 text-[16px] leading-tight lg:text-[20px]'>
						{member.role}
					</p>
				</div>
			) : null}
		</article>
	)
}
