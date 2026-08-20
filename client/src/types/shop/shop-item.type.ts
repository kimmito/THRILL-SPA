export type ShopItem = {
	id: number
	name: string
	slug: string
	isActive: boolean
	description?: string
	imagePath: string
	price: number
	additionalImagePaths?: string[]
	shopCategoryId: number
	createdAt: string
}
