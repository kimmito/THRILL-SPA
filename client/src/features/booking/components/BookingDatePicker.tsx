import { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaChevronRight } from 'react-icons/fa'

// import useOverflowScroll from 'use-overflow-scroll'

import { Loader } from '@/components/ui/Loader'

import { useBooking } from '../context/useBooking'
import {
	useAvailableDates,
	useAvailableSlots
} from '../hooks/useAvailabilityService'
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

const scrollbarClasses =
	'[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 [scrollbar-width:thin] [scrollbar-color:theme(colors.neutral.300)_theme(colors.neutral.100)]'

export const BookingDatePicker = () => {
	const { draft, goBack, selectDate, nextStep, selectSlot, selectStaff } =
		useBooking()
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
	// const { ref: datesRef } = useOverflowScroll({ axis: 'x' })
	// const { ref: slotsRef } = useOverflowScroll({ axis: 'both' })

	return (
		<div className='mt-10'>
			<h1 className='text-base text-3xl mb-5 uppercase'>
				Выберите дату и время услуги
			</h1>
			{isLoadingDates ? (
				<Loader />
			) : (
				<div
					// ref={datesRef}
					className={`flex flex-row gap-2 overflow-x-auto py-2 mb-4 pb-3 ${scrollbarClasses}`}
				>
					{!availableDates || availableDates.length === 0 ? (
						<p className='text-xl text-base'>
							Нет доступных дат. Попробуйте выбрать другую услугу или мастера
						</p>
					) : (
						availableDates.map(date => (
							<button
								key={date.date}
								type='button'
								disabled={!date.available}
								onClick={() => handleDateSelect(date.date)}
								className={`px-6 py-2 text-xl cursor-pointer bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed border text-base shrink-0 transition-colors duration-200 hover:bg-gray-200 ${date.date === draft.date ? 'border-accent bg-base/15!' : ''}`}
							>
								{formatDateLabel(date.date)}
							</button>
						))
					)}
				</div>
			)}
			{draft.date && (
				<div
					// ref={slotsRef}
					className={`mt-5 grid grid-cols-4 gap-2 overflow-x-auto max-h-[400px] pr-2 ${scrollbarClasses}`}
				>
					{isLoadingSlots ? (
						<Loader />
					) : (
						availableSlots.map(slot => (
							<button
								key={slot.startAt}
								type='button'
								onClick={() => handleSlotSelect(slot)}
								className={`px-3 py-2 text-xl cursor-pointer bg-gray-100 hover:bg-gray-200 text-base transition-colors duration-200 ${
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
					<h3 className='text-3xl mt-10 uppercase text-base my-5'>
						Выберите мастера:
					</h3>
				)}
				{isAnyStaffMode &&
					selectedSlot?.availableStaff.map(currentStaff => (
						<button
							key={currentStaff.id}
							type='button'
							onClick={() => selectStaff(currentStaff.id)}
							className={`group hover:bg-gray-100 border w-full border-base p-5 flex justify-between items-center transition-colors duration-200 ${
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
									<FaChevronRight className='w-20 h-8 text-base/30 group-hover:text-base transition-colors duration-200' />
								</div>
							</div>
						</button>
					))}
			</div>

			<div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between relative'>
				<button
					type='button'
					onClick={() => goBack()}
					className='inline-flex items-center justify-center gap-2 rounded-lg border border-base px-5 py-3 hover:bg-base/5 text-base text-[18px] transition-colors duration-200'
				>
					<FaArrowLeft className='mr-5' />
					Назад
				</button>
				<button
					type='button'
					disabled={!canContinue}
					onClick={() => nextStep()}
					className={`inline-flex flex-1 text-xl items-center justify-center gap-2 rounded-lg border border-base text-base px-5 py-3 hover:bg-base/5 relative transition-colors duration-200 ${!canContinue && 'opacity-30 cursor-not-allowed'}`}
				>
					Продолжить <FaArrowRight className='text-md ml-15' />
				</button>
			</div>
		</div>
	)
}
