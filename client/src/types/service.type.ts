export interface Service {
	id: number
	categoryId: number
	isActive: boolean
	name: string
	price: number
	durationMinutes: number
	isBookable: boolean
	createdAt: string
	updatedAt: string
	slug: string
	sortOrder: number
}
