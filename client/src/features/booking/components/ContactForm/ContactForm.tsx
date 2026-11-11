import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { useProfile } from '@/hooks/useProfile'

import { useBooking } from '../../context/useBooking'

import { contactSchema } from './contact-form.schema'
import type { ContactFormValues } from './contact-form.types'

export const ContactForm = () => {
	const { user } = useProfile()
	const { goToStep, goBack, setName, setPhone, setEmail, setComment } =
		useBooking()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: user?.displayName ?? '',
			phone: '',
			email: user?.email ?? '',
			comment: ''
		}
	})
	const onSubmit = (data: ContactFormValues) => {
		setName(data.name)
		setPhone(data.phone)
		setEmail(data.email)
		setComment(data.comment ?? '')
		goToStep('confirm')
	}
	return (
		<div>
			<h1 className='text-3xl text-base mt-10 mb-5'>
				Укажите ваши контактные данные
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-5'>
					<label htmlFor='name' className='text-xl text-base block'>
						Имя
					</label>
					<input
						{...register('name')}
						type='text'
						id='name'
						className='border border-base p-2 text-base/80 w-full'
					/>
					{errors.name && (
						<p className='text-red-500 text-[16px] mt-1'>
							{errors.name.message}
						</p>
					)}
				</div>
				<div className='mb-5'>
					<label htmlFor='phone' className='text-xl text-base block'>
						Номер телефона
					</label>
					<input
						{...register('phone')}
						type='tel'
						id='phone'
						className='border border-base p-2 text-base/80 w-full'
					/>
					{errors.phone && (
						<p className='text-red-500 text-[16px] mt-1'>
							{errors.phone.message}
						</p>
					)}
				</div>
				<div className='mb-5'>
					<label htmlFor='email' className='text-xl text-base block'>
						Почта
					</label>
					<input
						{...register('email')}
						id='email'
						className='border border-base p-2 text-base/80 w-full'
					/>
					{errors.email && (
						<p className='text-red-500 text-[16px] mt-1'>
							{errors.email.message}
						</p>
					)}
				</div>
				<div className='mb-5'>
					<label htmlFor='comment' className='text-xl text-base block'>
						Комментарий
					</label>
					<textarea
						{...register('comment')}
						id='comment'
						className='border border-base p-2 text-base/80 block w-full'
					/>
					{errors.comment && (
						<p className='text-red-500 text-[16px] mt-1'>
							{errors.comment.message}
						</p>
					)}
				</div>

				<div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between relative'>
					<button
						type='button'
						onClick={() => goBack()}
						className='inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-base px-5 py-3 hover:bg-base/5 text-base text-[18px]'
					>
						<FaArrowLeft className='mr-5' />
						Назад
					</button>
					<button
						type='submit'
						className='inline-flex flex-3 text-xl items-center justify-center gap-2 rounded-lg border border-base text-base  px-5 py-3 hover:bg-base/5 relative'
					>
						Продолжить <FaArrowRight className='text-md ml-15' />
					</button>
				</div>
			</form>
		</div>
	)
}
