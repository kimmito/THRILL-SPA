import { useQuery } from '@tanstack/react-query'

import { StaffService } from '@/services/staff.service'

export const useStaff = () => {
	const { data: staff, isLoading } = useQuery({
		queryKey: ['staff'],
		queryFn: () => StaffService.getAll()
	})
	return { staff: staff ?? [], isLoading }
}
	