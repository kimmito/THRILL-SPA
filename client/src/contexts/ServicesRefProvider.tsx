import { useRef } from 'react'

import { ServicesRefContext } from './servicesRefContext'

export function ServicesRefProvider({
	children
}: {
	children: React.ReactNode
}) {
	const servicesRef = useRef<HTMLDivElement | null>(null)
	return (
		<ServicesRefContext.Provider value={servicesRef}>
			{children}
		</ServicesRefContext.Provider>
	)
}

export default ServicesRefProvider
