import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa'

import { useBooking } from '../context/useBooking'

import { AppButton } from '@/components/ui/appButton/AppButton'
import { useStaffByService } from '@/pages/home/staffSection/useStaff'
import { useServices } from '@/pages/home/servicesSection/hooks/useService'

const formatDate = (value: string) =>
	new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date(`${value}T00:00:00`))

const formatTime = (value: string) =>
	new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(value))

export const ConfirmBooking = () => {
	const { draft, goToStep } = useBooking()
	const { services, isLoading: isLoadingServices } = useServices()
	const { staff, isLoading: isLoadingStaff } = useStaffByService(draft.serviceId)

	const service = services.find(item => item.id === draft.serviceId)
	const selectedStaff = staff.find(item => item.id === draft.staffId)
	const endAt =
		draft.startAt && service
			? new Date(
					new Date(draft.startAt).getTime() + service.durationMinutes * 60_000
				).toISOString()
			: null

	if (!draft.serviceId || !draft.date || !draft.startAt) {
		return (
			<div className='mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-base'>
				<h1 className='mb-2 text-2xl font-semibold'>Запись заполнена не полностью</h1>
				<p className='mb-5'>Вернитесь назад и выберите услугу, дату и время.</p>
				<AppButton appVariant='primary' onClick={() => goToStep('date')}>
					Вернуться к выбору времени
				</AppButton>
			</div>
		)
	}

	if (isLoadingServices || isLoadingStaff || !service || !endAt) {
		return (
			<div className='mt-10 text-base'>
				<p>Загружаем данные записи...</p>
			</div>
		)
	}

	return (
		<div className='mx-auto mt-10 max-w-2xl text-base'>
			<div className='mb-8'>
				<p className='mb-2 text-sm uppercase tracking-[0.2em] text-base/60'>
					Почти готово
				</p>
				<h1 className='text-3xl font-semibold uppercase'>Проверьте запись</h1>
				<p className='mt-2 text-base/70'>Убедитесь, что всё указано верно.</p>
			</div>

			<div className='overflow-hidden rounded-2xl border border-base/15 bg-white shadow-sm'>
				<div className='border-b border-base/10 bg-base px-6 py-5 text-white'>
					<p className='text-sm uppercase tracking-wider text-white/70'>Услуга</p>
					<h2 className='mt-1 text-2xl font-semibold'>{service.name}</h2>
					<p className='mt-1 text-white/80'>
						{service.durationMinutes} мин. · {service.price} ₽
					</p>
				</div>

				<div className='grid gap-5 p-6 sm:grid-cols-2'>
					<div className='flex items-start gap-3'>
						<FaCalendarAlt className='mt-1 text-base/60' />
						<div>
							<p className='text-sm text-base/60'>Дата</p>
							<p className='font-medium'>{formatDate(draft.date)}</p>
						</div>
					</div>
					<div className='flex items-start gap-3'>
						<FaClock className='mt-1 text-base/60' />
						<div>
							<p className='text-sm text-base/60'>Время</p>
							<p className='font-medium'>
								{formatTime(draft.startAt)}–{formatTime(endAt)}
							</p>
						</div>
					</div>
					<div className='flex items-start gap-3 sm:col-span-2'>
						<FaUser className='mt-1 text-base/60' />
						<div>
							<p className='text-sm text-base/60'>Мастер</p>
							<p className='font-medium'>
								{selectedStaff?.name ?? 'Мастер будет выбран автоматически'}
							</p>
							{selectedStaff?.role && (
								<p className='text-sm text-base/60'>{selectedStaff.role}</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between relative'>
				<button
					type='button'
					onClick={() => goToStep('date')}
					className='inline-flex items-center justify-center gap-2 rounded-lg border border-base/20 px-5 py-3 hover:bg-base/5 text-[18px]'
				>
					<FaArrowLeft />
					Изменить дату или время
				</button>
				<button type='button' disabled className='inline-flex flex-1 text-xl items-center justify-center gap-2 rounded-lg border border-base/20 px-5 py-3 hover:bg-base/5 relative'>Подтвердить запись <FaArrowRight className='text-md ml-15'/></button>
			</div>
		</div>
	)
}
