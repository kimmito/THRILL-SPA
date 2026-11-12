import { getAppointmentUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import type { Appointment, CreatedAppointment } from '../types/booking.types'
import type { CreateAppointmentProps } from '../types/booking.types'

export const AppointmentsService = {
	async createAppointment(data: CreateAppointmentProps) {
		return request<CreatedAppointment>({
			url: getAppointmentUrl(''),
			method: 'POST',
			data: data
		})
	},

	async getMyAppointments() {
		return request<Appointment[]>({
			url: getAppointmentUrl('/my'),
			method: 'GET'
		})
	}
}
