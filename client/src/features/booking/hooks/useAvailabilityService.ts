import { useQuery } from '@tanstack/react-query'

import { AvailabilityService } from '../services/availability.service'

export const useAvailableDates = (serviceId: number, staffId?: number) => {
	const { data: availableDates, isLoading } = useQuery({
		queryKey: ['dates', serviceId, staffId],
		queryFn: () => AvailabilityService.getAvailableDates(serviceId, staffId)
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

			return AvailabilityService.getAvailableSlots(serviceId, date, staffId)
		},
		enabled: date !== null
	})

	return { availableSlots: availableSlots?.slots ?? [], isLoading }
}
