import { type ReactNode, useState } from 'react'

import type { BookingDraft, BookingStep } from '../types/booking.types'

import { BookingContext, type BookingContextValue } from './BookingContext'

const initialDraft: BookingDraft = {
	serviceId: null,
	staffId: null,
	date: null,
	startAt: null,
	guestEmail: '',
	comment: '',
	name: '',
	phone: ''
}
const STEPS: BookingStep[] = ['service', 'staff', 'date', 'contact', 'confirm']
type BookingProviderProps = {
	children: ReactNode
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
	const [open, setOpen] = useState(false)
	const [step, setStep] = useState<BookingStep>('service')
	const [draft, setDraft] = useState<BookingDraft>(initialDraft)

	const openBooking = () => {
		setOpen(true)
	}

	const closeBooking = () => {
		setOpen(false)
	}

	const resetBooking = () => {
		setDraft(initialDraft)
		setStep('service')
	}
	const selectService = (serviceId: number) => {
		setDraft(prev => ({
			...prev,
			serviceId,
			staffId: null,
			date: null,
			startAt: null
		}))
		setStep('staff')
	}

	const selectStaff = (staffId: number | null) => {
		setDraft(prev => ({
			...prev,
			staffId,
			...(step === 'staff' ? { date: null, startAt: null } : {})
		}))
	}
	const selectDate = (date: string) => {
		setDraft(prev => ({ ...prev, date, startAt: null }))
	}
	const selectSlot = (startAt: string) => {
		setDraft(prev => ({ ...prev, startAt: startAt }))
	}

	const setComment = (comment: string) => {
		setDraft(prev => ({ ...prev, comment: comment }))
	}

	const setEmail = (email: string) => {
		setDraft(prev => ({ ...prev, guestEmail: email }))
	}

	const setName = (name: string) => {
		setDraft(prev => ({ ...prev, name }))
	}

	const setPhone = (phone: string) => {
		setDraft(prev => ({ ...prev, phone }))
	}

	const goBack = () => {
		setStep(prev => {
			const idx = STEPS.indexOf(prev)
			const previousIndex = Math.max(idx - 1, 0)

			return STEPS[previousIndex]
		})
	}
	const nextStep = () => {
		setStep(prev => {
			const idx = STEPS.indexOf(prev)
			return STEPS[Math.min(idx + 1, STEPS.length - 1)]
		})
	}

	const goToStep = (nextStep: BookingStep) => {
		setStep(nextStep)
	}

	const value: BookingContextValue = {
		open,
		step,
		draft,
		openBooking,
		closeBooking,
		resetBooking,
		selectService,
		selectStaff,
		selectDate,
		selectSlot,
		setComment,
		setEmail,
		setName,
		setPhone,

		goBack,
		nextStep,
		goToStep
	}

	return (
		<BookingContext.Provider value={value}>{children}</BookingContext.Provider>
	)
}
