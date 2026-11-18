import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { AppointmentsService } from '../services/appointments.service'
import type { CreateAppointmentProps } from '../types/booking.types'

export const useCreateAppointment = () => {
	const queryClient = useQueryClient()
	const { mutate: createAppointment, isPending: isCreating } = useMutation({
		mutationKey: ['appointment', 'create'],
		mutationFn: (data: CreateAppointmentProps) =>
			AppointmentsService.createAppointment(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['appointments', 'my'] })
		}
	})

	return { createAppointment, isCreating }
}

export const useGetMyAppointments = () => {
	const {
		data: appointments,
		isLoading,
		isError
	} = useQuery({
		queryKey: ['appointments', 'my'],
		queryFn: () => AppointmentsService.getMyAppointments()
	})
	return { appointments, isLoading, isError }
}
export const useCancelMyAppointment = () => {
	const queryClient = useQueryClient()
	const { mutate: cancelAppointment, isPending: isCancelling } = useMutation({
		mutationKey: ['appointment', 'cancel'],
		mutationFn: (appointmentId: number) =>
			AppointmentsService.cancelMyAppointment(appointmentId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['appointments', 'my'] })
		}
	})

	return { cancelAppointment, isCancelling }
}
