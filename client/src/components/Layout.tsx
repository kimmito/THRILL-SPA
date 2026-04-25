import { Outlet } from 'react-router'

import Footer from './Footer'
import Grainient from './Gradient'
import Header from './Header'

export const Layout = () => {
	return (
		<div className='layout relative'>
			<div className='flex flex-col min-h-screen relative '>
				<Header />
				<main className='w-full mx-auto mb-10 relative'>
					<div className='absolute top-0 left-0 w-full h-full -z-100000'>
						<Grainient
							color1='#201232'
							color2='#191526'
							color3='#291737'
							timeSpeed={2}
							colorBalance={0.26}
							warpStrength={1.05}
							warpFrequency={4.1}
							warpSpeed={2}
							warpAmplitude={50}
							blendAngle={32}
							blendSoftness={0.9}
							rotationAmount={810}
							noiseScale={0.8}
							grainAmount={0}
							grainScale={0.3}
							grainAnimated={false}
							contrast={1}
							gamma={1}
							saturation={1}
							centerX={-0.2}
							centerY={0}
							zoom={0.3}
						/>
					</div>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	)
}
