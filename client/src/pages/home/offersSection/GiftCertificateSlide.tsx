import { AppButton } from '@/components/ui/AppButton'

import GiftCertificateValueCard from './GiftCertificateValueCard'
import type { GiftCertificateOffer } from '@/data/offers'
import { useState } from 'react'

type GiftCertificateSlideProps = {
	offer: GiftCertificateOffer
}

const GiftCertificateSlide = ({ offer }: GiftCertificateSlideProps) => {
	const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
		null
	)
	return (
		<div className='my-10'>
			<div className='flex justify-center gap-20'>
				{offer.items.map(item => (
					<GiftCertificateValueCard key={item.id} value={item.value} onSelect={setSelectedCertificate} selected={selectedCertificate === item.value} />
				))}
			</div>
			<div className='relative -top-3'>
				<div className='mx-auto max-w-150 text-center'>
					{offer.description1 && (
						<p className='mt-20 text-xl'>{offer.description1}</p>
					)}
					{offer.description2 && (
						<p className='mt-4 text-xl'>{offer.description2}</p>
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
						className='text-xl '
						aria-label='Войти в аккаунт'
					>
						Войти в аккаунт
					</AppButton>
					<AppButton
						appVariant='link'
						className='text-xl hover:text-accent! hover:underline!'
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
