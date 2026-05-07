import { AppButton } from '@/components/ui/AppButton'

import type { GiftCertificateOffer } from '@/data/offers'
import GiftCertificateValueCard from './GiftCertificateValueCard'

type GiftCertificateSlideProps = {
	offer: GiftCertificateOffer
}

const GiftCertificateSlide = ({ offer }: GiftCertificateSlideProps) => {
	return (
		<div className='my-10'>
			<div className='flex justify-around'>
				{offer.items.map(item => (
					<GiftCertificateValueCard
						key={item.id}
						value={item.value}
					/>
				))}
			</div>
			<div className='relative -top-3'>
				<div className='mx-auto max-w-150 text-center'>
					{offer.description1 && (
						<p className='mt-20 text-lg'>{offer.description1}</p>
					)}
					{offer.description2 && (
						<p className='mt-4 text-lg'>{offer.description2}</p>
					)}
				</div>

				<div className='mx-auto mt-15 w-max'>
					<AppButton
						appVariant='primary'
						aria-label='Купить подарочный сертификат'
						className='h-14 w-108 text-[32px] hover:border-accent! hover:text-accent!'
					>
						Приобрести
					</AppButton>
				</div>

				<div className='mx-auto mt-10 flex max-w-100 flex-col gap-2'>
					<AppButton
						appVariant='link'
						className='text-xl'
						aria-label='Войти в аккаунт'
					>
						Войти в аккаунт
					</AppButton>
					<AppButton
						appVariant='link'
						className='text-xl'
						aria-label='Зарегистрироваться'
					>
						Зарегистрироваться
					</AppButton>
				</div>
			</div>
		</div>
	)
}

export default GiftCertificateSlide
