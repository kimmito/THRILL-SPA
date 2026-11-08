import type { Staff } from '@/types/staff.type'

import { getStaffUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const StaffService = {
	async getAll() {
		return request<Staff[]>({
			url: getStaffUrl(''),
			method: 'GET'
		})
	},
	async getStaffByService(serviceId: number) {
		return request<Staff[]>({
			url: getStaffUrl(`/by-service/${serviceId}`),
			method: 'GET'
		})
	}
}
