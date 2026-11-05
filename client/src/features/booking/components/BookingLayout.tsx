import { Breadcrumb, Drawer } from 'antd'

import { useBooking } from '../context/useBooking'

import { CategoryPicker } from './CategoryPicker'

export const BookingLayout = () => {
	const { open, closeBooking, step, goToStep } = useBooking()

	const breadcrumbItems = [
		{
			title: 'Услуга',
			onClick: () => goToStep('service')
		},
		...(step !== 'service' ? [{ title: 'Мастер' }] : [])
	]

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
						item: 'text-xl text-base cursor-pointer bg-gray-100 hover:bg-gray-200 px-2 rounded-sm mx-1'
					}}
				/>

				{step === 'service' && <CategoryPicker />}

				{step === 'staff' && (
					<div>
						<h1>Выбор мастера</h1>
					</div>
				)}

				{step === 'date' && (
					<div>
						<h1>Выбор даты и времени</h1>
					</div>
				)}
			</div>
		</Drawer>
	)
}
