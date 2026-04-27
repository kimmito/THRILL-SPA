const AboutSection = () => {
	return (
		<section className='flex flex-row mt-10 items-center justify-center'>
			<div className="relative flex flex-1 h-270 overflow-hidden before:absolute before:inset-0 before:bg-[url('/src/assets/images/brush.png')] before:bg-cover before:bg-center before:opacity-70 before:mix-blend-color-dodge before:content-['']">
				<div className='relative z-10 flex flex-row select-none'>
					<p className=' font-title text-[190px] -rotate-90  text-[#17101f] uppercase'>
						safety
					</p>
					<p className='font-title text-[150px] -rotate-90 -ml-185 text-[#17101f] uppercase'>
						freedom
					</p>
					<p className=' font-title text-[145px] -rotate-90 -ml-200 text-[#17101f] uppercase'>
						creative
					</p>
					<p className=' font-title text-[150px] -rotate-90 -mx-200 text-[#17101f] uppercase'>
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
