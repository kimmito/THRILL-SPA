import ScrollVelocity from '@/components/ui/ScrollVelocity'

import AboutSection from './AboutSection'
import { HeroSection } from './HeroSection'
import OffersSection from './OffersSection'
import { ServicesSection } from './ServicesSection'
import MapSection from '@/pages/home/MapSection'
import PortfolioSection from './PortfolioSection'

const Home = () => {
	return (
		<>
			<HeroSection />
			<ScrollVelocity
				texts={['THRILL', 'THRILL', 'THRILL']}
				velocity={30}
				className='select-none'
				numCopies={100}
				damping={75}
				stiffness={500}
			/>
			<AboutSection />

			<ServicesSection />
			<OffersSection />
			<ScrollVelocity
				texts={['THRILL', 'THRILL', 'THRILL']}
				velocity={30}
				className='select-none'
				numCopies={100}
				damping={75}
				stiffness={500}
			/>
			<PortfolioSection />
			<MapSection />
		</>
	)
}

export default Home
