

import ScrollVelocity from '@/components/ui/ScrollVelocity'

import AboutSection from './AboutSection'
import { HeroSection } from './HeroSection'
import OffersSection from './offersSection/OffersSection'
import PortfolioSection from './portfolioSection/PortfolioSection'
import ReportsSection from './reviewSection/ReviewSection'
import { ServicesSection } from './servicesSection/ServicesSection'
import StaffSection from './staffSection/StaffSection'
import MapSection from '@/pages/home/MapSection'

const Home = () => {
	return (
		<>
			<HeroSection />
			<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']} />
			<AboutSection />
			<ServicesSection />
			<OffersSection />
			<StaffSection />
			<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']} />
			<PortfolioSection />
			<ReportsSection />
			<MapSection />
			<ScrollVelocity texts={['THRILL', 'THRILL', 'THRILL']} />
		</>
	)
}

export default Home
