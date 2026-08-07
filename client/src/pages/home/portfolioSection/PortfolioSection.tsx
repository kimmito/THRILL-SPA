import { Loader } from '@/components/ui/Loader'

import type { Portfolio } from '@/types/portfolio.type'

import PortfolioGalleryRow from './PortfolioGalleryRow'
import { usePortfolioBySection } from './usePortfolio'

export type PortfolioItem = {
	items: Portfolio[]
	text: string
	alt: string
	mix?: string
	direction: 'left' | 'right'
}

const PortfolioSection = () => {
	const { portfolio: portfolioNailsData, isLoading: isNailsLoading } =
		usePortfolioBySection('NAILS')
	const { portfolio: portfolioBrowsData, isLoading: isBrowsLoading } =
		usePortfolioBySection('BROWS')
	const { portfolio: portfolioLashesData, isLoading: isLashesLoading } =
		usePortfolioBySection('LASHES')

	const isLoading: boolean = isNailsLoading || isBrowsLoading || isLashesLoading

	const portfolioRows: PortfolioItem[] = [
		{
			items: portfolioNailsData || [],
			text: 'nails',
			alt: 'Маникюр, пример работы',
			direction: 'left',
			mix: 'mix-blend-overlay'
		},
		{
			items: portfolioBrowsData || [],
			text: 'brows',
			alt: 'Брови, пример работы',
			direction: 'right',
			mix: 'mix-blend-multiply'
		},
		{
			items: portfolioLashesData || [],
			text: 'lashes',
			alt: 'Ресницы, пример работы',
			direction: 'left',
			mix: 'mix-blend-color-burn'
		}
	]

	return (
		<section id='portfolio'>
			<h2 className='text-8xl font-bold text-left pt-16 max-w-370 mx-auto uppercase'>
				Портфолио
			</h2>
			<div id='gallery' className='relative'>
				{isLoading ? (
					<Loader />
				) : (
					portfolioRows.map((row, index) => (
						<PortfolioGalleryRow
							key={index}
							items={row.items}
							text={row.text}
							alt={row.alt}
							direction={row.direction}
							mix={row.mix}
						/>
					))
				)}
			</div>
		</section>
	)
}

export default PortfolioSection
