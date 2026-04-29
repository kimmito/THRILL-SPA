import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { useInView } from 'motion/react'

interface CurvedLoopItem {
	image: string
	text?: string
}

interface CurvedLoopProps {
	items: CurvedLoopItem[]
	direction?: 'left' | 'right'
	interactive?: boolean
}

const ITEM_SIZE = 200
const ITEM_GAP = 16
const PIXELS_PER_SECOND = 25
const HOVER_TRANSITION_SECONDS = 0.2
const INERTIA_FRICTION = 0.98
const INERTIA_MIN_VELOCITY = 0.08

const CurvedLoop = ({
	items,
	direction = 'left',
	interactive = true
}: CurvedLoopProps) => {
	const hasItems = items.length > 0
	const loopItems = hasItems ? [...items, ...items] : []
	const loopDistance = items.length * (ITEM_SIZE + ITEM_GAP)
	const viewportRef = useRef<HTMLDivElement>(null)
	const isInView = useInView(viewportRef, { amount: 0.1, margin: '200px 0px' })
	const [offset, setOffset] = useState(
		direction === 'right' ? -loopDistance : 0
	)
	const [isDragging, setIsDragging] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const dragRef = useRef(false)
	const lastXRef = useRef(0)
	const velocityRef = useRef(0)
	const inertiaVelocityRef = useRef(0)
	const directionRef = useRef<'left' | 'right'>(direction)

	useEffect(() => {
		directionRef.current = direction
	}, [direction])

	const wrapOffset = useCallback((value: number) => {
		if (loopDistance <= 0) return 0
		const wrapped = ((value % loopDistance) + loopDistance) % loopDistance
		return wrapped - loopDistance
	}, [loopDistance])

	useEffect(() => {
		if (!hasItems || !isInView) return

		let frame = 0
		let lastTs = 0

		const step = (ts: number) => {
			if (lastTs === 0) lastTs = ts
			const delta = ts - lastTs
			lastTs = ts

			if (!dragRef.current) {
				let inertialMove = 0
				if (Math.abs(inertiaVelocityRef.current) > INERTIA_MIN_VELOCITY) {
					inertialMove = inertiaVelocityRef.current * (delta / 16.67)
					inertiaVelocityRef.current *= INERTIA_FRICTION
					directionRef.current =
						inertiaVelocityRef.current > 0 ? 'right' : 'left'
				} else {
					inertiaVelocityRef.current = 0
				}

				const autoMove = !isHovered
					? (directionRef.current === 'right' ? 1 : -1) *
						PIXELS_PER_SECOND *
						(delta / 1000)
					: 0
				setOffset(prev => wrapOffset(prev + autoMove + inertialMove))
			}

			frame = requestAnimationFrame(step)
		}

		frame = requestAnimationFrame(step)
		return () => cancelAnimationFrame(frame)
	}, [hasItems, isHovered, isInView, loopDistance, wrapOffset])

	const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (!interactive) return
		dragRef.current = true
		setIsDragging(true)
		lastXRef.current = event.clientX
		velocityRef.current = 0
		inertiaVelocityRef.current = 0
		event.currentTarget.setPointerCapture(event.pointerId)
	}

	const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!interactive || !dragRef.current) return
		const dx = event.clientX - lastXRef.current
		lastXRef.current = event.clientX
		velocityRef.current = dx
		inertiaVelocityRef.current = dx

		setOffset(prev => {
			return wrapOffset(prev + dx)
		})
	}

	const endDrag = () => {
		if (!interactive) return
		if (!dragRef.current) return
		dragRef.current = false
		setIsDragging(false)
		if (velocityRef.current !== 0) {
			directionRef.current = velocityRef.current > 0 ? 'right' : 'left'
			inertiaVelocityRef.current = velocityRef.current
		}
		velocityRef.current = 0
	}

	const cursorClass = interactive
		? isDragging
			? 'cursor-grabbing'
			: 'cursor-grab'
		: ''

	if (!hasItems) return null

	return (
		<div
			ref={viewportRef}
			className={`portfolio-loop w-full overflow-hidden my-6 py-10 ${cursorClass}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false)
				endDrag()
			}}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={endDrag}
			onPointerCancel={endDrag}
			style={{ touchAction: 'pan-y' }}
		>
			<style>
				{`
					@media (prefers-reduced-motion: reduce) {
						.portfolio-loop-track {
							transform: translate3d(0, 0, 0) !important;
						}
					}
				`}
			</style>

			<div
				className='portfolio-loop-track flex w-max will-change-transform'
				style={{
					backfaceVisibility: 'hidden',
					gap: `${ITEM_GAP}px`,
					transform: `translate3d(${offset}px, 0, 0)`
				}}
			>
				{loopItems.map((item, index) => (
					<figure
						key={`${item.image}-${index}`}
						className='relative z-0 shrink-0 overflow-hidden bg-panel transition-transform hover:z-10 hover:scale-[1.5]'
						style={{
							contain: 'paint',
							height: ITEM_SIZE,
							transitionDuration: `${HOVER_TRANSITION_SECONDS}s`,
							width: ITEM_SIZE
						}}
					>
						<img
							src={item.image}
							alt={item.text || ''}
							className='h-full w-full object-cover'
							decoding='async'
							draggable={false}
							loading='lazy'
						/>
						{item.text ? (
							<figcaption className='absolute inset-x-0 bottom-0 bg-base/75 px-4 py-3 text-xl uppercase text-copy'>
								{item.text}
							</figcaption>
						) : null}
					</figure>
				))}
			</div>
		</div>
	)
}

export default CurvedLoop
