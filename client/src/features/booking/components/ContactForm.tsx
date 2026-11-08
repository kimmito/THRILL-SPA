import { AppButton } from '@/components/ui/appButton/AppButton'

import { useProfile } from '@/hooks/useProfile'

import { useBooking } from '../context/useBooking'

export const ContactForm = () => {
	const { user } = useProfile()
	const { goToStep } = useBooking()
	return (
		<div>
			<h1 className='text-3xl text-base mt-10 mb-5'>
				Укажите ваши контактные данные
			</h1>
			<label htmlFor='name' className='text-xl text-base block'>
				Имя
			</label>
			<input
				type='text'
				id='name'
				value={user?.displayName}
				className='border-base border p-2 text-base'
			/>
			<label htmlFor='email' className='text-xl text-base block'>
				Почта
			</label>
			<input
				type='text'
				id='email'
				value={user?.email}
				className='border-base border p-2 text-base'
			/>
			<label htmlFor='comment' className='text-xl text-base block'>
				Комментарий
			</label>
			<textarea
				cols={50}
				id='comment'
				className='border-base border p-2 text-base'
			/>
			<AppButton appVariant='primary' onClick={() => goToStep('confirm')}>
				Перейти к подтверждению записи
			</AppButton>
		</div>
	)
}
