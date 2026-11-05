export type BookingDraft = {
	serviceId: number | null
	staffId: number | null
	date: string | null
	startAt: string | null
	guestEmail: string
	comment: string
}

export type BookingStep = 'service' | 'staff' | 'date' | 'contact' | 'confirm'
