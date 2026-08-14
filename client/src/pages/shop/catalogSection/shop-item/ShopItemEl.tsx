import { useNavigate } from 'react-router'

import { AppButton } from '@/components/ui/appButton/AppButton'

import type { ShopItem } from '@/types/shop/shop-item.type'

export const ShopItemEl = ({ item }: { item: ShopItem }) => {
	const navigate = useNavigate()
	return (
		<div key={item.id} className='flex flex-col p-4 max-w-[400px] mx-auto'>
			<div
				className='cursor-pointer'
				onClick={() => navigate(`/shop/${item.slug}`)}
			>
				<img
					src={
						item.imagePath
							? item.imagePath
							: '/src/assets/images/shop/not-image.png'
					}
					alt={item.name}
					className='w-[400px] h-[400px] object-center'
				/>
				<h3 className='text-2xl text-head mt-2 min-h-[65px]'>{item.name}</h3>
			</div>

			<p className='text-3xl text-head mb-3'>{item.price} ₽</p>
			<AppButton appVariant='primary' className='uppercase text-2xl! py-6'>
				В корзину
			</AppButton>
		</div>
	)
}
