import { Button } from 'antd'

import hallImage from '@/assets/images/hall.jpg'

const Home = () => {
	return (
		<main className='flex'>
			<div className='flex-1 mx-20 text-center items-center justify-center flex flex-col'>
				<nav className='w-full'>
					<ul className='flex justify-center gap-10 mb-10 w-full'>
						<li>
							<Button
								type='text'
								variant='outlined'
								color='purple'
								ghost={true}
							>
								О нас
							</Button>
						</li>
						<li>
							<Button
								type='text'
								variant='outlined'
								color='purple'
								ghost={true}
							>
								Услуги
							</Button>
						</li>
						<li>
							<Button
								type='text'
								variant='outlined'
								color='purple'
								ghost={true}
							>
								Прайс
							</Button>
						</li>
						<li>
							<Button
								type='text'
								variant='outlined'
								color='purple'
								ghost={true}
							>
								Контакты
							</Button>
						</li>
					</ul>
				</nav>
				<h2 className='text-2xl'>Салон красоты в Краснодаре</h2>
				<h1 className='text-6xl font-semibold'>Euphoria SPA</h1>
				<ul className='flex mt-6 justify-center text-lg [&>li]:after:content-["|"] [&>li]:after:mx-4 [&>li]:last:after:content-[""]'>
					<li>маникюр</li>
					<li>педикюр</li>
					<li>брови</li>
					<li>ресницы</li>
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
			<div className='flex-1'>
				<img
					src={hallImage}
					alt='Салон красоты Euphoria SPA'
					className='h-[90vh] relative right-0 -top-14'
				/>
			</div>
		</main>
	)
}

export default Home
