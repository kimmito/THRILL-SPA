import PortfolioGalleryRow from './PortfolioGalleryRow'
import { portfolioBrowsData } from '@/data/portfolio/portfolio-brows-data'
import { portfolioLashesData } from '@/data/portfolio/portfolio-lashers-data'
import { portfolioNailsData } from '@/data/portfolio/portfolio-nails-data'

export type PortfolioItem = {
	items: typeof portfolioNailsData
	text: string
	alt: string
	mix?: string
	direction: 'left' | 'right'
}
const PortfolioSection = () => {
	const portfolioRows: PortfolioItem[] = [
		{
			items: portfolioNailsData,
			text: 'nails',
			alt: 'Маникюр, пример работы',
			direction: 'left',
			mix: 'mix-blend-overlay'
		},
		{
			items: portfolioBrowsData,
			text: 'brows',
			alt: 'Брови, пример работы',
			direction: 'right',
			mix: 'mix-blend-multiply'
		},
		{
			items: portfolioLashesData,
			text: 'lashes',
			alt: 'Ресницы, пример работы',
			direction: 'left',
			mix: 'mix-blend-color-burn'
		}
	]
	return (
		<section id='portfolio'>
			<h2 className='text-8xl font-bold text-left my-16 ml-50 uppercase'>
				Портфолио
			</h2>
			<div id='gallery' className='relative'>
				{portfolioRows.map((row, index) => (
					<PortfolioGalleryRow
						key={index}
						items={row.items}
						text={row.text}
						alt={row.alt}
						direction={row.direction}
						mix={row.mix}
					/>
				))}
			</div>
		</section>
	)
}

export default PortfolioSection
