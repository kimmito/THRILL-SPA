import type { Staff } from '@/types/staff.type'

export type AvailableDate = {
	date: string
	available: boolean
}

export type AvailableStaff = Pick<Staff, 'id' | 'name' | 'photoPath' | 'role'>

export type AvailableSlot = {
	startAt: string
	endAt: string
	availableStaff: AvailableStaff[]
}

export type BookingDraft = {
	serviceId: number | null
	staffId: number | null
	date: string | null
	startAt: string | null
	guestEmail: string
	comment: string
}

export type BookingStep = 'service' | 'staff' | 'date' | 'contact' | 'confirm'

export type AvailableDates = {
	staffIds: number[]
	dates: AvailableDate[]
}

export type AvailableSlots = {
	mode: 'specific_staff' | 'any_staff'
	date: string
	slots: AvailableSlot[]
}
