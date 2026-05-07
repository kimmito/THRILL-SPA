import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { useInView } from 'motion/react'

type PortfolioCurvedLoopItem = {
	image: string
}

type PortfolioCurvedLoopProps = {
	items: PortfolioCurvedLoopItem[]
	altPrefix: string
	direction: 'left' | 'right'
	onItemClick: (item: PortfolioCurvedLoopItem) => void
}

const ITEM_SIZE = 200
const ITEM_GAP = 16
const PIXELS_PER_SECOND = 25
const HOVER_TRANSITION_SECONDS = 0.2
const INERTIA_FRICTION = 0.98
const INERTIA_MIN_VELOCITY = 0.08
const DRAG_THRESHOLD = 8

const PortfolioCurvedLoop = ({
	items,
	altPrefix,
	direction,
	onItemClick
}: PortfolioCurvedLoopProps) => {
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
	const activeItemRef = useRef<PortfolioCurvedLoopItem | null>(null)
	const startXRef = useRef(0)
	const startYRef = useRef(0)
	const lastXRef = useRef(0)
	const velocityRef = useRef(0)
	const inertiaVelocityRef = useRef(0)
	const wasDraggedRef = useRef(false)
	const suppressClickRef = useRef(false)
	const directionRef = useRef<'left' | 'right'>(direction)

	useEffect(() => {
		directionRef.current = direction
	}, [direction])

	const wrapOffset = useCallback(
		(value: number) => {
			if (loopDistance <= 0) return 0
			const wrapped = ((value % loopDistance) + loopDistance) % loopDistance
			return wrapped - loopDistance
		},
		[loopDistance]
	)

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
	}, [hasItems, isHovered, isInView, wrapOffset])

	const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
		const itemButton =
			event.target instanceof Element
				? event.target.closest<HTMLButtonElement>('[data-loop-item-index]')
				: null
		const itemIndex = itemButton?.dataset.loopItemIndex

		dragRef.current = true
		setIsDragging(true)
		activeItemRef.current =
			itemIndex === undefined ? null : loopItems[Number(itemIndex)] || null
		startXRef.current = event.clientX
		startYRef.current = event.clientY
		lastXRef.current = event.clientX
		velocityRef.current = 0
		inertiaVelocityRef.current = 0
		wasDraggedRef.current = false
		suppressClickRef.current = false
		event.currentTarget.setPointerCapture(event.pointerId)
	}

	const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!dragRef.current) return
		const dx = event.clientX - lastXRef.current
		lastXRef.current = event.clientX
		if (
			Math.abs(event.clientX - startXRef.current) > DRAG_THRESHOLD ||
			Math.abs(event.clientY - startYRef.current) > DRAG_THRESHOLD
		) {
			wasDraggedRef.current = true
		}
		velocityRef.current = dx
		inertiaVelocityRef.current = dx

		setOffset(prev => wrapOffset(prev + dx))
	}

	const endDrag = () => {
		if (!dragRef.current) return
		dragRef.current = false
		setIsDragging(false)
		if (velocityRef.current !== 0) {
			directionRef.current = velocityRef.current > 0 ? 'right' : 'left'
			inertiaVelocityRef.current = velocityRef.current
		}
		velocityRef.current = 0
	}

	const onPointerUp = () => {
		const clickedItem = activeItemRef.current

		endDrag()
		activeItemRef.current = null

		if (clickedItem && !wasDraggedRef.current) {
			suppressClickRef.current = true
			onItemClick(clickedItem)
		}
	}

	const onPointerCancel = () => {
		endDrag()
		activeItemRef.current = null
	}

	if (!hasItems) return null

	const cursorClass = isDragging ? 'cursor-grabbing' : 'cursor-grab'

	return (
		<div
			ref={viewportRef}
			className={`portfolio-loop my-12 w-full overflow-hidden py-8 ${cursorClass}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false)
				endDrag()
			}}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			onPointerCancel={onPointerCancel}
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
					<div
						key={`${item.image}-${index}`}
						className='relative z-0 shrink-0 overflow-hidden bg-panel transition-transform hover:z-10 hover:scale-[1.3]'
						style={{
							contain: 'paint',
							height: ITEM_SIZE,
							transitionDuration: `${HOVER_TRANSITION_SECONDS}s`,
							width: ITEM_SIZE
						}}
					>
						<button
							type='button'
							data-loop-item-index={index}
							className='block h-full w-full cursor-pointer border-0 bg-transparent p-0'
							aria-label='Open portfolio photo'
							onClick={() => {
								if (suppressClickRef.current || wasDraggedRef.current) {
									suppressClickRef.current = false
									return
								}
								onItemClick(item)
							}}
						>
							<img
								src={item.image}
								alt={`${altPrefix} ${index % items.length + 1}`}
								className='h-full w-full object-cover'
								decoding='async'
								draggable={false}
								loading='lazy'
							/>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default PortfolioCurvedLoop
