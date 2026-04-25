import { useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

type LineGeometry = {
	railX: number
	railTop: number
	railHeight: number
	hasConnector: boolean
	branchY: number
	branchLeft: number
	branchWidth: number
	linkX: number
	linkTop: number
	linkHeight: number
}

type UseServiceConnectorLineArgs = {
	selectedCategory: string | null
	categoryIds: string[]
}

type UseServiceConnectorLineReturn = {
	sectionRef: RefObject<HTMLDivElement | null>
	tabsRef: RefObject<HTMLDivElement | null>
	priceRef: RefObject<HTMLDivElement | null>
	buttonRefs: RefObject<Record<string, HTMLDivElement | null>>
	line: LineGeometry | null
}

export function useServiceConnectorLine({
	selectedCategory,
	categoryIds
}: UseServiceConnectorLineArgs): UseServiceConnectorLineReturn {
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const tabsRef = useRef<HTMLDivElement | null>(null)
	const priceRef = useRef<HTMLDivElement | null>(null)
	const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({})
	const [line, setLine] = useState<LineGeometry | null>(null)

	useLayoutEffect(() => {
		const updateLine = () => {
			const sectionNode = sectionRef.current
			const tabsNode = tabsRef.current
			const priceNode = priceRef.current
			const activeButtonNode = selectedCategory
				? buttonRefs.current[selectedCategory]
				: null

			if (!sectionNode || !tabsNode || !priceNode || !activeButtonNode) {
				setLine(null)
				return
			}

			const sectionRect = sectionNode.getBoundingClientRect()
			const tabsRect = tabsNode.getBoundingClientRect()
			const priceRect = priceNode.getBoundingClientRect()
			const activeRect = activeButtonNode.getBoundingClientRect()
			const selectedIndex = categoryIds.findIndex(id => id === selectedCategory)
			const isFirstCategory = selectedIndex === 0
			const previousButtonNode =
				selectedIndex > 0 ? buttonRefs.current[categoryIds[selectedIndex - 1]] : null

			const railX = priceRect.left - sectionRect.left - 22
			const buttonMiddleY =
				activeRect.top - sectionRect.top + activeRect.height / 2
			const buttonBottomY = activeRect.bottom - sectionRect.top
			const branchY = buttonBottomY + 60
			const defaultLinkX = activeRect.left - sectionRect.left - 10
			const linkX = previousButtonNode
				? (() => {
						const previousRect = previousButtonNode.getBoundingClientRect()
						const gap = Math.max(activeRect.left - previousRect.right, 0)
						return activeRect.left - sectionRect.left - gap / 2
					})()
				: defaultLinkX
			const railTop = isFirstCategory
				? Math.min(buttonMiddleY, tabsRect.top - sectionRect.top - 10)
				: branchY
			const railBottom = priceRect.bottom - sectionRect.top

			const branchLeft = Math.min(railX, linkX)
			const branchWidth = Math.max(Math.abs(linkX - railX), 1)
			const railHeight = Math.max(railBottom - railTop, 1)
			const linkTop = Math.min(buttonMiddleY, branchY)
			const linkHeight = Math.max(Math.abs(branchY - buttonMiddleY), 1)

			setLine({
				railX,
				railTop,
				railHeight,
				hasConnector: !isFirstCategory,
				branchY,
				branchLeft,
				branchWidth,
				linkX,
				linkTop,
				linkHeight
			})
		}

		updateLine()

		const resizeObserver = new ResizeObserver(updateLine)
		if (sectionRef.current) resizeObserver.observe(sectionRef.current)
		if (tabsRef.current) resizeObserver.observe(tabsRef.current)
		if (priceRef.current) resizeObserver.observe(priceRef.current)
		categoryIds.forEach(id => {
			const buttonNode = buttonRefs.current[id]
			if (buttonNode) resizeObserver.observe(buttonNode)
		})
		window.addEventListener('resize', updateLine)

		return () => {
			resizeObserver.disconnect()
			window.removeEventListener('resize', updateLine)
		}
	}, [selectedCategory, categoryIds])

	return {
		sectionRef,
		tabsRef,
		priceRef,
		buttonRefs,
		line
	}
}

export type { LineGeometry }
