import { getAppointmentUrl, getAvailabilityUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import type {
	AvailableDates,
	AvailableSlots,
	CreatedAppointment
} from '../types/booking.types'

import type { CreateAppointmentProps } from './../types/booking.types'

export const BookingService = {
	async getAvailableDates(serviceId: number, staffId?: number) {
		return request<AvailableDates>({
			url: getAvailabilityUrl('/dates'),
			method: 'GET',
			params: {
				serviceId,
				...(staffId != null ? { staffId } : {})
			}
		})
	},

	async getAvailableSlots(serviceId: number, date: string, staffId?: number) {
		return request<AvailableSlots>({
			url: getAvailabilityUrl(''),
			method: 'GET',
			params: {
				serviceId,
				...(staffId != null ? { staffId } : {}),
				date
			}
		})
	},

	async createAppointment(data: CreateAppointmentProps) {
		return request<CreatedAppointment>({
			url: getAppointmentUrl(''),
			method: 'POST',
			data: data
		})
	}
}
