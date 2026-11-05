import { useBooking } from '../context/useBooking'

import { useServicesByCategoryId } from '@/pages/home/servicesSection/hooks/useService'

type ServicePickerProps = {
	categoryId: number
}
export const ServicePicker = ({ categoryId }: ServicePickerProps) => {
	const { selectService } = useBooking()
	const { services } = useServicesByCategoryId(categoryId)
	return (
		<div className='flex flex-col ml-4 items-start'>
			{services.map(service => (
				<button
					key={service.id}
					type='button'
					onClick={() => {
						selectService(service.id)
					}}
					className='my-2 w-full border-base hover:bg-gray-400 cursor-pointer border p-3 bg-gray-200 text-base'
				>
					<div className='flex flex-row'>
						<div className='flex-2'>{service.name}</div>
						<div className='flex-1 text-center'>{service.price} р</div>
						<div>{service.durationMinutes} мин.</div>
					</div>
				</button>
			))}
		</div>
	)
}
