import { useState } from 'react'
import { FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa'
import { IoMdMailOpen } from 'react-icons/io'

import womanImage from '@/assets/images/woman.png'

const MapSection = () => {
	const [isMapLoaded, setIsMapLoaded] = useState(false)

	return (
		<section
			className='flex flex-col max-w-370 mx-auto shadow-lg shadow-black/20 lg:flex-row mt-20 mb-30'
			id='map'
		>
			<div className='relative flex w-full flex-col pt-10 justify-start gap-1 bg-panel p-10 pl-8 text-copy lg:w-1/2 lg:pl-20'>
				<h3 className='mb-3 text-2xl font-bold'>Краеведа Соловьёва</h3>
				<p className='mb-10 text-sm text-copy/60'>
					Краснодар, ул. Краеведа Соловьёва 6, к. 3
				</p>
				<p className='text-xl font-bold'>
					<FaPhoneAlt className='mr-2 inline' size={14} />
					<a href='tel:+79615177332'>+7 (961) 517-73-32</a>
				</p>
				<p className='text-sm'>
					<IoMdMailOpen className='relative bottom-0.5 mr-2 inline' size={17} />
					<a
						href='mailto:thrill@gmail.com'
						className='text-copy/80 hover:text-accent'
					>
						thrill@gmail.com
					</a>
				</p>
				<p className='text-sm'>
					<FaCalendarCheck
						className='relative bottom-0.5 mr-1.5 inline'
						size={17}
					/>
					Пн-Вс: 10:00-22:00
				</p>
				<img
					src={womanImage}
					alt=''
					aria-hidden='true'
					className='absolute pointer-events-none z-0 mx-auto h-80 w-[90%] -bottom-20 -left-15 mix-blend-multiply'
				/>
			</div>
			<div className='relative h-120! w-full overflow-hidden bg-panel lg:h-auto lg:w-2/3'>
				<div className='absolute inset-0'>
					<img
						src='./src/assets/images/map-preview.png'
						alt=''
						aria-hidden='true'
						className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
							isMapLoaded ? 'opacity-0' : 'opacity-100'
						}`}
					/>
					<iframe
						title='Карта салона THRILL'
						src='https://yandex.ru/map-widget/v1/?um=constructor%3A5954de921996fd1651ff9984439f336ea9a5b19c669b94d1a66cf1fe9f11064d&amp;source=constructor'
						className={`relative h-full w-full border-0 transition-opacity duration-500 ${
							isMapLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						loading='lazy'
						onLoad={() => setIsMapLoaded(true)}
					></iframe>
				</div>
			</div>
		</section>
	)
}

export default MapSection
