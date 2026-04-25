import ScrollVelocity from '@/components/ScrollVelocity'

import { HeroSection } from './HeroSection'
import { ServicesSection } from './ServicesSection'
import MapSection from '@/pages/home/MapSection'
import AboutSection from './AboutSection'

const Home = () => {
	return (
		<>
			<HeroSection />
			<ScrollVelocity
				texts={['THRILL', 'THRILL', 'THRILL']}
				velocity={30}
				className='select-none'
				numCopies={50}
				damping={75}
				stiffness={500}
			/>
			<AboutSection />

			<ServicesSection />
			<MapSection />
		</>
	)
}

export default Home
