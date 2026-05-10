import { useRef } from 'react'

type GiftCertificateValueCardProps = {
	onSelect: (value: string) => void
	selected: boolean
	value: string
}

const GLARE_TRANSITION_MS = 650
const GLARE_START_POSITION = '-140% -140%'
const GLARE_END_POSITION = '140% 140%'

const GiftCertificateValueCard = ({ value, onSelect, selected }: GiftCertificateValueCardProps) => {
	const overlayRef = useRef<HTMLDivElement | null>(null)

	const animateIn = () => {
		const el = overlayRef.current
		if (!el) return

		el.style.transition = 'none'
		el.style.backgroundPosition = GLARE_START_POSITION
		el.getBoundingClientRect()
		el.style.transition = `${GLARE_TRANSITION_MS}ms ease`
		el.style.backgroundPosition = GLARE_END_POSITION
	}

	const animateOut = () => {
		const el = overlayRef.current
		if (!el) return

		el.style.transition = 'none'
		el.style.backgroundPosition = GLARE_START_POSITION
	}


	return (
		<div
			className={`relative grid cursor-pointer place-items-center overflow-hidden rounded-[27px] bg-[#090808] text-head hover:bg-accent/90 hover:text-[#090808] transition-color ease duration-500 hover:shadow-lg px-10 py-8 text-[52px] font-bold leading-none ${selected? 'bg-accent text-[#090808]! shadow-lg' : ''}`}
			onMouseEnter={animateIn}
			onMouseLeave={animateOut}
			onClick={() => onSelect(value)}
		>
			<div
				ref={overlayRef}
				className='pointer-events-none absolute inset-0 bg-no-repeat'
				style={{
					background:
						'linear-gradient(-30deg, hsla(0,0%,100%,0) 45%, rgba(255, 255, 255, 0.7) 52%, hsla(0,0%,100%,0) 60%)',
					backgroundPosition: GLARE_START_POSITION,
					backgroundRepeat: 'no-repeat',
					backgroundSize: '220% 220%'
				}}
			/>
			<p className='relative z-10'>{value}</p>
		</div>
	)
}

export default GiftCertificateValueCard
