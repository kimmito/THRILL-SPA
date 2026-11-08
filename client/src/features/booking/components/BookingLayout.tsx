import { Breadcrumb, Drawer } from 'antd'

import { useBooking } from '../context/useBooking'
import type { BookingStep } from '../types/booking.types'

import { BookingDatePicker } from './BookingDatePicker'
import { CategoryPicker } from './CategoryPicker'
import { ConfirmBooking } from './ConfirmBooking'
import { ContactForm } from './ContactForm'
import { StaffPicker } from './StaffPicker'

const STEPS: { key: BookingStep; title: string }[] = [
	{ key: 'service', title: 'Услуга' },
	{ key: 'staff', title: 'Мастер' },
	{ key: 'date', title: 'Дата и время' },
	{ key: 'contact', title: 'Контакты' },
	{ key: 'confirm', title: 'Подтверждение' }
]

export const BookingLayout = () => {
	const { open, closeBooking, step, goToStep } = useBooking()
	const currentIndex = STEPS.findIndex(s => s.key === step)
	const visibleSteps = STEPS.slice(0, currentIndex + 1)
	const breadcrumbItems = visibleSteps.map(s => {
		const isCurrent = s.key === step
		return {
			title: s.title,
			onClick: isCurrent ? undefined : () => goToStep(s.key),
			className: `uppercase ${isCurrent && 'font-semibold'}`
		}
	})

	return (
		<Drawer
			zIndex={10000}
			open={open}
			onClose={closeBooking}
			placement='right'
			title='Онлайн-запись'
			size={800}
		>
			<div className='p-10'>
				<Breadcrumb
					items={breadcrumbItems}
					classNames={{
						item: 'text-xl text-base cursor-pointer  hover:bg-gray-200 px-2 rounded-sm mx-1 mb-1 -mt-0.5'
					}}
				/>

				{step === 'service' && <CategoryPicker />}

				{step === 'staff' && <StaffPicker />}

				{step === 'date' && <BookingDatePicker />}
				{step === 'contact' && <ContactForm />}
				{step === 'confirm' && <ConfirmBooking />}
			</div>
		</Drawer>
	)
}
