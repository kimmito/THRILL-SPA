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
	name: string
	phone: string
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

export type Appointment = {
	id: number
	name: string
	phone: string
	userId: number
	guestEmail: string
	guestCancellationTokenHash: string
	staffId: number
	serviceId: number
	startAt: string
	endAt: string
	comment: string
	serviceNameSnapshot: string
	staffNameSnapshot: string
	priceSnapshot: number
	durationMinutesSnapshot: number
}

export type CreatedAppointment = {
	appointment: Appointment
	cancellationToken?: string
}

export type CreateAppointmentProps = {
	name: string
	phone: string
	serviceId: number
	staffId: number
	startAt: string
	comment?: string
	guestEmail?: string
}
