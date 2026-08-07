import type { Staff } from '@/types/staff.type'

import { request } from '@/api/request.api'
import { getStaffUrl } from '@/config/api.config'

export const StaffService = {
	async getAll() {
		return request<Staff[]>({
			url: getStaffUrl(''),
			method: 'GET'
		})
	}
}
