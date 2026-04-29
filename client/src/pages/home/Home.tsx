import ScrollVelocity from '@/components/ui/ScrollVelocity'

import AboutSection from './AboutSection'
import { HeroSection } from './HeroSection'
import OffersSection from './offersSection/OffersSection'
import PortfolioSection from './PortfolioSection'
import { ServicesSection } from './ServicesSection'
import MapSection from '@/pages/home/MapSection'

const Home = () => {
	return (
		<>
			<HeroSection />
			<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']} />
			<AboutSection />

			<ServicesSection />
			<OffersSection />
			<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']} />
			<PortfolioSection />
			<MapSection />
			<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']}/>
		</>
	)
}

export default Home
