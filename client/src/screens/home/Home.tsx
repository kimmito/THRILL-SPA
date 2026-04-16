import { Button } from 'antd'

import Map from '@/components/Map'

import hallImage from '@/assets/images/hall.jpg'

const Home = () => {
	const services = [
		{ name: 'Маникюр', link: '#' },
		{ name: 'Педикюр', link: '#' },
		{ name: 'Брови', link: '#' },
		{ name: 'Ресницы', link: '#' }
	]
	return (
		<div>
			<div className='flex'>
				<div className='flex flex-1 mx-20 text-center items-center justify-center flex-col '>
					<nav className='w-full'>
						<ul className='flex justify-center gap-10 mb-10 w-full'>
							{services.map(service => (
								<li key={service.name}>
									<Button
										type='text'
										variant='outlined'
										color='purple'
										ghost={true}
									>
										{service.name}
									</Button>
								</li>
							))}
						</ul>
					</nav>
					<h2 className='text-2xl'>Салон красоты в Краснодаре</h2>
					<h1 className='text-6xl font-title font-semibold uppercase'>
						Thrill
					</h1>
					<ul className='flex mt-6 justify-center text-lg [&>li]:after:content-["|"] [&>li]:after:mx-4 [&>li]:last:after:content-[""]'>
						{services.map(service => (
							<li key={service.name}>
								<span className='lowercase'>{service.name}</span>
							</li>
						))}
					</ul>
					<div className='mt-12 flex gap-10 justify-center'>
						<Button
							variant='solid'
							color='purple'
							size='large'
							style={{ width: '200px' }}
						>
							Онлайн-запись
						</Button>
						<Button
							variant='solid'
							color='purple'
							size='large'
							style={{ width: '200px' }}
						>
							Прайс
						</Button>
					</div>
				</div>
				<div className='flex-1 '>
					<img
						src={hallImage}
						alt='Салон красоты THRILL'
						className='h-[90vh] relative right-0 -top-14 shadow-lg shadow-fuchsia-950/20 rounded-b-lg overflow-hidden'
					/>
				</div>
			</div>
			<Map />
		</div>
	)
}

export default Home
