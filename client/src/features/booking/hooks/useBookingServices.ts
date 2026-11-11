import { useMutation, useQuery } from '@tanstack/react-query'

import { BookingService } from '../services/booking.service'

import type { CreateAppointmentProps } from './../types/booking.types'

export const useAvailableDates = (serviceId: number, staffId?: number) => {
	const { data: availableDates, isLoading } = useQuery({
		queryKey: ['dates', serviceId, staffId],
		queryFn: () => BookingService.getAvailableDates(serviceId, staffId)
	})

	return { availableDates: availableDates?.dates ?? [], isLoading }
}

export const useAvailableSlots = (
	serviceId: number,
	date: string | null,
	staffId?: number
) => {
	const { data: availableSlots, isLoading } = useQuery({
		queryKey: ['slots', serviceId, date, staffId],
		queryFn: () => {
			if (!date) {
				throw new Error('Дата для получения слотов не выбрана')
			}

			return BookingService.getAvailableSlots(serviceId, date, staffId)
		},
		enabled: date !== null
	})

	return { availableSlots: availableSlots?.slots ?? [], isLoading }
}

export const useCreateAppointment = () => {
	const { mutate: createAppointment, isPending: isCreating } = useMutation({
		mutationKey: ['appointment', 'create'],
		mutationFn: (data: CreateAppointmentProps) =>
			BookingService.createAppointment(data)
	})

	return { createAppointment, isCreating }
}
