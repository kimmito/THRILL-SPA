import { createContext } from 'react'

import type { BookingDraft, BookingStep } from '../types/booking.types'

export type BookingContextValue = {
	open: boolean
	step: BookingStep
	draft: BookingDraft

	openBooking: () => void
	closeBooking: () => void
	resetBooking: () => void

	selectService: (serviceId: number) => void
	selectStaff: (staffId: number | null) => void
	selectDate: (date: string) => void
	selectSlot: (startAt: string) => void
	setComment: (comment: string) => void
	setEmail: (email: string) => void
	setName: (name: string) => void
	setPhone: (phone: string) => void

	goBack: () => void
	nextStep: () => void
	goToStep: (step: BookingStep) => void
}

export const BookingContext = createContext<BookingContextValue | null>(null)
