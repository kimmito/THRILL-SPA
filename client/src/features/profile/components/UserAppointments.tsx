import { Loader } from '@/components/ui/Loader'
import { AppButton } from '@/components/ui/appButton/AppButton'

import { AppointmentRow } from './AppointmentRow'
import { useBooking } from '@/features/booking/context/useBooking'
import { useGetMyAppointments } from '@/features/booking/hooks/useAppointmentsService'

export const UserAppointments = () => {
	const { appointments, isLoading, isError } = useGetMyAppointments()
	const { openBooking } = useBooking()

	return (
		<div className='max-h-105 overflow-y-scroll scrollbar-thumb-gray-400'>
			<h2 className='border-b border-base text-2xl uppercase'>Ваши записи</h2>
			<div className='mr-2'>
				{isLoading ? (
					<Loader />
				) : isError ? (
					<p className='text-xl'>Не удалось загрузить записи</p>
				) : !appointments || appointments.length < 1 ? (
					<div>
						<p className='text-xl '>У вас нет записей</p>
						<AppButton
							className='text-[20px]! text-copy!'
							onClick={() => openBooking()}
						>
							Записаться
						</AppButton>
					</div>
				) : (
					appointments.map(appointment => (
						<AppointmentRow
							key={appointment.id}
							appointment={appointment}
						></AppointmentRow>
					))
				)}
			</div>
		</div>
	)
}
