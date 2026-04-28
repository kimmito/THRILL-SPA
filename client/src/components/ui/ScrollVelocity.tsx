import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
	motion,
	useAnimationFrame,
	useInView,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity
} from 'motion/react'

interface VelocityMapping {
	input: [number, number]
	output: [number, number]
}

interface VelocityTextProps {
	children: React.ReactNode
	baseVelocity: number
	scrollContainerRef?: React.RefObject<HTMLElement>
	className?: string
	damping?: number
	stiffness?: number
	numCopies?: number
	velocityMapping?: VelocityMapping
	parallaxClassName?: string
	scrollerClassName?: string
	parallaxStyle?: React.CSSProperties
	scrollerStyle?: React.CSSProperties
}

interface ScrollVelocityProps {
	scrollContainerRef?: React.RefObject<HTMLElement>
	texts: React.ReactNode[]
	velocity?: number
	className?: string
	damping?: number
	stiffness?: number
	numCopies?: number
	velocityMapping?: VelocityMapping
	parallaxClassName?: string
	scrollerClassName?: string
	parallaxStyle?: React.CSSProperties
	scrollerStyle?: React.CSSProperties
}

const MIN_REPEAT_COUNT = 2
const EXTRA_REPEAT_COUNT = 2

function useElementWidth<T extends HTMLElement>(
	ref: React.RefObject<T | null>
): number {
	const [width, setWidth] = useState(0)

	useLayoutEffect(() => {
		const element = ref.current
		if (!element) return

		const updateWidth = () => setWidth(element.offsetWidth)
		updateWidth()

		if (typeof ResizeObserver === 'undefined') {
			window.addEventListener('resize', updateWidth)
			return () => window.removeEventListener('resize', updateWidth)
		}

		const observer = new ResizeObserver(updateWidth)
		observer.observe(element)
		return () => observer.disconnect()
	}, [ref])

	return width
}

function VelocityText({
	children,
	baseVelocity,
	scrollContainerRef,
	className = '',
	damping = 50,
	stiffness = 400,
	numCopies,
	velocityMapping = { input: [0, 1000], output: [0, 5] },
	parallaxClassName = '',
	scrollerClassName = '',
	parallaxStyle,
	scrollerStyle
}: VelocityTextProps) {
	const baseX = useMotionValue(0)
	const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {}
	const { scrollY } = useScroll(scrollOptions)
	const scrollVelocity = useVelocity(scrollY)
	const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness })
	const velocityFactor = useTransform(
		smoothVelocity,
		velocityMapping.input,
		velocityMapping.output,
		{ clamp: false }
	)

	const viewportRef = useRef<HTMLDivElement>(null)
	const isInView = useInView(viewportRef, { amount: 0.1, margin: '200px 0px'})
	const copyRef = useRef<HTMLSpanElement>(null)
	const viewportWidth = useElementWidth(viewportRef)
	const copyWidth = useElementWidth(copyRef)

	const repeatCount = useMemo(() => {
		if (copyWidth === 0 || viewportWidth === 0) return MIN_REPEAT_COUNT
		const dynamicCount = Math.max(
			MIN_REPEAT_COUNT,
			Math.ceil(viewportWidth / copyWidth) + EXTRA_REPEAT_COUNT
		)
		return Math.max(dynamicCount, numCopies ?? 0)
	}, [copyWidth, numCopies, viewportWidth])

	const wrap = (min: number, max: number, value: number): number => {
		const range = max - min
		const mod = (((value - min) % range) + range) % range
		return mod + min
	}

	const x = useTransform(baseX, value => {
		if (copyWidth === 0) return '0px'
		return `${wrap(-copyWidth, 0, value)}px`
	})

	const directionFactor = useRef(1)
	useAnimationFrame((_t, delta) => {
		if (!isInView) return
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get()
		baseX.set(baseX.get() + moveBy)
	})

	const renderCopies = (group: string, shouldMeasure = false) =>
		Array.from({ length: repeatCount }, (_, index) => (
			<span
				className={`inline-flex shrink-0 items-center ${className}`}
				key={`${group}-${index}`}
				ref={shouldMeasure && index === 0 ? copyRef : null}
			>
				{children}
				<span
					className='mx-6 inline-block h-[9px] w-2 bg-white align-middle'
					aria-hidden='true'
				/>
			</span>
		))

	return (
		<div
			className={`${parallaxClassName} relative overflow-hidden`}
			ref={viewportRef}
			style={{ contain: 'layout paint', ...parallaxStyle }}
		>
			<motion.div
				className={`${scrollerClassName} flex w-max whitespace-nowrap text-center font-title text-2xl font-semibold uppercase leading-none tracking-widest drop-shadow`}
				style={{
					x,
					backfaceVisibility: 'hidden',
					transform: 'translate3d(0, 0, 0)',
					willChange: 'transform',
					...scrollerStyle
				}}
			>
				<div className='flex shrink-0'>{renderCopies('main', true)}</div>
				<div className='flex shrink-0' aria-hidden='true'>
					{renderCopies('clone')}
				</div>
			</motion.div>
		</div>
	)
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
	scrollContainerRef,
	texts = [],
	velocity = 30,
	className = '',
	damping = 75,
	stiffness = 500,
	numCopies = 100,
	velocityMapping = { input: [0, 1000], output: [0, 5] },
	parallaxClassName,
	scrollerClassName,
	parallaxStyle,
	scrollerStyle
}) => {
	return (
		<section className='relative left-1/2 right-1/2 ml-[-50dvw] mr-[-50dvw] w-[100dvw] overflow-x-clip select-none'>
			{texts.map((text, index) => (
				<VelocityText
					key={index}
					baseVelocity={index % 2 !== 0 ? -velocity : velocity}
					scrollContainerRef={scrollContainerRef}
					className={className}
					damping={damping}
					stiffness={stiffness}
					numCopies={numCopies}
					velocityMapping={velocityMapping}
					parallaxClassName={parallaxClassName}
					scrollerClassName={scrollerClassName}
					parallaxStyle={parallaxStyle}
					scrollerStyle={scrollerStyle}
				>
					{text}
				</VelocityText>
			))}
		</section>
	)
}

export default ScrollVelocity
