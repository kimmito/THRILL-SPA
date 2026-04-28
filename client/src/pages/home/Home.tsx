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
			/>
			<AboutSection />

			<ServicesSection />
			<OffersSection />
			<ScrollVelocity
				texts={['THRILL', 'THRILL', 'THRILL']}
			/>
			<PortfolioSection />
			<MapSection />
		</>
	)
}

export default Home
