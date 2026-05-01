import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import CurvedLoop from '@/components/ui/CurvedLoop'

import { portfolioBrowsData } from '@/data/portfolio/portfolio-brows-data'
import { portfolioLashesData } from '@/data/portfolio/portfolio-lashers-data'
import { portfolioNailsData } from '@/data/portfolio/portfolio-nails-data'

const PortfolioSection = () => {
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
		<section id='portfolio'>
			<h2 className='text-8xl font-bold text-left my-16 ml-50 uppercase'>
				Портфолио
			</h2>
			<div id='gallery' className='relative'>
				<CurvedLoop
					items={portfolioNailsData}
					altPrefix='Маникюр, пример работы'
					direction='left'
					onItemClick={item => setSelectedImage(item.image)}
				/>
				<p className='pointer-events-none uppercase overflow-hidden text-nowrap mix-blend-overlay select-none text-[250px] font-title text-center absolute z-1 top-17 -left-20'>
					nailsnailsnailsnails
				</p>
			</div>
			<div className='relative'>
				<CurvedLoop
					items={portfolioBrowsData}
					altPrefix='Брови, пример работы'
					direction='right'
					onItemClick={item => setSelectedImage(item.image)}
				/>
				<p className='pointer-events-none uppercase overflow-hidden text-nowrap mix-blend-multiply text-[250px] font-title text-center absolute z-1 top-17 -left-20'>
					browsbrowsbrowsbrows
				</p>
			</div>
			<div className='relative'>
				<CurvedLoop
					items={portfolioLashesData}
					altPrefix='Ресницы, пример работы'
					direction='left'
					onItemClick={item => setSelectedImage(item.image)}
				/>
				<p className='pointer-events-none uppercase overflow-hidden text-nowrap mix-blend-color-burn text-[250px] font-title text-center absolute z-1 top-17 -left-20'>
					lasheslasheslasheslashes
				</p>
			</div>

			{selectedImage ? (
				<div
					className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-8'
					role='dialog'
					aria-modal='true'
					onPointerDown={() => setSelectedImage(null)}
				>
					<button
						type='button'
						className='fixed right-5 top-5 z-[10000] flex size-11 items-center justify-center rounded-full bg-white/90 text-3xl text-black transition hover:bg-white'
						aria-label='Закрыть фото'
						onPointerDown={event => {
							event.stopPropagation()
							setSelectedImage(null)
						}}
					>
						<IoClose aria-hidden='true' />
					</button>
					<img
						src={selectedImage}
						alt=''
						className='relative z-0 max-h-[88vh] max-w-[92vw] object-contain shadow-2xl'
						onPointerDown={event => event.stopPropagation()}
					/>
				</div>
			) : null}
		</section>
	)
}

export default PortfolioSection

