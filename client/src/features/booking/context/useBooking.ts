import { useContext } from 'react'

import { BookingContext } from './BookingContext'

export const useBooking = () => {
	const context = useContext(BookingContext)

	if (!context) {
		throw new Error('useBooking должен быть использован внутри BookingProvider')
	}
	return context
}
