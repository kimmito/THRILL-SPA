import { useState } from 'react'
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa'

import { useBooking } from '../context/useBooking'

import { useStaffByService } from '@/pages/home/staffSection/useStaff'

export const StaffPicker = () => {
	const { draft, goToStep, selectStaff, nextStep, goBack } = useBooking()
	const [isAnyStaffSelected, setIsAnyStaffSelected] = useState(false)
	const selectedService = draft.serviceId

	const { staff } = useStaffByService(selectedService)

	if (!selectedService) {
		return (
			<div>
				<p>Сначала необходимо выбрать услугу.</p>
				<button
					className='cursor-pointer bg-gray-400 p-5'
					type='button'
					onClick={() => goToStep('service')}
				>
					Вернуться к выбору услуги
				</button>
			</div>
		)
	}

	return (
		<div className='mt-10'>
			<h1 className='text-base uppercase text-3xl mb-5'>Выберите мастера</h1>
			<button
				type='button'
				onClick={() => {
					selectStaff(null)
					setIsAnyStaffSelected(true)
					nextStep()
				}}
				className={`border group w-full hover:bg-gray-100 mb-5 border-base p-5 flex justify-between items-center ${
					isAnyStaffSelected ? 'border-accent bg-base/15!' : ''
				}`}
			>
				<div className='ml-10 text-black text-start'>
					<h2 className='text-2xl'>Мастер не важен</h2>
					<p>Перейти к выбору времени</p>
				</div>
				<div>
					<FaChevronRight className='w-20 h-8 text-base/30 group-hover:text-base' />
				</div>
			</button>

			{staff.map(currentStaff => (
				<button
					key={currentStaff.id}
					type='button'
					onClick={() => {
						selectStaff(currentStaff.id)
						setIsAnyStaffSelected(false)
						nextStep()
					}}
					className={`group hover:bg-gray-100 border w-full border-base p-5 flex justify-between items-center ${
						draft.staffId === currentStaff.id ? 'border-accent bg-base/15!' : ''
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
			<button
				type='button'
				onClick={() => goBack()}
				className='inline-flex mt-5 items-center justify-center gap-2 rounded-lg border border-base px-5 py-3 hover:bg-base/5 text-base text-[18px]'
			>
				<FaArrowLeft className='mr-5' />
				Назад
			</button>
		</div>
	)
}
