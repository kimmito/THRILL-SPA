import clsx from 'clsx'
import { useEffect, useState } from 'react'

import PortfolioCurvedLoop from './PortfolioCurvedLoop'
import PortfolioImageModal from './PortfolioImageModal'
import type { PortfolioItem } from './PortfolioSection'

const PortfolioGalleryRow = ({
	items,
	alt,
	direction,
	text,
	mix
}: PortfolioItem) => {
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
			<PortfolioRowTitle text={text} mix={mix} />

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
	mix: string | undefined
}

const PortfolioRowTitle = ({ text, mix }: PortfolioRowTitleProps) => {
	return (
		<p
			className={clsx(
				'pointer-events-none absolute top-17 -left-20 z-1 overflow-hidden text-nowrap text-center font-title text-[250px] uppercase select-none',
				mix || 'mix-blend-overlay'
			)}
		>
			{text}
			{text}
			{text}
		</p>
	)
}

export default PortfolioGalleryRow
