export type Staff = {
	id: number
	name: string
	photoPath: string
	role: string
	isActive: boolean
	rating: number | null
	reviewCount: number
	reviews: StaffReview[]
}

export type StaffReview = {
	id: number
	stars: number
	date: string
	author: string
	text: string
	imagePath: string | null
}
