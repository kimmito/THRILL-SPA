import { AppButton } from '@/components/ui/AppButton'
import GlareHover from '@/components/ui/GlareHover'

import type { GiftCertificateOffer } from '@/data/offers'

type GiftCertificateSlideProps = {
	offer: GiftCertificateOffer
}

const GiftCertificateSlide = ({ offer }: GiftCertificateSlideProps) => {
	return (
		<div className='mx-4'>
			<div className='flex justify-around'>
				{offer.items.map((item) => (
					<GlareHover
						key={item.id}
						glareColor='#ffffff'
						glareOpacity={0.7}
						glareAngle={-30}
						glareSize={220}
						transitionDuration={450}
						playOnce={false}
						className='cursor-pointer rounded-[27px] bg-[#090808] px-14 py-10 text-[64px] font-bold leading-none text-copy transition-colors duration-400 ease hover:bg-accent hover:text-[#090808]'
					>
						<p>{item.value}</p>
					</GlareHover>
				))}
			</div>

			<div className='mx-auto max-w-150 text-center'>
				{offer.description1 && <p className='mt-20 text-lg'>{offer.description1}</p>}
				{offer.description2 && <p className='mt-4 text-lg'>{offer.description2}</p>}
			</div>

			<div className='mx-auto mt-10 w-max'>
				<AppButton
					appVariant='primary'
					aria-label='Купить подарочный сертификат'
					className='h-14 w-108 text-[32px] hover:border-accent! hover:text-accent!'
				>
					Приобрести
				</AppButton>
			</div>

			<div className='mx-auto mt-10 flex max-w-100 flex-col gap-2'>
				<AppButton appVariant='link' className='text-xl' aria-label='Войти в аккаунт'>
					Войти в аккаунт
				</AppButton>
				<AppButton appVariant='link' className='text-xl' aria-label='Зарегистрироваться'>
					Зарегистрироваться
				</AppButton>
			</div>
		</div>
	)
}

export default GiftCertificateSlide
