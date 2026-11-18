import { useCancelMyAppointment } from '@/features/booking/hooks/useAppointmentsService'
import {
	type Appointment,
	AppointmentStatus
} from '@/features/booking/types/booking.types'

interface AppointmentRowProps {
	appointment: Appointment
}

interface FormattedDateTime {
	date: string
	time: string
}

const statusLabels: Record<AppointmentStatus, string> = {
	PENDING: 'Ждёт подтверждения',
	CONFIRMED: 'Подтверждена',
	CANCELLED: 'Запись отменена',
	COMPLETED: 'Завершена',
	NO_SHOW: ''
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

export const AppointmentRow = ({ appointment }: AppointmentRowProps) => {
	const { cancelAppointment, isCancelling } = useCancelMyAppointment()
	const canCancel =
		appointment.status === AppointmentStatus.PENDING ||
		appointment.status === AppointmentStatus.CONFIRMED
	const { date: startDate, time: startTime } = splitDateTime(
		appointment.startAt
	)
	const { time: endTime } = splitDateTime(appointment.endAt)

	return (
		<div className='my-2 border border-button/80 p-3'>
			<div className='flex justify-between'>
				<div>
					<h3
						className={`${appointment.status === 'CANCELLED' ? 'text-red-500' : appointment.status === 'COMPLETED' ? 'text-green-600' : appointment.status === 'PENDING' ? 'text-yellow-500' : appointment.status === 'CONFIRMED' ? 'text-blue-600' : ''}`}
					>
						{statusLabels[appointment.status]}
					</h3>
					<h3 className='text-2xl '>{appointment.serviceNameSnapshot}</h3>
					<p>Мастер: {appointment.staffNameSnapshot}</p>
				</div>
				<div>
					<p className='text-end'>
						<p className='text-[20px]'>{startDate}</p>
						<p className='text-[14px]'>
							{startTime} - {endTime}
						</p>
					</p>
				</div>
			</div>

			{canCancel && (
				<button
					disabled={isCancelling}
					type='button'
					className='bg-red-500/70  text-md px-2 py-1 mt-2 w-full cursor-pointer uppercase hover:bg-red-500 hover:shadow-xl'
					onClick={() => cancelAppointment(appointment.id)}
				>
					Отменить
				</button>
			)}
		</div>
	)
}
