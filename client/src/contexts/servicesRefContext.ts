import { createContext } from 'react'

export const ServicesRefContext =
	createContext<React.RefObject<HTMLDivElement | null> | null>(null)

export default ServicesRefContext
