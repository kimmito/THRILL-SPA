export const API_URL =
	import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

export const getOfferUrl = (string: string) => `/offers${string}`
export const getCategoryUrl = (string: string) => `/category${string}`
export const getServiceUrl = (string: string) => `/service${string}`
export const getStaffUrl = (string: string) => `/staff${string}`
export const getPortfolioUrl = (string: string) => `/portfolio${string}`
export const getReviewsUrl = (string: string) => `/reviews${string}`
