import { AppButton } from '@/components/ui/AppButton'

import type { RepeatVisitOffer } from '@/data/offers'

type RepeatVisitDiscountSlideProps = {
	offer: RepeatVisitOffer
}

const RepeatVisitDiscountSlide = ({ offer }: RepeatVisitDiscountSlideProps) => {
	return (
		<div className='flex flex-col items-center justify-center h-full mx-5'>
			<ul className='flex justify-between w-full max-w-325 relative [&>li:nth-child(odd)]:translate-y-1/5'>
				{offer.items.map(item => (
					<li key={item.id}>
						<div className='flex relative px-10'>
							<p
								style={{ writingMode: 'vertical-lr' }}
								className='absolute bottom-5 left-6 pt-10 rotate-180 text-[32px] text-head text-nowrap '
							>
								{item.title}
							</p>
							<div
								className={`${item.value.length > 8 ? 'text-2xl pt-12' : item.value.length > 6 ? 'text-[30px] pt-14' : 'text-[34px]'} bg-[url(./src/assets/images/ticket.png)] bg-center bg-contain bg-no-repeat h-100 w-57.5 text-center font-bold pt-9`}
							>
								{item.value}
							</div>
						</div>
					</li>
				))}
			</ul>
			<div>
				<div className='mx-auto mt-10 w-max'>
					<AppButton
						appVariant='primary'
						aria-label='Получить скидку'
						className='h-14 w-90 text-[28px]! hover:border-accent! hover:text-accent!'
					>
						Получить скидку
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

export default RepeatVisitDiscountSlide
