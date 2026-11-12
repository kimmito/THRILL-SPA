import { Loader } from '@/components/ui/Loader'
import { AppButton } from '@/components/ui/appButton/AppButton'

import { useBooking } from '@/features/booking/context/useBooking'
import { useGetMyAppointments } from '@/features/booking/hooks/useAppointmentsService'
import type { Appointment } from '@/features/booking/types/booking.types'

interface AppointmentRowProps {
	appointment: Appointment
}

interface FormattedDateTime {
	date: string
	time: string
}

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
	day: '2-digit',
	month: '2-digit',
	year: '2-digit'
})

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
	hour: '2-digit',
	minute: '2-digit'
})

const splitDateTime = (input: string): FormattedDateTime => {
	const date = new Date(input)

	if (isNaN(date.getTime())) {
		return { date: '-', time: '-' }
	}

	return {
		date: dateFormatter.format(date),
		time: timeFormatter.format(date)
	}
}

const AppointmentRow = ({ appointment }: AppointmentRowProps) => {
	const { date: startDate, time: startTime } = splitDateTime(
		appointment.startAt
	)
	const { time: endTime } = splitDateTime(appointment.endAt)

	return (
		<div>
			<span>{appointment.serviceNameSnapshot}</span>
			<span>{appointment.staffNameSnapshot}</span>
			<span>
				{startDate} {startTime} - {endTime}
			</span>
		</div>
	)
}

export const UserAppointments = () => {
	const { appointments, isLoading, isError } = useGetMyAppointments()
	const { openBooking } = useBooking()

	return (
		<div>
			<h2 className='border-b border-base text-2xl uppercase'>Ваши записи</h2>
			<div>
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
