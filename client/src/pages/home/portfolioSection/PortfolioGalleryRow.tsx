import { useEffect, useState } from 'react'

import PortfolioImageModal from './PortfolioImageModal'
import PortfolioCurvedLoop from './PortfolioCurvedLoop'


type PortfolioGalleryRowProps = {
	items: {
		image: string
	}[]
	text: string
	alt: string
	direction: 'left' | 'right'
}

const PortfolioGalleryRow = ({
	items,
	alt,
	direction,
	text
}: PortfolioGalleryRowProps) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	useEffect(() => {
		if (!selectedImage) return

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setSelectedImage(null)
			}
		}

		document.addEventListener('keydown', onKeyDown)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = ''
		}
	}, [selectedImage])
	return (
		<div className='relative'>
			<PortfolioCurvedLoop
				items={items}
				altPrefix={alt}
				direction={direction}
				onItemClick={item => setSelectedImage(item.image)}
			/>
			<PortfolioRowTitle text={text} />

			{selectedImage ? (
				<PortfolioImageModal
          alt={alt}
					image={selectedImage}
					onClose={() => setSelectedImage(null)}
				/>
			) : null}
		</div>
	)
}

type PortfolioRowTitleProps = {
	text: string
}

const PortfolioRowTitle = ({ text }: PortfolioRowTitleProps) => {
	return (
		<p className='pointer-events-none absolute top-17 -left-20 z-1 overflow-hidden text-nowrap text-center font-title text-[250px] uppercase mix-blend-overlay select-none'>
			{text}
			{text}
			{text}
		</p>
	)
}

export default PortfolioGalleryRow
