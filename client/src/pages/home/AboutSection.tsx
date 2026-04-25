const AboutSection = () => {
	return (
		<section className='flex flex-row mt-10 items-center justify-center'>
			<div className="flex flex-1 bg-[url('/src/assets/images/brush.png')] bg-cover h-270 bg-center opacity-20 ">
				<div className='flex flex-row select-none'>
					<p className=' font-title text-[190px] rotate-90 -mx-200 text-black uppercase'>
						safety
					</p>
					<p className=' font-title text-[150px] rotate-90 -mr-200 text-black uppercase'>
						freedom
					</p>
					<p className=' font-title text-[150px] rotate-90 -mr-200 text-black uppercase'>
						creative
					</p>
					<p className=' font-title text-[155px] rotate-90 -mr-200 text-black uppercase'>
						comfort
					</p>
				</div>
			</div>

			<div className='flex flex-1 bg-panel h-195'>
				<div className='max-w-5/6 ml-20 mt-20'>
					<h2 className='uppercase font-bold text-[64px] text-[#E8E8E8] mb-16'>
						о нас
					</h2>
					<div className="[&>p]: text-title [&>p]:text-copy [&>p]:mb-6 [&>p]:text-2xl max-w-md">
						<p >
							Наш главный принцип — честность. Честный сервис, честный прайс и
							атмосфера, в которой можно быть самим собой. Хочешь нюд или
							кислотный неон? Твои правила.
						</p>
						<p>
							Полный контроль за безопасностью клиента. Трехступенчатая
							стерилизация инструментов и одноразовые расходники.
						</p>
						<p>
							Без понтов. Без осуждения. Без риска. Только честный сервис,
							крутой креатив и мастера, которые любят свое дело.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutSection
