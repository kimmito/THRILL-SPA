import { useNavigate, useParams } from 'react-router'

import { Loader } from '@/components/ui/Loader'
import ScrollVelocity from '@/components/ui/ScrollVelocity'
import { AppButton } from '@/components/ui/appButton/AppButton'

import { RelatedShopItems } from './RelatedShopItems'
import { ShopItemCard } from './ShopItemCard'
import { useShopItemBySlug } from './hooks/useShopItems'

export const ShopItemPage = () => {
	const slug = useParams<{ slug: string }>()
	const navigate = useNavigate()
	const { shopItem, isShopItemLoading } = useShopItemBySlug(slug?.slug || '')
	return (
		<div>
			<div className='w-[1100px] mx-auto mt-40'>
				<AppButton
					appVariant='link'
					className='uppercase underline text-[#605792]! text-2xl! mb-10'
					onClick={() => navigate('/shop')}
				>
					Вернуться
				</AppButton>
				<div className='mb-20'>
					{' '}
					{isShopItemLoading ? (
						<Loader />
					) : shopItem ? (
						<ShopItemCard item={shopItem} />
					) : (
						<p className='text-4xl text-head text-center my-40'>
							Товар не найден
						</p>
					)}
				</div>
				<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']} />
			</div>
			{shopItem && <RelatedShopItems item={shopItem} />}
		</div>
	)
}
