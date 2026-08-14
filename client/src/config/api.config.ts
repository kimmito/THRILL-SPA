export const SERVER_URL =
	import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
export const API_URL =
	import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

export const getOfferUrl = (string: string) => `/offers${string}`
export const getCategoryUrl = (string: string) => `/category${string}`
export const getServiceUrl = (string: string) => `/service${string}`
export const getStaffUrl = (string: string) => `/staff${string}`
export const getPortfolioUrl = (string: string) => `/portfolio${string}`
export const getReviewsUrl = (string: string) => `/reviews${string}`

// shop
export const getShopItemUrl = (string: string) => `/shop${string}`
export const getShopCategoryUrl = (string: string) => `/shop-category${string}`
export const getPostUrl = (string: string) => `/post${string}`
