import thrillFrame from '@/assets/svg/thrill.svg'

const OffersSection = () => {
	return (
		<section className='relative my-32 px-4 overflow-visible'>
      
			<div className='relative mx-auto min-h-180 max-w-420 p-[12%] lg:min-h-230'>
        <h2 className='inline-block text-8xl font-bold relative bottom-70 z-1'>Скидки на <br />повторные <br />посещения</h2>
				<img
					src={thrillFrame}
					alt=''
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 h-full w-full select-none object-fill opacity-100 mix-blend-multiply'
				/>
        
				<div className='relative z-10 min-h-180 mx-20 sm:min-h-130 lg:min-h-145 bg-red-100'> 123123</div>
			</div>
		</section>
	)
}

export default OffersSection
