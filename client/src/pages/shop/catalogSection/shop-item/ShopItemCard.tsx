import { useState } from 'react'

import { AppButton } from '@/components/ui/appButton/AppButton'

import type { ShopItem } from '@/types/shop/shop-item.type'

export const ShopItemCard = ({ item }: { item: ShopItem }) => {
	const [selectedImage, setSelectedImage] = useState<string>(item.imagePath)
	const [additionalImages, setAdditionalImages] = useState<string[]>(
		item.additionalImagePaths || []
	)
	const handleImageClick = (clickedImage: string) => {
		if (selectedImage === clickedImage) {
			return
		}

		const clickedIndex = additionalImages.indexOf(clickedImage)
		if (clickedIndex !== -1) {
			const newAdditionalImages = [...additionalImages]
			newAdditionalImages[clickedIndex] = selectedImage
			setAdditionalImages(newAdditionalImages)
			setSelectedImage(clickedImage)
		}
	}
	return (
		<div className='flex flex-row max-w-[1100px] mx-auto'>
			<div className='flex flex-col'>
				<img
					src={selectedImage}
					alt={item.name}
					className='w-[500px] h-[500px] object-center mb-3'
				/>
				<div>
					<div className='w-[500px] h-[110px] flex flex-row gap-3'>
						{additionalImages.map((imagePath, index) => (
							<img
								key={index}
								src={imagePath}
								alt={item.name}
								className='flex-1 object-cover cursor-pointer'
								onClick={() => handleImageClick(imagePath)}
							/>
						))}
					</div>
				</div>
			</div>
			<div>
				<div className='ml-15 relative h-full'>
					<h3 className='text-5xl text-head uppercase'>{item.name}</h3>
					<p className='text-2xl text-head mt-5'>{item.description}</p>
					<div className='bottom-0 absolute w-full'>
						<p className='text-5xl text-head text-right right-0 mb-5'>
							{item.price} ₽
						</p>
						<AppButton
							appVariant='primary'
							className='uppercase text-3xl! py-8 w-full'
						>
							В корзину
						</AppButton>
					</div>
				</div>
			</div>
		</div>
	)
}
