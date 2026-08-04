export interface Offer {
	id: number
	description1: string
	description2: string
	slug: string
	title: string
	offerItems: OfferItem[]
}

export interface OfferItem {
	id: number
	createdAt: string
	isActive: boolean
	offerId: number
	title: string
	value: string
	SortOrder: number
}
