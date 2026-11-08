import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'

import { Loader } from '@/components/ui/Loader'
import { AppButton } from '@/components/ui/appButton/AppButton'

import { useBooking } from '../context/useBooking'
import {
	useAvailableDates,
	useAvailableSlots
} from '../hooks/useBookingServices'
import type { AvailableSlot } from '../types/booking.types'

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const formatDateLabel = (dateStr: string): string => {
	const [y, m, d] = dateStr.split('-').map(Number)
	const date = new Date(y, m - 1, d)

	const today = new Date()
	const tomorrow = new Date()
	tomorrow.setDate(today.getDate() + 1)

	const stripTime = (dt: Date) =>
		new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime()

	const dateTs = stripTime(date)
	const todayTs = stripTime(today)
	const tomorrowTs = stripTime(tomorrow)

	const weekday = WEEKDAYS_SHORT[date.getDay()]
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const datePart = `${weekday}, ${day}.${month}`

	if (dateTs === todayTs) return `Сегодня, ${datePart}`
	if (dateTs === tomorrowTs) return `Завтра, ${datePart}`

	return datePart
}

export const BookingDatePicker = () => {
	const { draft, goToStep, selectDate, selectSlot, selectStaff } = useBooking()
	const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | undefined>(
		undefined
	)
	const [isAnyStaffMode] = useState(draft.staffId === null)
	const { availableDates, isLoading: isLoadingDates } = useAvailableDates(
		draft.serviceId!,
		draft.staffId ?? undefined
	)
	const { availableSlots, isLoading: isLoadingSlots } = useAvailableSlots(
		draft.serviceId!,
		draft.date,
		draft.staffId ?? undefined
	)

	const handleDateSelect = (date: string) => {
		if (date !== draft.date) {
			setSelectedSlot(undefined)
			selectDate(date)
		}
	}

	const handleSlotSelect = (slot: AvailableSlot) => {
		setSelectedSlot(slot)
		selectSlot(slot.startAt)
	}

	const canContinue = Boolean(
		draft.date && draft.startAt && draft.staffId !== null
	)

	return (
		<div className='mt-10'>
			<h1 className='text-base text-3xl mb-5 uppercase'>
				Выберите дату и время услуги
			</h1>
			{isLoadingDates ? (
				<Loader />
			) : (
				<div className='flex flex-row gap-2 overflow-x-auto py-2 mb-4'>
					{availableDates.map(date => (
						<button
							key={date.date}
							type='button'
							disabled={!date.available}
							onClick={() => handleDateSelect(date.date)}
							className={`px-10 text-xl cursor-pointer bg-gray-100  disabled:opacity-40 disabled:cursor-not-allowed border text-base ${date.date === draft.date ? 'border-accent bg-base/15!' : ''}`}
						>
							{formatDateLabel(date.date)}
						</button>
					))}
				</div>
			)}
			{draft.date && (
				<div className='mt-5 grid grid-cols-4 gap-2 overflow-x-auto'>
					{isLoadingSlots ? (
						<Loader />
					) : (
						availableSlots.map(slot => (
							<button
								key={slot.startAt}
								type='button'
								onClick={() => handleSlotSelect(slot)}
								className={`px-3 py-1 cursor-pointer bg-gray-100 hover:bg-gray-150 text-base ${
									selectedSlot?.startAt === slot.startAt
										? 'border-accent bg-base/15!'
										: ''
								}`}
							>
								{new Date(slot.startAt).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit'
								})}
							</button>
						))
					)}
				</div>
			)}
			<div>
				{isAnyStaffMode && selectedSlot && (
					<h3 className='text-xl text-base my-5'>Выберите мастера:</h3>
				)}
				{isAnyStaffMode &&
					selectedSlot?.availableStaff.map(currentStaff => (
						<button
							key={currentStaff.id}
							type='button'
							onClick={() => selectStaff(currentStaff.id)}
							className={`group hover:bg-gray-100 border w-full border-base p-5 flex justify-between items-center ${
								draft.staffId === currentStaff.id
									? 'border-accent bg-base/15!'
									: ''
							}`}
						>
							<div className='ml-5 h-30 flex flex-row items-center w-full'>
								<img
									src={currentStaff.photoPath}
									alt={currentStaff.name}
									className='h-25'
								/>
								<div className='ml-8 text-black text-start flex-1'>
									<h2 className='text-2xl'>{currentStaff.name}</h2>
									<p>{currentStaff.role}</p>
								</div>
								<div>
									<FaChevronRight className='w-20 h-8 text-base/30 group-hover:text-base' />
								</div>
							</div>
						</button>
					))}
			</div>
			<AppButton
				appVariant='primary'
				disabled={!canContinue}
				onClick={() => goToStep('contact')}
				className='mt-6'
			>
				Продолжить
			</AppButton>
		</div>
	)
}
